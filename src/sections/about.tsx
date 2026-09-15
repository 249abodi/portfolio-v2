import { profile } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { MapPin } from "@/components/icons";

const facts = [
  { label: "Name", value: "Abdulrahman Mohammed" },
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "Full-stack products & SaaS" },
  { label: "Studying", value: "Software Engineering" },
];

export function About() {
  return (
    <section id="about" className="section relative" aria-label="About">
      <div className="container-site">
        <Reveal>
          <p className="section-kicker">About</p>
        </Reveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal delay={60}>
              <h2 className="section-title">
                A software engineering student who ships real products.
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-7 space-y-5 text-pretty leading-relaxed text-fg-muted">
                <p>
                  I&apos;m Abdulrahman — a software engineering student at{" "}
                  <span className="text-fg">{profile.university}</span>. What started as curiosity
                  about how the web works became a habit of designing and building complete
                  products: interfaces, APIs, databases, and everything in between.
                </p>
                <p>
                  Most recently I&apos;ve built{" "}
                  <span className="text-fg">QAVENO</span>, a business management & POS platform that
                  runs as a desktop app and a SaaS product, and{" "}
                  <span className="text-fg">ZELVOA</span>, a multi-tenant SaaS for social media
                  management. Both are full-stack systems — auth, role-based access, real-time
                  workflows, and clean UIs.
                </p>
                <p>
                  I care about products that are honest about what they do — fast, accessible,
                  and simple to use. I&apos;m currently deepening my skills across system design and
                  modern full-stack architecture.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                {facts.map((fact, i) => (
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
                  <p className="mono-label text-fg-muted">What I play with</p>
                  <span className="status-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
                </div>
                <ul className="mt-5 space-y-3.5 text-sm text-fg-muted">
                  {[
                    "Full-stack architecture across desktop, web & SaaS",
                    "Product design — interfaces, flows, systems thinking",
                    "Databases, auth & role-based access",
                    "Turning vague ideas into shipped software",
                  ].map((line, i) => (
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
                  Open to work on freelance & student projects —{" "}
                  <a href="#contact" className="text-accent underline-offset-4 hover:underline">
                    let&apos;s talk
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