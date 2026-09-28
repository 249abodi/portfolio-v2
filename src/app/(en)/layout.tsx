import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = getMessages("en");

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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              personJsonLd({
                name: profile.name,
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
        <SiteShell locale="en" messages={messages}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}