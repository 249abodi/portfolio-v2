"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChatMarkdown } from "@/components/chat-markdown";
import { Close, Send, Sparkles, Trash } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages/types";
import { contact } from "@/lib/site";

type UiMessage = { role: "user" | "assistant"; content: string };

type Status = "idle" | "streaming" | "error" | "unavailable";

const ENDPOINT = "/api/chat/";

export function ChatWidget({ locale, t }: { locale: Locale; t: Messages["chat"] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bufferRef = useRef("");
  const frameRef = useRef(0);
  const generationRef = useRef(0);
  const lastPromptRef = useRef("");

  const busy = status === "streaming";

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const reset = useCallback(() => {
    generationRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    bufferRef.current = "";
    lastPromptRef.current = "";
    setMessages([]);
    setInput("");
    setStatus("idle");
  }, []);

  useEffect(() => {
    const onUnmount = () => {
      generationRef.current += 1;
      abortRef.current?.abort();
    };
    return onUnmount;
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, status, open]);

  const send = useCallback(
    async (raw: string) => {
      const content = raw.trim();
      if (!content || abortRef.current) return;

      const generation = generationRef.current;
      const history: UiMessage[] = [...messages, { role: "user", content }];
      lastPromptRef.current = content;

      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setStatus("streaming");

      const controller = new AbortController();
      abortRef.current = controller;
      bufferRef.current = "";

      const flush = () => {
        frameRef.current = 0;
        setMessages([...history, { role: "assistant", content: bufferRef.current }]);
      };

      const settle = (partial: boolean) => {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        const text = bufferRef.current;
        bufferRef.current = "";
        if (partial && text) {
          setMessages([...history, { role: "assistant", content: text }]);
        } else {
          setMessages(history);
        }
        setStatus("idle");
      };

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            messages: history
              .filter((m) => m.content.trim().length > 0)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: controller.signal,
        });

        if (generation !== generationRef.current) return;

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as {
            error?: { code?: string };
          } | null;
          setMessages(history);
          setStatus(payload?.error?.code === "not_configured" ? "unavailable" : "error");
          return;
        }

        if (!response.body) {
          setMessages(history);
          setStatus("error");
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bufferRef.current += decoder.decode(value, { stream: true });
          if (frameRef.current === 0) frameRef.current = requestAnimationFrame(flush);
        }

        if (generation !== generationRef.current) return;
        flush();
        settle(false);
      } catch {
        if (generation !== generationRef.current) return;
        settle(true);
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
      }
    },
    [messages, locale]
  );

  const onKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  const showSuggestions = messages.length === 0;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        aria-label={open ? t.closeAria : t.openAria}
        className="fixed bottom-5 end-5 z-[90] inline-flex h-13 w-13 items-center justify-center rounded-full border border-border bg-accent-solid text-accent-contrast shadow-pop transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Sparkles size={20} />
      </button>

      {open && (
        <div
          id="portfolio-assistant"
          role="dialog"
          aria-label={t.title}
          className="fixed bottom-22 end-5 z-[90] flex h-[min(32rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Sparkles size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">{t.title}</p>
              <p className="truncate text-xs text-fg-subtle">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={messages.length === 0}
              aria-label={t.resetAria}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors duration-200 hover:text-fg disabled:opacity-30 disabled:hover:text-fg-subtle"
            >
              <Trash size={15} />
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label={t.closeAria}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors duration-200 hover:text-fg"
            >
              <Close size={16} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="max-w-[92%] rounded-xl rounded-es-sm border border-border bg-surface-raised px-3.5 py-2.5">
              <ChatMarkdown content={t.greeting} />
            </div>

            {showSuggestions && (
              <div>
                <p className="eyebrow mb-2">{t.suggestionsTitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.suggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void send(question)}
                      className="rounded-full border border-border bg-surface-sunken px-2.5 py-1 text-start text-xs text-fg-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, i) => {
              if (message.role === "user") {
                return (
                  <p
                    key={`u${i}`}
                    className="ms-auto max-w-[88%] rounded-xl rounded-ee-sm bg-accent-soft px-3.5 py-2.5 text-sm leading-relaxed text-fg"
                  >
                    {message.content}
                  </p>
                );
              }

              if (!message.content && busy) {
                return (
                  <p
                    key={`a${i}`}
                    aria-label={t.thinking}
                    className="flex items-center gap-1.5 rounded-xl rounded-es-sm border border-border bg-surface-raised px-3.5 py-3"
                  >
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        aria-hidden
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                        style={{ animationDelay: `${dot * 160}ms` }}
                      />
                    ))}
                  </p>
                );
              }

              if (!message.content) return null;

              return (
                <div
                  key={`a${i}`}
                  className="max-w-[92%] rounded-xl rounded-es-sm border border-border bg-surface-raised px-3.5 py-2.5"
                >
                  <ChatMarkdown content={message.content} />
                </div>
              );
            })}

            {status === "error" && (
              <div className="rounded-xl border border-border bg-surface-sunken px-3.5 py-2.5 text-xs text-fg-subtle">
                <p>{t.errorTitle}</p>
                <button
                  type="button"
                  onClick={() => void send(lastPromptRef.current)}
                  className="mt-1.5 text-accent underline decoration-accent/40 underline-offset-2"
                >
                  {t.errorRetry}
                </button>
              </div>
            )}

            {status === "unavailable" && (
              <p className="rounded-xl border border-border bg-surface-sunken px-3.5 py-2.5 text-xs text-fg-subtle">
                {t.unconfigured}{" "}
                <a
                  href={`mailto:${contact.email}`}
                  aria-label={t.contactAria}
                  className="text-accent underline decoration-accent/40 underline-offset-2"
                >
                  {contact.email}
                </a>
              </p>
            )}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                className="max-h-24 min-h-10 flex-1 resize-none rounded-xl border border-border bg-surface-sunken px-3 py-2.5 text-sm leading-relaxed text-fg outline-none transition-colors duration-200 placeholder:text-fg-faint focus:border-accent"
              />
              {busy ? (
                <button
                  type="button"
                  onClick={stop}
                  aria-label={t.stopAria}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-raised text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  <Close size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={!input.trim()}
                  aria-label={t.sendAria}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-solid text-accent-contrast transition-all duration-200 hover:opacity-90 disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
            <p className="mt-2 text-center font-mono text-[0.6rem] text-fg-faint">{t.disclaimer}</p>
          </div>
        </div>
      )}
    </>
  );
}
