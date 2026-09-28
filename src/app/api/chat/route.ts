import { visitorKey } from "@/lib/ai/client-identity";
import { checkDemoLimit } from "@/lib/ai/demo-limit";
import { redact, reportEnvPresence, trace, warn } from "@/lib/ai/diagnostics";
import { clearUpstreamCooldown, isUpstreamInCooldown, noteUpstreamDown, upstreamCooldownRetryAfter } from "@/lib/ai/upstream-cooldown";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { MAX_MESSAGES, MAX_MESSAGE_CHARS } from "@/lib/ai/types";
import type { ChatMessage, ChatRequest } from "@/lib/ai/types";
import type { Locale } from "@/lib/i18n";

export const runtime = "nodejs";
// 3 attempts x 25s timeout + backoff needs more than the 30s default.
export const maxDuration = 60;

/**
 * Defaults target Google's OpenAI-compatible endpoint (Gemini free tier), because
 * that is the intended backend. Any OpenAI-compatible provider still works by
 * overriding OPENAI_BASE_URL / OPENAI_MODEL.
 */
const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai";
const DEFAULT_MODEL = "gemini-3.5-flash";

const MAX_NEW_TOKENS = 1024;
const UPSTREAM_TIMEOUT_MS = 25_000;
const MAX_ATTEMPTS = 3;

/**
 * Retry congestion (503 "high demand"), not quota exhaustion (429) — waiting out a
 * daily quota in a chat request just burns the visitor's time, so 429 fails fast.
 */
const RETRYABLE_STATUS = new Set([408, 500, 502, 503, 504]);
const RETRY_BASE_DELAY_MS = 700;

/**
 * Shown when the upstream cannot serve, including when the Gemini free tier's
 * daily allowance is spent. Deliberately says nothing about quota, billing,
 * models, or configuration. The browser renders its own generic copy, so this
 * string is what an API client sees.
 */
const UPSTREAM_UNAVAILABLE_MESSAGE = "AI demo is temporarily unavailable. Please try again later or contact me directly.";

type StreamStats = { deltas: number; parseFailures: number; sawDone: boolean };

/**
 * Decodes the upstream SSE body into plain text deltas, tolerating keep-alive
 * comments, frames split across chunk boundaries, and a missing final newline.
 */
async function* iterateUpstreamDeltas(
  body: ReadableStream<Uint8Array>,
  stats: StreamStats
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const handleLine = (rawLine: string): string | null => {
    const trimmed = rawLine.trim();
    if (!trimmed) return null;
    // SSE comment / keep-alive frame.
    if (trimmed.startsWith(":")) return null;
    if (!trimmed.startsWith("data:")) {
      trace("upstream.unexpected_line", { preview: trimmed.slice(0, 80) });
      return null;
    }

    const data = trimmed.slice(5).trim();
    if (data === "[DONE]") {
      stats.sawDone = true;
      return null;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(data);
    } catch {
      stats.parseFailures += 1;
      return null;
    }

    logStreamMeta(parsed);
    return extractDelta(parsed);
  };

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const delta = handleLine(line);
        if (delta) {
          stats.deltas += 1;
          yield delta;
        }
      }
    }

    // Flush any trailing line that never received its newline.
    const delta = handleLine(buffer);
    if (delta) {
      stats.deltas += 1;
      yield delta;
    }
  } finally {
    reader.releaseLock();
  }
}

function error(status: number, code: string, message: string, retryAfter?: number) {
  return Response.json(
    { error: { code, message } },
    {
      status,
      headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
    }
  );
}

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ar";
}

function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) {
    warn("request.invalid_messages", { received: Array.isArray(input) ? input.length : "not-an-array" });
    return null;
  }

  const messages: ChatMessage[] = [];
  for (const entry of input) {
    if (typeof entry !== "object" || entry === null) return null;
    const { role, content } = entry as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") {
      warn("request.bad_role", { role: typeof role === "string" ? role : typeof role });
      return null;
    }
    if (typeof content !== "string") {
      warn("request.bad_content", { type: typeof content });
      return null;
    }
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) {
      warn("request.bad_length", { chars: trimmed.length, max: MAX_MESSAGE_CHARS });
      return null;
    }
    messages.push({ role, content: trimmed });
  }

  // The first message must come from the visitor so the model always has context.
  if (messages[0].role !== "user") {
    warn("request.first_message_not_user", { role: messages[0].role });
    return null;
  }

  // Drop trailing assistant turns that have no user reply after them.
  while (messages.length > 1 && messages[messages.length - 1].role === "assistant") {
    messages.pop();
  }

  return messages;
}

