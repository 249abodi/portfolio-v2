import type { Messages } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { MapPin } from "@/components/icons";

export function About({ t }: { t: Messages["about"] }) {
  return (
    <section id="about" className="section relative" aria-label="About">
      <div className="container-site">
        <Reveal>
          <p className="section-kicker">{t.kicker}</p>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal delay={60}>
              <h2 className="section-title">{t.title}</h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-7 space-y-5 text-pretty leading-relaxed text-fg-muted">
                {t.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                {t.facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className="stagger-cell group bg-surface p-4 transition-colors duration-[var(--duration-base)] hover:bg-surface-raised"
                    style={{ "--cell-delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    <dt className="mono-label text-[0.65rem] text-fg-subtle">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal variant="lg" delay={160}>
            <SpotlightCard className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-surface p-7 shadow-card">
              <div>
                <div className="flex items-center justify-between">
                  <p className="mono-label text-fg-muted">{t.whatIPlayWith}</p>
                  <span className="status-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
                </div>
                <ul className="mt-5 space-y-3.5 text-sm text-fg-muted">
                  {t.lines.map((line, i) => (
                    <li
                      key={line}
                      className="flex gap-3"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-[var(--duration-base)] group-hover:scale-125" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-sunken p-4 transition-colors duration-[var(--duration-base)] group-hover:border-border-strong">
                <MapPin size={18} className="shrink-0 text-accent" />
                <p className="text-sm text-fg-subtle">
                  {t.openToWork}{" "}
                  <a href="#contact" className="text-accent underline-offset-4 hover:underline">
                    {t.letsTalk}
                  </a>
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}