# Locale / hreflang Strategy

## Locale Map

| Locale | URL Path | Dir | Notes |
|--------|----------|-----|-------|
| `en` | `/` | LTR | Default locale, unprefixed |
| `ar` | `/ar/` | RTL | Arabic localized under `/ar/` |

### Example Pages

| Page | EN URL | AR URL |
|------|--------|--------|
| Home | `/` | `/ar/` |
| QAVENO | `/projects/qaveno/` | `/ar/projects/qaveno/` |
| ZELVOA | `/projects/zelvoa/` | `/ar/projects/zelvoa/` |

## Implementation

### Routing

Route groups handle locale-specific root layouts:

```
src/app/
├── (en)/layout.tsx          # lang="en" dir="ltr"
├── (en)/page.tsx
├── (en)/projects/qaveno/page.tsx
├── (en)/projects/zelvoa/page.tsx
├── (ar)/ar/layout.tsx       # lang="ar" dir="rtl"
├── (ar)/ar/page.tsx
├── (ar)/ar/projects/qaveno/page.tsx
├── (ar)/ar/projects/zelvoa/page.tsx
├── robots.ts
├── sitemap.ts
└── icon.svg
```

### hreflang in Metadata

Every page exports metadata with `alternates.languages`:

```ts
alternates: {
  canonical: "https://249abodii.vercel.app/projects/qaveno/",
  languages: {
    en: "https://249abodii.vercel.app/projects/qaveno/",
    ar: "https://249abodii.vercel.app/ar/projects/qaveno/",
    "x-default": "https://249abodii.vercel.app/projects/qaveno/",
  },
}
```

### sitemap.xml

Generated with `alternates` on each `<url>` entry. Each page/ locale pair gets its own entry in `sitemap.xml` with `languages` pointing to the other locale.

### robots.ts

Explicit rules allow all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) on all pages. No `X-Robots-Tag` header; static export only.

## Why No Country Redirects / Middleware

1. Static-only export — no runtime on Vercel
2. No server-side IP detection available
3. Locale is chosen by the user via the language switcher in the header
4. `x-default` always points to EN

## i18n Pattern

Messages are fully typed via `Messages` type in `src/lib/messages/types.ts`. Both `en` and `ar` catalogs `satisfies Messages`, enforced by TypeScript. Every key is translated or deliberately kept Latin (brand names, tech terms).

### `src/lib/i18n.ts` API

```ts
type Locale = "en" | "ar";
defaultLocale: "en";
locales: ["en", "ar"];
isRTL(locale): boolean;                 // true for "ar"
getMessages(locale): Messages;
localizedPath(path, locale): string;     // e.g. localizedPath("/projects/qaveno/", "ar") → "/ar/projects/qaveno/"
switchLocalePath(pathname, target): string;
```

### Sections receive typed props

Each section receives a localized slice of `Messages`:

```tsx
<Hero t={messages.hero} name={messages.person.name} />
<Skills t={messages.skills} />
```

Client components (Header, CommandPalette, ContactForm) receive pre-serialized props from server layouts.

### RTL

Tailwind v4 `rtl:` variant handles directional flipping. Physical offsets use Tailwind v4 logical utilities (`-end-3` for inline-end). Arrow icons use `rtl:rotate-180`. Font overrides in `globals.css` set Arabic fonts via `[dir="rtl"]` selector.
