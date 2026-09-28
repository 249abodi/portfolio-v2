import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  JetBrains_Mono,
  Noto_Kufi_Arabic,
  Noto_Sans_Arabic,
  Space_Grotesk,
} from "next/font/google";
import "@/app/globals.css";
import ThemeScript from "@/components/theme-script";
import { SiteShell } from "@/components/site-shell";
import { getMessages } from "@/lib/i18n";
import { personJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";
import { contact, profile } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: "variable",
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: "variable",
  variable: "--font-noto-kufi-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "عبدالرحمن محمد — مطوّر ويب متكامل ومطوّر تطبيقات SaaS",
    template: "%s — عبدالرحمن محمد",
  },
  description:
    "معرض أعمال عبدالرحمن محمد، طالب هندسة برمجيات ومطوّر ويب متكامل يبني منتجات من أنظمة نقاط البيع إلى منصات SaaS متعددة المستأجرين.",
  keywords: [
    "عبدالرحمن محمد",
    "مطوّر ويب متكامل",
    "مطوّر ويب",
    "مطوّر تطبيقات SaaS",
    "مطوّر React",
    "مطوّر Next.js",
    "طالب هندسة برمجيات",
  ],
  authors: [{ name: profile.name, url: contact.github }],
  creator: profile.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function ArLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = getMessages("ar");

  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable} ${notoKufiArabic.variable}`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              personJsonLd({
                name: messages.person.name,
                jobTitle: messages.person.jobTitle,
                knowsAbout: messages.person.knowsAbout,
                image: "/profile.jpg",
                sameAs: [contact.github, contact.youtube, contact.instagram, contact.facebook],
              })
            ),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteShell locale="ar" messages={messages}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}