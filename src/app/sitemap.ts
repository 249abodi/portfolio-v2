import type { MetadataRoute } from "next";
import { localizedPath, locales } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/projects/qaveno/", priority: 0.8 },
  { path: "/projects/zelvoa/", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(path, locale)),
      lastModified: new Date(),
      changeFrequency: priority === 1 ? "monthly" : "monthly",
      priority,
      alternates: { languages: localeAlternates(path) },
    }))
  );
}