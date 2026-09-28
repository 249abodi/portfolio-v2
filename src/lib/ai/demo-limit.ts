/**
 * Second abuse-protection layer: a long-window cap on top of the existing
 * 12-per-minute limiter.
 *
 * Why it exists: the 12/minute limiter stops bursts but not a slow drip, and the
 * Gemini free tier only grants ~20 requests per day per project. One visitor
 * sending 12 requests a minute for ten minutes would spend the whole daily
 * budget in under an hour, so the demo needs an hourly ceiling as well.
 *
 * VERCEL / SERVERLESS LIMITATION — read this before trusting these numbers.
 * All state below lives in the Node process heap. On Vercel every serverless
 * instance has its own heap, and every cold start gets a fresh one, so this is
 * NOT a globally enforced quota:
 *  - Several instances serving one visitor each grant the full allowance, so an
 *    attacker with enough concurrency can still exceed it.
 *  - A cold start resets the counters, as does every redeploy.
 * What it does guarantee is that a single visitor on a single warm instance
 * cannot drain the daily free tier one message at a time, which is the abuse
 * this is aimed at. Enforcing a true global quota needs shared state (Redis,
 * Upstash, or a database). That is deliberately not used here: the project must
 * stay at $0, and a free-tier Redis would add both a dependency and a cost
 * ceiling. Accept the limitation rather than paying to remove it.
 */

export const DEMO_HOURLY_LIMIT = 10;
export const DEMO_HOURLY_WINDOW_MS = 60 * 60 * 1000;

/** Ceiling on tracked keys, so a flood of distinct visitors cannot grow the map forever. */
const MAX_TRACKED_KEYS = 5_000;

/** How often expired buckets are swept when traffic is light. */
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;

type Bucket = { count: number; resetAt: number };

export type LimitDecision = { allowed: boolean; retryAfter: number };

export type FixedWindowLimiter = {
  /** Counts one request against `key` and reports whether it is allowed. */
  check(key: string): LimitDecision;
  /** Number of live buckets currently retained. Exposed for leak assertions. */
  size(): number;
};

/**
 * Fixed-window counter with TTL expiry and bounded memory.
 *
 * `now` is injectable purely so expiry can be tested without waiting an hour.
 */
export function createFixedWindowLimiter(options: {
  limit: number;
  windowMs: number;
  maxTrackedKeys?: number;
  sweepIntervalMs?: number;
  now?: () => number;
}): FixedWindowLimiter {
  const { limit, windowMs } = options;
  const maxTrackedKeys = options.maxTrackedKeys ?? MAX_TRACKED_KEYS;
  const sweepIntervalMs = options.sweepIntervalMs ?? SWEEP_INTERVAL_MS;
  const now = options.now ?? Date.now;

  const buckets = new Map<string, Bucket>();
  let lastSweepAt = 0;

  /** Map iteration is insertion-ordered, so this evicts the oldest keys first. */
  function trim(): void {
    if (buckets.size <= maxTrackedKeys) return;
    let excess = buckets.size - maxTrackedKeys;
    for (const key of buckets.keys()) {
      if (excess <= 0) break;
      buckets.delete(key);
      excess -= 1;
    }
  }

  function sweep(at: number): void {
    // Time-based sweep retires expired keys on an otherwise idle instance;
    // the size check additionally sweeps under a flood of new keys.
    if (at - lastSweepAt < sweepIntervalMs && buckets.size < maxTrackedKeys) return;
    lastSweepAt = at;

    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= at) buckets.delete(key);
    }

    trim();
  }

  return {
    check(key) {
      const at = now();
      sweep(at);

      const bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= at) {
        buckets.set(key, { count: 1, resetAt: at + windowMs });
        // Sweeping happened before this insert, so re-assert the ceiling here.
        trim();
        return { allowed: true, retryAfter: 0 };
      }

      if (bucket.count >= limit) {
        return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - at) / 1000) };
      }

      bucket.count += 1;
      return { allowed: true, retryAfter: 0 };
    },
    size() {
      return buckets.size;
    },
  };
}

const hourlyLimiter = createFixedWindowLimiter({
  limit: DEMO_HOURLY_LIMIT,
  windowMs: DEMO_HOURLY_WINDOW_MS,
});

/**
 * Enforces the hourly demo cap for one bucket key.
 *
 * The key is an opaque digest produced by `visitorKey`; this function never sees
 * or needs an IP address.
 *
 * This is enforced in every environment, including `next dev`. That is
 * deliberate: a limit that silently switches off based on NODE_ENV is a trap,
 * because a misconfigured production run would lose its protection without any
 * visible sign. The side effect is that local development, where no proxy sets
 * an IP header, shares a single bucket of 5. Pass an `x-forwarded-for` header
 * while testing locally to get independent buckets.
 */
export function checkDemoLimit(key: string): LimitDecision {
  return hourlyLimiter.check(key);
}
