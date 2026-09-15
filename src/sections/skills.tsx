import { skills } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

export function Skills() {
  return (
    <section id="skills" className="section relative" aria-label="Skills">
      <div className="grid-backdrop" aria-hidden />

      <div className="container-site relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="section-kicker">Skills & Tools</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="section-title mt-4">A practical full-stack toolkit.</h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-sm text-sm leading-relaxed text-fg-subtle md:pb-1">
              Grouped by how I use them day to day — from interface design down to the database.
              Currently focused on TypeScript, React and the Next.js ecosystem.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i * 40}
              className={group.group === "Frontend" ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <SpotlightCard className="card group h-full p-6 transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-border-strong">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="mono-label text-fg-muted">{group.group}</h3>
                  <span className="font-mono text-[0.65rem] text-fg-faint transition-colors duration-[var(--duration-base)] group-hover:text-accent" aria-hidden>
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface-sunken px-3 py-1.5 text-[0.8rem] font-medium text-fg-muted transition-[border-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}