"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Close } from "@/components/icons";

type CommandItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  category: "section" | "project" | "link";
};

const commands: CommandItem[] = [
  { id: "home", label: "Home", description: "Go to hero section", href: "#home", category: "section" },
  { id: "about", label: "About", description: "Learn about me", href: "#about", category: "section" },
  { id: "skills", label: "Skills", description: "View technical skills", href: "#skills", category: "section" },
  { id: "projects", label: "Projects", description: "See selected work", href: "#projects", category: "section" },
  { id: "stats", label: "Engineering Stats", description: "Technical highlights", href: "#stats", category: "section" },
  { id: "github", label: "GitHub", description: "Open source projects", href: "#github", category: "section" },
  { id: "cv", label: "CV", description: "Education & expertise", href: "#cv", category: "section" },
  { id: "services", label: "Services", description: "What I can build for you", href: "#services", category: "section" },
  { id: "contact", label: "Contact", description: "Get in touch", href: "#contact", category: "section" },
  { id: "qaveno", label: "QAVENO Case Study", description: "POS & inventory platform", href: "/projects/qaveno/", category: "project" },
  { id: "zelvoa", label: "ZELVOA Case Study", description: "Social media management SaaS", href: "/projects/zelvoa/", category: "project" },
  { id: "github-profile", label: "GitHub Profile", description: "github.com/249abodi", href: "https://github.com/249abodi", category: "link" },
  { id: "qaveno-live", label: "QAVENO Live", description: "qaveno.vercel.app", href: "https://qaveno.vercel.app/", category: "link" },
  { id: "zelvoa-live", label: "ZELVOA Live", description: "zelvoa.vercel.app", href: "https://zelvoa.vercel.app/", category: "link" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setActiveIndex(0);
  }, []);

  const runCommand = useCallback(
    (cmd: CommandItem) => {
      setOpen(false);
      setQuery("");
      if (cmd.href.startsWith("#")) {
        const el = document.querySelector(cmd.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (cmd.href.startsWith("/")) {
        window.location.href = cmd.href;
      } else {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      }
    },
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (filtered.length > 0) setActiveIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (filtered.length > 0) setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        runCommand(filtered[activeIndex]);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, activeIndex, filtered, runCommand]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[activeIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm"
        onClick={() => { setOpen(false); setQuery(""); }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <span className="font-mono text-sm text-fg-faint" aria-hidden>&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search sections, projects, links…"
            className="flex-1 bg-transparent py-4 text-sm text-fg outline-none placeholder:text-fg-faint"
            role="combobox"
            aria-expanded
            aria-controls="command-list"
            aria-activedescendant={filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined}
          />
          <button
            type="button"
            onClick={() => { setOpen(false); setQuery(""); }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors duration-200 hover:text-fg"
            aria-label="Close command palette"
          >
            <Close size={16} />
          </button>
        </div>

        <div
          ref={listRef}
          id="command-list"
          role="listbox"
          className="max-h-72 overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-fg-subtle">No results found.</p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                id={`cmd-${cmd.id}`}
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                onClick={() => runCommand(cmd)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                  i === activeIndex ? "bg-accent-soft text-accent" : "text-fg-muted hover:bg-surface-raised"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface-sunken font-mono text-[0.6rem] text-fg-faint">
                  {cmd.category === "section" ? "#" : cmd.category === "project" ? "/" : "↗"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fg">{cmd.label}</p>
                  <p className="truncate text-xs text-fg-subtle">{cmd.description}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-surface-sunken px-2 py-0.5 font-mono text-[0.55rem] text-fg-faint">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[0.6rem] text-fg-faint">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
