import Image from "next/image";
import { contact, profile } from "@/lib/site";
import { ArrowRight, Facebook, Github, Instagram, Youtube } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";

const socials = [
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "YouTube", href: contact.youtube, icon: Youtube },
  { label: "Instagram", href: contact.instagram, icon: Instagram },
  { label: "Facebook", href: contact.facebook, icon: Facebook },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" aria-label="Introduction">
      <div
        className="hero-grid grid-backdrop"
        aria-hidden
      />
      <div
        className="motion-glow absolute -top-40 right-[-15%] h-[36rem] w-[36rem] rounded-full bg-accent-soft blur-3xl"
        aria-hidden
      />

      <div className="container-site relative grid min-h-[100svh] items-center gap-14 pt-32 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="hero-item section-kicker flex items-center gap-2.5" style={{ "--hero-delay": "0ms" } as React.CSSProperties}>
            <span className="status-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
            Software Engineering Student · UTM
          </p>

          <h1
            className="hero-item heading-display mt-6 text-[clamp(2.7rem,7vw,4.9rem)]"
            style={{ "--hero-delay": "120ms" } as React.CSSProperties}
          >
            {profile.name}
          </h1>

          <p
            className="hero-item mono-label mt-5 text-fg-muted"
            style={{ "--hero-delay": "200ms" } as React.CSSProperties}
          >
            {profile.roles.join("   ·   ")}
          </p>

          <p
            className="hero-item prose-lede mt-6"
            style={{ "--hero-delay": "280ms" } as React.CSSProperties}
          >
            {profile.tagline}
          </p>

          <div
            className="hero-item mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5"
            style={{ "--hero-delay": "340ms" } as React.CSSProperties}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            <span className="font-mono text-[0.7rem] text-fg-subtle">Available for freelance projects</span>
          </div>

          <div className="hero-item mt-9 flex flex-wrap items-center gap-3.5" style={{ "--hero-delay": "420ms" } as React.CSSProperties}>
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.28}>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-border-strong px-6 text-sm font-medium text-fg transition-[border-color,background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Get in touch
              </a>
            </Magnetic>
          </div>

          <div className="hero-item mt-12 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ "--hero-delay": "560ms" } as React.CSSProperties}>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
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
        </div>

        <div className="hero-portrait mx-auto w-full max-w-sm lg:max-w-none">
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

            <span className="absolute -left-4 top-8 hidden rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted shadow-pop motion-float sm:block">
              hello<span className="text-accent">_</span>world
            </span>

            <span className="absolute -right-5 bottom-14 hidden rounded-lg border border-border bg-surface px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted shadow-pop motion-float [animation-delay:-3s] sm:block">
              made with <span className="text-accent">next.js</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="hero-item absolute bottom-7 left-1/2 hidden md:block"
        style={{ "--hero-delay": "900ms" } as React.CSSProperties}
      >
        <a
          href="#about"
          className="flex -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle transition-colors duration-200 hover:text-accent"
          aria-label="Scroll to About"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">scroll</span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            aria-hidden
            className="motion-float [animation-duration:2.4s]"
          >
            <path d="M7 1v14M2 11l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}