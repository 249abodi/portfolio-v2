import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeScript from "@/components/theme-script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorGlow } from "@/components/cursor-glow";
import { CommandPalette } from "@/components/command-palette";
import { contact, profile } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

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

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${profile.name} — Full-Stack Web Developer & SaaS Developer`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Portfolio of Abdulrahman Mohammed, a software engineering student and full-stack developer building products from POS systems to multi-tenant SaaS platforms.",
  keywords: [
    "Abdulrahman Mohammed",
    "full-stack developer",
    "web developer",
    "SaaS developer",
    "React developer",
    "Next.js developer",
    "software engineering student",
  ],
  authors: [{ name: profile.name, url: contact.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — Full-Stack Web Developer & SaaS Developer`,
    description:
      "Software engineering student and full-stack developer. Building products from POS systems to multi-tenant SaaS platforms.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — Software Engineering Student / Full-Stack Web Developer / SaaS Developer` }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full-Stack Web Developer`,
    description:
      "Software engineering student and full-stack developer building products from POS systems to SaaS platforms.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: absoluteUrl("/"),
  email: `mailto:${contact.email}`,
  jobTitle: "Full-Stack Web Developer",
  knowsAbout: ["Web Development", "SaaS", "React", "Next.js", "Node.js", "PostgreSQL"],
  sameAs: [contact.github, contact.youtube, contact.instagram, contact.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollProgress />
        <CursorGlow />
        <CommandPalette />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}