import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import type { Messages, PaletteCommand } from "@/lib/messages/types";

export function buildCommands(
  palette: Messages["palette"],
  locale: Locale,
): PaletteCommand[] {
  return palette.commands.map((command) => ({
    ...command,
    href: command.href.startsWith("/")
      ? localizedPath(command.href, locale)
      : command.href,
  }));
}