/** Normalises the configured base URL and rejects anything that isn't http(s). */
function resolveBaseUrl(): string | null {
  const raw = (process.env.OPENAI_BASE_URL || DEFAULT_BASE_URL).trim();
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin + url.pathname.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

/**
 * Maps an upstream HTTP failure to a client code. The message stays generic on
 * purpose — the specific cause is logged server-side, never returned.
 */
function classifyStatus(status: number): { code: string; message: string; status: number } {
  if (status === 401 || status === 403) {
    return {
      code: "upstream_auth",
      message: "The assistant is temporarily unavailable.",
      status: 502,
    };
  }
  if (status === 404) {
    return {
      code: "upstream_model",
      message: "The assistant is temporarily unavailable.",
      status: 502,
    };
  }
  if (status === 429) {
    return { code: "upstream_rate", message: UPSTREAM_UNAVAILABLE_MESSAGE, status: 503 };
  }
  if (status >= 500) {
    return { code: "upstream_unavailable", message: UPSTREAM_UNAVAILABLE_MESSAGE, status: 503 };
  }
  return { code: "upstream_error", message: UPSTREAM_UNAVAILABLE_MESSAGE, status: 502 };
}

/** Pulls a short, redacted explanation out of an upstream error body. */
async function upstreamMessage(response: Response): Promise<string> {
  try {
    const text = await response.text();
    if (!text) return `<empty body, content-type: ${response.headers.get("content-type") ?? "unknown"}>`;
    try {
      const parsed: unknown = JSON.parse(text);
      const record = parsed as { error?: { message?: string; status?: string }; message?: string };
      return redact(record?.error?.message ?? record?.message ?? text);
    } catch {
      return redact(text);
    }
  } catch {
    return "<body unreadable>";
  }
}

function extractDelta(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) return null;
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;
  const delta = (choices[0] as { delta?: { content?: unknown } }).delta;
  if (typeof delta?.content === "string" && delta.content.length > 0) return delta.content;
  return null;
}

/** Logs finish_reason / usage metadata the provider attaches to a streamed chunk. */
function logStreamMeta(payload: unknown): void {
  if (typeof payload !== "object" || payload === null) return;

  const record = payload as { choices?: unknown; usage?: unknown };
  if (Array.isArray(record.choices) && record.choices.length > 0) {
    const finish = (record.choices[0] as { finish_reason?: unknown }).finish_reason;
    if (typeof finish === "string" && finish !== "null") trace("upstream.finish", { finish_reason: finish });
  }
  if (record.usage) trace("upstream.usage", { usage: JSON.stringify(record.usage) });
}

