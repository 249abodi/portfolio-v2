/**
 * Unit tests for the demo abuse-protection layer.
 *
 * These exercise the real TypeScript modules directly (Node strips the types at
 * load time), so nothing here calls Gemini and no quota is consumed.
 *
 *   node --test scripts/rate-limit.test.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const { createFixedWindowLimiter, DEMO_HOURLY_LIMIT, DEMO_HOURLY_WINDOW_MS } = await import(
  "../src/lib/ai/demo-limit.ts"
);
const { visitorKey, extractClientIp } = await import("../src/lib/ai/client-identity.ts");
const { checkRateLimit } = await import("../src/lib/ai/rate-limit.ts");

/** The allowance this project ships with. Pinned so a wrong limit fails loudly. */
const EXPECTED_HOURLY_LIMIT = 10;

/** A limiter on a clock the test controls, so expiry is testable instantly. */
function limiterWithClock(overrides = {}) {
  let current = 1_000_000;
  const limiter = createFixedWindowLimiter({
    limit: DEMO_HOURLY_LIMIT,
    windowMs: DEMO_HOURLY_WINDOW_MS,
    now: () => current,
    ...overrides,
  });
  return { limiter, advance: (ms) => (current += ms) };
}

test("the shipped hourly allowance is 10 requests", () => {
  assert.equal(DEMO_HOURLY_LIMIT, EXPECTED_HOURLY_LIMIT);
});

test("allows requests 1-10, then refuses request 11 with a positive Retry-After", () => {
  const { limiter } = limiterWithClock();

  for (let i = 1; i <= 10; i += 1) {
    const decision = limiter.check("visitor-a");
    assert.equal(decision.allowed, true, `request ${i} of 10 should be allowed`);
    assert.equal(decision.retryAfter, 0);
  }

  const eleventh = limiter.check("visitor-a");
  assert.equal(eleventh.allowed, false, "request 11 of 10 must be refused");
  assert.equal(eleventh.retryAfter, DEMO_HOURLY_WINDOW_MS / 1000, "Retry-After should be 3600");
});

test("a second visitor gets its own independent 10-request allowance", () => {
  const { limiter } = limiterWithClock();

  for (let i = 1; i <= 10; i += 1) {
    assert.equal(limiter.check("visitor-a").allowed, true, `visitor-a request ${i} should be allowed`);
  }
  assert.equal(limiter.check("visitor-a").allowed, false, "visitor-a must be capped at 10");

  // visitor-b has spent nothing, so it gets a full allowance of its own.
  for (let i = 1; i <= 10; i += 1) {
    assert.equal(limiter.check("visitor-b").allowed, true, `visitor-b request ${i} should be allowed`);
  }
  assert.equal(limiter.check("visitor-b").allowed, false, "visitor-b must be capped at 10 too");
});

test("buckets are independent per visitor", () => {
  const { limiter } = limiterWithClock();

  for (let i = 0; i < DEMO_HOURLY_LIMIT; i += 1) limiter.check("noisy");
  assert.equal(limiter.check("noisy").allowed, false);

  // A second visitor must be unaffected by the first one's usage.
  assert.equal(limiter.check("quiet").allowed, true);
});

test("still refusing right up to the window edge", () => {
  const { limiter, advance } = limiterWithClock();

  for (let i = 0; i < DEMO_HOURLY_LIMIT; i += 1) limiter.check("visitor-b");
  advance(DEMO_HOURLY_WINDOW_MS - 1_000);
  assert.equal(limiter.check("visitor-b").allowed, false);
});

test("expired entries become available again once the window passes", () => {
  const { limiter, advance } = limiterWithClock();

  for (let i = 0; i < DEMO_HOURLY_LIMIT; i += 1) limiter.check("visitor-c");
  assert.equal(limiter.check("visitor-c").allowed, false);

  advance(DEMO_HOURLY_WINDOW_MS + 1_000);
  assert.equal(limiter.check("visitor-c").allowed, true, "window must reset after expiry");
});

test("a partial window is not enough to reset the counter", () => {
  const { limiter, advance } = limiterWithClock();

  for (let i = 0; i < DEMO_HOURLY_LIMIT; i += 1) limiter.check("visitor-d");
  advance(DEMO_HOURLY_WINDOW_MS / 2);
  assert.equal(limiter.check("visitor-d").allowed, false);
});

