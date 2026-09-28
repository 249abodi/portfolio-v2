import { createHash, randomBytes } from "node:crypto";

/**
 * Turns a request into a stable, non-reversible bucket key.
 *
 * Two privacy properties this module is responsible for:
 *  1. Raw IP addresses are never stored in memory, logged, or returned. The
 *     limiter only ever sees a short salted digest.
 *  2. The salt is generated per process instance and never persisted, so the
 *     digests cannot be reversed from a memory dump and are not comparable
 *     across instances or cold starts.
 *
 * Header trust order. On Vercel these headers are written by the platform and
 * any client-supplied copy is stripped before the function runs, which makes
 * them trustworthy. `x-forwarded-for` is append-only: every proxy in the chain
 * appends the address it saw, so a visitor who forges a header only ever
 * controls the *left-most* entries. This module therefore reads that header
 * right-to-left and takes the first well-formed address, which discards forged
 * prefixes instead of trusting them.
 *
 * If a deployment sits behind a proxy that strips all of these, every visitor
 * collapses into one shared bucket. That is the intended conservative outcome
 * for a zero-cost demo, not a bug.
 */
const PLATFORM_IP_HEADERS = ["x-vercel-forwarded-for", "x-real-ip", "x-forwarded-for"] as const;

/** Stable key for requests with no usable address (local dev, some CDNs). */
const UNIDENTIFIED_KEY = "unidentified";

/** Longest plausible textual IPv6 representation, e.g. with an IPv4 tail. */
const MAX_IPV6_LENGTH = 45;

function isIpv4(value: string): boolean {
  const parts = value.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}

function isIpv6(value: string): boolean {
  return value.includes(":") && value.length <= MAX_IPV6_LENGTH && /^[0-9a-f:.]+$/.test(value);
}

/** Returns a canonical-ish address, or null when the candidate is not an IP. */
function normaliseIp(candidate: string): string | null {
  let value = candidate.trim().toLowerCase();
  if (!value) return null;

  // Bracketed IPv6, optionally with a port: "[::1]" / "[::1]:443".
  if (value.startsWith("[")) {
    const end = value.indexOf("]");
    if (end === -1) return null;
    value = value.slice(1, end);
  }

  if (isIpv4(value) || isIpv6(value)) return value;
  return null;
}

/** Extracts the most trustworthy client address available, or null. */
export function extractClientIp(headers: Headers): string | null {
  for (const name of PLATFORM_IP_HEADERS) {
    const raw = headers.get(name);
    if (!raw) continue;

    const candidates = raw.split(",");
    for (let index = candidates.length - 1; index >= 0; index -= 1) {
      const ip = normaliseIp(candidates[index]);
      if (ip) return ip;
    }
  }
  return null;
}

/**
 * A per-instance random salt. Regenerated on every cold start, so a digest
 * captured from one warm instance is useless against another.
 */
const SALT = randomBytes(16);

/** 64 bits of digest: plenty to key a bucket, short enough to stay unreadable. */
const DIGEST_CHARS = 16;

/** Bucket key for the request. Never the raw IP. */
export function visitorKey(headers: Headers): string {
  const ip = extractClientIp(headers);
  if (!ip) return UNIDENTIFIED_KEY;
  return createHash("sha256").update(SALT).update(ip).digest("hex").slice(0, DIGEST_CHARS);
}
