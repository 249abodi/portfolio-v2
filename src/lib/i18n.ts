import { ar } from "@/lib/messages/ar";
import { en } from "@/lib/messages/en";
import type { Messages } from "@/lib/messages/types";

export type Locale = "en" | "ar";

export const defaultLocale: Locale = "en";

export const locales: readonly Locale[] = ["en", "ar"] as const;

export const rtlLocales: readonly Locale[] = ["ar"] as const;

export function isRTL(locale: Locale): boolean {
  return locale === "ar";
}

export function getMessages(locale: Locale): Messages {
  return locale === "ar" ? ar : en;
}

/**
 * Returns the path for a given locale.
 * English (the default locale) stays unprefixed; Arabic lives under /ar/.
 */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === "en") return path === "/" ? "/" : path;
  if (path === "/") return "/ar/";
  return `/ar${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizePath(path: string): string {
  if (path === "/") return "/";
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

/**
 * Computes the URL for switching locale given the current pathname.
 * Handles trailing slashes and the ar prefix (e.g. /ar/projects/qaveno/).
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const normalized = normalizePath(pathname);
  if (target === "en") {
    return normalized === "/ar/" ? "/" : normalized.replace(/^\/ar\//, "/");
  }
  if (normalized === "/") return "/ar/";
  if (normalized.startsWith("/ar/")) return normalized;
  return `/ar${normalized}`;
}