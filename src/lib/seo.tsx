import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { localizedPath, locales } from "@/lib/i18n";
import type { FaqItem } from "@/lib/messages/types";
import { absoluteUrl } from "@/lib/site-url";

export type PageOptions = {
  locale: Locale;
  basePath: string;
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  siteName?: string;
};

export function localeAlternates(basePath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localizedPath(basePath, locale));
  }
  languages["x-default"] = absoluteUrl(localizedPath(basePath, "en"));
  return languages;
}

export function buildPageMetadata(options: PageOptions): Metadata {
  const basePath = options.basePath.startsWith("/")
    ? options.basePath
    : `/${options.basePath}`;
  const canonical = absoluteUrl(localizedPath(basePath, options.locale));

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    alternates: {
      canonical,
      languages: localeAlternates(basePath),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: options.siteName,
      title: options.ogTitle ?? options.title,
      description: options.ogDescription ?? options.description,
      locale: options.locale === "ar" ? "ar_SA" : "en_US",
      images: options.ogImage
        ? [{ url: absoluteUrl(options.ogImage), alt: options.ogImageAlt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: options.ogTitle ?? options.title,
      description: options.ogDescription ?? options.description,
      images: options.ogImage ? [absoluteUrl(options.ogImage)] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export function personJsonLd(options: {
  name: string;
  jobTitle: string;
  knowsAbout?: string[];
  image?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl("/")}#person`,
    name: options.name,
    jobTitle: options.jobTitle,
    url: absoluteUrl("/"),
    image: options.image ? absoluteUrl(options.image) : undefined,
    knowsAbout: options.knowsAbout,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universiti Teknologi Malaysia",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MY",
    },
    sameAs: options.sameAs,
  };
}

export function softwareJsonLd(options: {
  id: string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  datePublished?: string;
  offers: {
    priceCurrency: string;
    lowPrice: number;
    highPrice: number;
    offerCount: number;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": options.id,
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: options.applicationCategory,
    operatingSystem: options.operatingSystem,
    author: { "@id": `${absoluteUrl("/")}#person` },
    datePublished: options.datePublished,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: options.offers.priceCurrency,
      lowPrice: options.offers.lowPrice,
      highPrice: options.offers.highPrice,
      offerCount: options.offers.offerCount,
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function renderJsonLd(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}