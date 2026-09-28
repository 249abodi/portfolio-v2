import { contact } from "@/lib/site";
import type { Messages, NavItem } from "@/lib/messages/types";
import { Facebook, Github, Instagram, Mail, MapPin, Youtube } from "@/components/icons";

const socials = [
  { key: "github", href: contact.github, icon: Github },
  { key: "youtube", href: contact.youtube, icon: Youtube },
  { key: "instagram", href: contact.instagram, icon: Instagram },
  { key: "facebook", href: contact.facebook, icon: Facebook },
];

export function Footer({ t, nav }: { t: Messages["footer"]; nav: NavItem[] }) {
  return (
    <footer className="border-t border-border">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              Abdulrahman<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-subtle">
              {t.tagline}
            </p>
          </div>

          <nav aria-label={t.sections}>
            <p className="mono-label text-fg-muted">{t.sections}</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono-label text-fg-muted">{t.connect}</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map(({ key, href, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
                  >
                    <Icon size={16} className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5" />
                    {t.socialLabels[key as keyof typeof t.socialLabels]}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-2 text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
                >
                  <Mail size={16} className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5" />
                  {contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-fg-subtle">
                <MapPin size={16} />
                {t.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {t.name}. {t.copyright}</p>
          <p className="font-mono">{t.subline}</p>
        </div>
      </div>
    </footer>
  );
}