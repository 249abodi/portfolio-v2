"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { nav } from "@/lib/site";
import { Close, Menu, Moon, Sun } from "@/components/icons";

const THEME_KEY = "theme";

function getSnapshot(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_KEY);
  } catch {
    /* storage unavailable */
  }
  return stored === "light" ? "light" : "dark";
}

function getServerSnapshot(): "dark" | "light" {
  return "dark";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage unavailable */
  }
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    applyTheme(next);
    window.dispatchEvent(new Event("storage"));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors duration-[var(--duration-base)] hover:border-border-strong hover:text-accent active:scale-95"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`header-bar fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
          aria-label="Abdulrahman Mohammed — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-solid text-sm font-bold text-accent-contrast transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-105">
            {profileMonogram}
          </span>
          <span className="hidden sm:inline">Abdulrahman<span className="text-accent">.</span></span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className={`nav-link relative rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:-translate-y-px ${
                active === item.href
                  ? "text-accent"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:hidden" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            aria-label="Open command palette"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 font-mono text-[0.65rem] text-fg-faint transition-colors duration-[var(--duration-base)] hover:border-border-strong hover:text-fg-muted md:inline-flex"
          >
            <span>⌘K</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors duration-[var(--duration-base)] hover:border-border-strong hover:text-accent active:scale-95 md:hidden"
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden ${open ? "block" : "hidden"}`}
        aria-hidden={!open}
      >
        <nav className="container-site flex flex-col gap-1 border-t border-border py-4" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active === item.href
                  ? "bg-accent-soft text-accent"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const profileMonogram = "AM";