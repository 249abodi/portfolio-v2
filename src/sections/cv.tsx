import { contact, profile } from "@/lib/site";
import type { Messages } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, Check } from "@/components/icons";

export function CV({ t }: { t: Messages["cv"] }) {
  return (
    <section id="cv" className="section relative" aria-label="CV">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="section-kicker">{t.kicker}</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="section-title mt-4">{t.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.requestFullCv}
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal variant="lg">
            <SpotlightCard className="card h-full p-7">
              <p className="mono-label text-fg-muted">{t.education}</p>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-fg">
                    {t.degree}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{profile.university}</p>
                  <p className="mt-0.5 text-xs text-fg-subtle">{t.locationFocus}</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal variant="lg" delay={80}>
            <SpotlightCard className="card h-full p-7">
              <p className="mono-label text-fg-muted">{t.coreExpertise}</p>
              <ul className="mt-5 space-y-3">
                {t.expertise.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="mono-label text-fg-muted">{t.technologies}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {t.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border bg-surface-sunken px-3.5 py-1.5 text-sm font-medium text-fg-muted transition-[border-color,color] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}