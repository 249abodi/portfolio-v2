import Image from "next/image";
import { contact, profile } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Facebook, Github, Instagram, Mail, Youtube } from "@/components/icons";

const socials = [
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "YouTube", href: contact.youtube, icon: Youtube },
  { label: "Instagram", href: contact.instagram, icon: Instagram },
  { label: "Facebook", href: contact.facebook, icon: Facebook },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" aria-label="Introduction">
      <div className="grid-backdrop" aria-hidden />

      <div className="container-site relative grid min-h-[100svh] items-center gap-14 pt-32 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="section-kicker flex items-center gap-2.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="motion-pulse absolute inline-flex h-full w-full rounded-full bg-accent" />
              </span>
              Software Engineering Student · UTM
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="heading-display mt-6 text-[clamp(2.7rem,7vw,4.9rem)]">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mono-label mt-5 text-fg-muted">
              {profile.roles.join("   ·   ")}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <p className="prose-lede mt-6">{profile.tagline}</p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02]"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-border-strong px-6 text-sm font-medium text-fg transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:border-accent hover:text-accent"
              >
                <Mail size={16} />
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <div className="flex items-center gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-fg-subtle transition-colors duration-[var(--duration-base)] hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <span className="hidden h-8 w-px bg-border-strong sm:block" aria-hidden />
              <p className="font-mono text-xs text-fg-subtle">
                <span className="text-accent">$</span> npm run build
                <span className="ml-1 text-fg-faint">— always shipping</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="lg" delay={200} className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] lg:max-w-[400px]">
            <div className="absolute -inset-3 rounded-[2rem] bg-accent-soft blur-2xl" aria-hidden />
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border shadow-card-hover">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 400px, 340px"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-sunken/40 via-transparent to-transparent" aria-hidden />
            </div>

            <span className="absolute -left-4 top-8 hidden rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted shadow-pop sm:block motion-float">
              hello<span className="text-accent">_</span>world
            </span>

            <span className="absolute -right-5 bottom-14 hidden rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted shadow-pop sm:block motion-float [animation-delay:-3s]">
              made with <span className="text-accent">next.js</span>
            </span>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle transition-colors duration-200 hover:text-accent md:flex"
        aria-label="Scroll to About"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">scroll</span>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
          <path d="M7 1v14M2 11l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}