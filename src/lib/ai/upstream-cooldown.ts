/**
 * Short-lived circuit breaker for an upstream that has stopped serving traffic.
 *
 * Why this exists: on the Gemini free tier the entire project shares a very small
 * daily request allowance. Once that is spent, every further request comes back
 * 429 RESOURCE_EXHAUSTED until the quota resets at midnight Pacific. Without a
 * breaker each visitor still pays a full round-trip to be told the same thing,
 * so a spent quota degrades the whole site for the rest of the day.
 *
 * What this is NOT: it is not a quota mechanism and it raises no limit. It only
 * avoids repeating a call that just failed, and it never shortens a wait a
 * visitor is entitled to. Quota enforcement stays entirely Google's job.
 *
 * Same serverless caveat as the in-memory rate limiters: state is per process,
 * so several instances each keep their own breaker and a cold start clears it.
 * That is acceptable here because the worst case is a handful of extra failed
 * upstream calls, not a correctness problem.
 */

const COOLDOWN_MS = 10 * 60 * 1000;

let cooldownUntil = 0;

/** True while the upstream is known to be refusing traffic. */
export function isUpstreamInCooldown(now: number = Date.now()): boolean {
  return now < cooldownUntil;
}

/** Seconds until the upstream may be tried again; 0 when it may be tried now. */
export function upstreamCooldownRetryAfter(now: number = Date.now()): number {
  return Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
}

/** Opens or refreshes the breaker after the upstream refused for quota reasons. */
export function noteUpstreamDown(now: number = Date.now()): void {
  cooldownUntil = now + COOLDOWN_MS;
}

/** Closes the breaker as soon as the upstream serves again. */
export function clearUpstreamCooldown(): void {
  cooldownUntil = 0;
}
