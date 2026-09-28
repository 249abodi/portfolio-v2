import type { Messages } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

export function Stats({ t }: { t: Messages["stats"] }) {
  return (
    <section id="stats" className="section relative" aria-label="Engineering Stats">
      <div className="grid-backdrop" aria-hidden />

      <div className="container-site relative">
        <div className="text-center">
          <Reveal>
            <p className="section-kicker">{t.kicker}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="section-title mt-4">{t.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="prose-lede mt-5 mx-auto">{t.lede}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <SpotlightCard className="card group flex h-full flex-col items-center p-6 text-center transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-border-strong sm:p-8">
                <span className="font-display text-4xl font-semibold tracking-tight text-accent transition-transform duration-[var(--duration-base)] group-hover:scale-105 sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-3 font-display text-sm font-semibold tracking-tight text-fg">
                  {stat.label}
                </span>
                <span className="mt-1.5 text-xs text-fg-subtle">{stat.detail}</span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="mono-label text-fg-muted">{t.technicalHighlights}</p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {t.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}