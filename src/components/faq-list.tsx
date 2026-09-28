import type { FaqItem } from "@/lib/messages/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-border bg-surface transition-colors duration-[var(--duration-base)] open:border-border-strong hover:border-border-strong"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-fg transition-colors duration-200 select-none hover:text-accent">
            <span className="text-pretty">{item.q}</span>
            <ChevronIndicator />
          </summary>
          <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-fg-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

function ChevronIndicator() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 text-fg-subtle transition-transform duration-[var(--duration-base)] group-open:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}