test("expired buckets are removed, so memory does not grow without bound", () => {
  const { limiter, advance } = limiterWithClock();

  for (let i = 0; i < 200; i += 1) limiter.check(`visitor-${i}`);
  assert.equal(limiter.size(), 200, "live buckets are retained");

  advance(DEMO_HOURLY_WINDOW_MS + 1_000);
  limiter.check("probe");
  assert.ok(limiter.size() < 200, "expired buckets must be swept");
});

test("tracked keys are capped under a flood of distinct visitors", () => {
  const { limiter } = limiterWithClock({ maxTrackedKeys: 50, sweepIntervalMs: Number.MAX_SAFE_INTEGER });

  for (let i = 0; i < 500; i += 1) limiter.check(`flood-${i}`);

  assert.ok(limiter.size() <= 50, `expected <= 50 tracked keys, got ${limiter.size()}`);
});

test("visitorKey never returns a raw IP and is stable per address", () => {
  const headers = (entries) => new Headers(entries);

  const a1 = visitorKey(headers({ "x-vercel-forwarded-for": "203.0.113.9" }));
  const a2 = visitorKey(headers({ "x-vercel-forwarded-for": "203.0.113.9" }));
  assert.equal(a1, a2, "same address must map to the same bucket");
  assert.ok(!a1.includes("203.0.113.9"), "raw IP must not appear in the key");

  const b = visitorKey(headers({ "x-vercel-forwarded-for": "198.51.100.4" }));
  assert.notEqual(a1, b, "different addresses must not collide");
});

test("platform headers are preferred over the spoofable x-forwarded-for", () => {
  const headers = new Headers({
    "x-vercel-forwarded-for": "203.0.113.9",
    "x-forwarded-for": "10.0.0.1, 203.0.113.9",
  });
  assert.equal(extractClientIp(headers), "203.0.113.9");
});

test("a forged x-forwarded-for prefix cannot displace the real client address", () => {
  // A visitor sending their own x-forwarded-for; the proxy appends the real
  // address last, and the module reads right-to-left.
  const headers = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8, 203.0.113.9" });
  assert.equal(extractClientIp(headers), "203.0.113.9");
});

test("malformed header values are rejected rather than used as bucket keys", () => {
  assert.equal(extractClientIp(new Headers({ "x-forwarded-for": "not-an-ip" })), null);
  assert.equal(extractClientIp(new Headers({ "x-forwarded-for": "999.1.1.1" })), null);
  assert.equal(extractClientIp(new Headers({ "x-forwarded-for": "<script>" })), null);
});

test("requests with no usable address share one stable bucket", () => {
  const missing = visitorKey(new Headers());
  const garbage = visitorKey(new Headers({ "x-forwarded-for": "nonsense" }));
  assert.equal(missing, garbage, "unidentified requests must share a single bucket");
  assert.ok(!missing.includes("nonsense"));
});

test("IPv6 and bracketed forms are accepted", () => {
  assert.equal(extractClientIp(new Headers({ "x-real-ip": "2001:db8::1" })), "2001:db8::1");
  assert.equal(extractClientIp(new Headers({ "x-real-ip": "[2001:db8::1]:443" })), "2001:db8::1");
});

test("the pre-existing minute limiter still allows 12 and refuses the 13th", () => {
  // Guard against a regression in the layer this change had to leave alone.
  const key = visitorKey(new Headers({ "x-forwarded-for": "192.0.2.55" }));

  for (let i = 1; i <= 12; i += 1) {
    const decision = checkRateLimit(key);
    assert.equal(decision.allowed, true, `minute request ${i} should be allowed`);
  }

  const blocked = checkRateLimit(key);
  assert.equal(blocked.allowed, false, "13th request in a minute must be refused");
  assert.ok(blocked.retryAfter > 0 && blocked.retryAfter <= 60, `unexpected retryAfter ${blocked.retryAfter}`);
});

test("the minute limiter counts each visitor separately", () => {
  const a = visitorKey(new Headers({ "x-forwarded-for": "192.0.2.11" }));
  const b = visitorKey(new Headers({ "x-forwarded-for": "192.0.2.12" }));

  for (let i = 0; i < 12; i += 1) checkRateLimit(a);
  assert.equal(checkRateLimit(a).allowed, false);
  assert.equal(checkRateLimit(b).allowed, true, "one visitor must not lock out another");
});

test("the hourly cap still binds before the minute cap", () => {
  // 10/hour is reached before 12/min, so the route's hourly 429 is what a
  // visitor actually sees. Asserted so the two numbers stay honest about it.
  assert.equal(DEMO_HOURLY_LIMIT, 10);
  assert.ok(DEMO_HOURLY_LIMIT < 12, "hourly allowance should bind before the minute allowance");
});