export async function POST(request: Request) {
  reportEnvPresence();

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    warn("config.missing_api_key", { hint: "set OPENAI_API_KEY in the deployment environment" });
    return error(503, "not_configured", "The portfolio assistant is not configured on this deployment.");
  }

  const baseUrl = resolveBaseUrl();
  if (!baseUrl) {
    warn("config.invalid_base_url", { hint: "OPENAI_BASE_URL must be an http(s) URL" });
    return error(503, "not_configured", "The portfolio assistant is not configured on this deployment.");
  }

  const model = (process.env.OPENAI_MODEL || DEFAULT_MODEL).trim();
  trace("config.resolved", { baseUrl, model, maxTokens: MAX_NEW_TOKENS });

  // Both limiters key off a salted digest, so no raw IP is stored anywhere.
  const visitor = visitorKey(request.headers);

  // Layer 1: existing burst protection, unchanged.
  const limit = checkRateLimit(visitor);
  if (!limit.allowed) {
    trace("rate.limited", { scope: "minute", retryAfter: limit.retryAfter });
    return error(429, "rate_limited", "Too many messages. Please wait a moment.", limit.retryAfter);
  }

  // Layer 2: hourly demo cap, so a slow drip cannot drain the daily free tier.
  // warn, not trace: this is the limit that actually binds, and a production
  // rollout needs to be able to see visitors hitting it. Deliberately logs no
  // visitor key, IP, or digest — only the scope and the retry delay.
  const demo = checkDemoLimit(visitor);
  if (!demo.allowed) {
    warn("rate.hourly_limit", { retryAfter: demo.retryAfter });
    return error(429, "demo_limit_reached", "Demo limit reached. Please try again later.", demo.retryAfter);
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    warn("request.invalid_json", {});
    return error(400, "invalid_json", "Request body must be valid JSON.");
  }

  const messages = parseMessages(body?.messages);
  if (!messages) {
    return error(400, "invalid_messages", "Messages array is missing, empty, or malformed.");
  }

  const locale: Locale = isLocale(body?.locale) ? body.locale : "en";

  // Placed after validation on purpose: a malformed request still gets its 400
  // instead of being masked by the breaker. When the upstream is already refusing
  // traffic, fail fast rather than pay for another doomed round-trip.
  if (isUpstreamInCooldown()) {
    const retryAfter = upstreamCooldownRetryAfter();
    warn("upstream.cooldown", { retryAfter });
    return error(503, "upstream_unavailable", UPSTREAM_UNAVAILABLE_MESSAGE, retryAfter);
  }

  const payload = JSON.stringify({
    model,
    stream: true,
    temperature: 0.3,
    max_tokens: MAX_NEW_TOKENS,
    messages: [
      { role: "system", content: buildSystemPrompt(locale) },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  });

  // Bounded retries for congestion only; 429 quota exhaustion fails fast (see RETRYABLE_STATUS).
  let upstream: Response | null = null;
  let timedOut = false;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    if (attempt > 0) {
      const previous = upstream?.status ?? null;
      upstream = null;
      trace("upstream.retry", { attempt, previous_status: previous, wait_ms: RETRY_BASE_DELAY_MS * attempt });
      await new Promise((resolve) => setTimeout(resolve, RETRY_BASE_DELAY_MS * attempt));
    }

    const timeout = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);
    try {
      upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          Accept: "text/event-stream",
        },
        body: payload,
        signal: AbortSignal.any([request.signal, timeout]),
      });
    } catch (caught) {
      upstream = null;
      // Distinguish our own timeout from the visitor closing the chat panel.
      timedOut = timeout.aborted && !request.signal.aborted;
      warn("upstream.transport_error", {
        attempt,
        timeout: timedOut,
        client_aborted: request.signal.aborted && !timedOut,
        detail: String((caught as Error)?.message ?? caught).slice(0, 200),
      });
      if (request.signal.aborted) break;
      // Retrying a timeout would just multiply the visitor's wait; only 503/5xx retry.
      if (timedOut) break;
      continue;
    }

    if (upstream.ok) {
      // Proof the upstream is serving again, so drop any breaker immediately.
      clearUpstreamCooldown();
      break;
    }

    const detail = await upstreamMessage(upstream);
    warn("upstream.http_error", {
      attempt,
      status: upstream.status,
      statusText: upstream.statusText,
      model,
      detail: String(detail).slice(0, 300),
    });

    // 429 on the free tier means the daily allowance is spent, and it does not
    // come back within this request. Open the breaker so the next visitor is not
    // made to wait for the same refusal.
    if (upstream.status === 429) noteUpstreamDown();

    if (!RETRYABLE_STATUS.has(upstream.status)) break;
  }

  if (!upstream) {
    return error(
      timedOut ? 504 : 502,
      timedOut ? "upstream_timeout" : "upstream_unreachable",
      timedOut
        ? "The assistant took too long to respond. Please try again."
        : "The assistant could not be reached. Please try again."
    );
  }

  if (!upstream.ok || !upstream.body) {
    const classified = classifyStatus(upstream.status);
    return error(classified.status, classified.code, classified.message);
  }

  const stats: StreamStats = { deltas: 0, parseFailures: 0, sawDone: false };
  const tokens = iterateUpstreamDeltas(upstream.body, stats);

  // Wait for the first real token before committing to a 200. Otherwise a stream that
  // yields nothing (garbage SSE, empty body) would be locked in as a blank success.
  let first: IteratorResult<string>;
  try {
    first = await tokens.next();
  } catch (caught) {
    warn("upstream.failed_before_first_token", {
      model,
      detail: String((caught as Error)?.message ?? caught).slice(0, 200),
    });
    return error(502, "upstream_unreachable", "The assistant could not be reached. Please try again.");
  }

  if (first.done) {
    warn("upstream.empty_stream", {
      model,
      sawDone: stats.sawDone,
      parseFailures: stats.parseFailures,
    });
    return error(502, "upstream_empty", "The assistant is temporarily unavailable.");
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(first.value));
        for (;;) {
          const next = await tokens.next();
          if (next.done) break;
          controller.enqueue(encoder.encode(next.value));
        }
        if (stats.parseFailures > 0) warn("upstream.parse_failures", { parseFailures: stats.parseFailures });
        if (stats.sawDone) {
          trace("upstream.complete", { model, deltas: stats.deltas });
        } else {
          warn("upstream.truncated_stream", { deltas: stats.deltas });
        }
      } catch (caught) {
        // Keep whatever was already delivered; the widget renders the partial answer.
        warn("upstream.stream_interrupted", {
          deltas: stats.deltas,
          detail: String((caught as Error)?.message ?? caught).slice(0, 200),
        });
      } finally {
        controller.close();
      }
    },
    cancel() {
      void tokens.return(undefined);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
