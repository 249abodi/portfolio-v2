import type { ReactNode } from "react";
import { buildCommands } from "@/lib/commands";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages/types";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorGlow } from "@/components/cursor-glow";
import { CommandPalette } from "@/components/command-palette";
import { ChatWidget } from "@/components/chat-widget";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function SiteShell({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const commands = buildCommands(messages.palette, locale);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <CommandPalette commands={commands} t={messages.palette} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-contrast"
      >
        {messages.skipToContent}
      </a>
      <Header nav={messages.nav} t={messages.header} locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer t={messages.footer} nav={messages.nav} />
      <ChatWidget locale={locale} t={messages.chat} />
    </>
  );
}