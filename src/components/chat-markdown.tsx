import type { ReactNode } from "react";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function safeHref(href: string): string | null {
  const trimmed = href.trim();
  if (trimmed.startsWith("/")) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") {
      return trimmed;
    }
  } catch {
    return null;
  }
  return null;
}

function isExternal(href: string): boolean {
  return !href.startsWith("/");
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-i${index++}`;

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-fg">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded border border-border bg-surface-sunken px-1 py-0.5 font-mono text-[0.8em] text-accent"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      const label = linkMatch?.[1] ?? "";
      const href = linkMatch ? safeHref(linkMatch[2]) : null;

      if (!href) {
        nodes.push(label || token);
      } else {
        nodes.push(
          <a
            key={key}
            href={href}
            {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors duration-150 hover:decoration-accent"
          >
            {label}
          </a>
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  const lines = source.split("\n");
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ kind: "list", items: listItems });
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^(---|\*\*\*|___)$/.test(trimmed)) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "heading", text: heading[2] });
      continue;
    }

    const bullet = /^[-*•]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      flushParagraph();
      listItems.push(bullet[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export function ChatMarkdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-2.5 text-sm leading-relaxed text-fg-muted">
      {blocks.map((block, i) => {
        if (block.kind === "list") {
          return (
            <ul key={`b${i}`} className="space-y-1 ps-1">
              {block.items.map((item, j) => (
                <li key={`b${i}-l${j}`} className="flex gap-2">
                  <span aria-hidden className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span className="min-w-0 flex-1">{renderInline(item, `b${i}-l${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.kind === "heading") {
          return (
            <p key={`b${i}`} className="pt-1 font-display text-[0.95rem] font-semibold text-fg">
              {renderInline(block.text, `b${i}`)}
            </p>
          );
        }

        return <p key={`b${i}`}>{renderInline(block.text, `b${i}`)}</p>;
      })}
    </div>
  );
}
