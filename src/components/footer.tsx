import { contact, nav, profile } from "@/lib/site";
import { Facebook, Github, Instagram, Mail, MapPin, Youtube } from "@/components/icons";

const socials = [
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "YouTube", href: contact.youtube, icon: Youtube },
  { label: "Instagram", href: contact.instagram, icon: Instagram },
  { label: "Facebook", href: contact.facebook, icon: Facebook },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              Abdulrahman<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-subtle">
              Software engineering student & full-stack developer building products that solve real
              problems — from POS systems to SaaS platforms.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mono-label text-fg-muted">Sections</p>
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
            <p className="mono-label text-fg-muted">Connect</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
                  >
                    <Icon size={16} className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5" />
                    {label}
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
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Abdulrahman Mohammed. Built from scratch.</p>
          <p className="font-mono">no templates · no frameworks-heavy · just clean code</p>
        </div>
      </div>
    </footer>
  );
}