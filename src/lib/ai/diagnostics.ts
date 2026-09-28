/**
 * Server-side diagnostics for the portfolio assistant.
 *
 * Everything here is redacted before it reaches a log sink, and nothing is ever
 * sent to the browser — the client always receives a generic, friendly message.
 *
 * Never log: API keys, Authorization headers, tokens, or env var values.
 * Only log whether a variable is *present*.
 */

const MAX_MESSAGE_CHARS = 300;

const SECRET_PATTERNS: RegExp[] = [
  /AIza[0-9A-Za-z_\-]{10,}/g,
  /Bearer\s+[^\s"']+/gi,
  /(sk|pk|rk)-[0-9A-Za-z_\-]{8,}/g,
  /("(?:api[_-]?key|access[_-]?token|authorization|password|secret)"\s*:\s*)"[^"]*"/gi,
  /([?&](?:key|api_key|apikey|access_token|token)=)[^&\s"']+/gi,
];

/** Strips anything that looks like a credential from an upstream message. */
export function redact(input: string): string {
  let out = input;
  for (const pattern of SECRET_PATTERNS) out = out.replace(pattern, "[redacted]");
  return out.length > MAX_MESSAGE_CHARS
    ? `${out.slice(0, MAX_MESSAGE_CHARS)}… (${out.length} chars)`
    : out;
}

function isDev(): boolean {
  return process.env.NODE_ENV !== "production";
}

type Fields = Record<string, string | number | boolean | null | undefined | string[]>;

/** Expected failures — always logged (server side only) so Vercel logs are useful. */
export function warn(event: string, fields?: Fields): void {
  console.warn(`[assistant] ${event}`, fields ?? {});
}

/** Verbose happy-path tracing — development only. */
export function trace(event: string, fields?: Fields): void {
  if (isDev()) console.info(`[assistant] ${event}`, fields ?? {});
}

/**
 * Reports which chat env vars exist, without revealing any value.
 * Safe to call on every request; logs names and booleans only.
 */
export function reportEnvPresence(): void {
  const presence = {
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    OPENAI_BASE_URL: Boolean(process.env.OPENAI_BASE_URL),
    OPENAI_MODEL: Boolean(process.env.OPENAI_MODEL),
  };
  const missing = Object.entries(presence)
    .filter(([, present]) => !present)
    .map(([name]) => name);
  if (missing.length > 0) warn("env.missing", { missing });
  else trace("env.present", presence);
}
