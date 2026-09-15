import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";

const stats = [
  {
    value: "3",
    label: "Full-Stack Products",
    detail: "QAVENO, ZELVOA, and portfolio-v2",
  },
  {
    value: "5",
    label: "Backend Services",
    detail: "POS, Inventory, Analytics, Inbox, Campaigns",
  },
  {
    value: "5",
    label: "Platform Integrations",
    detail: "Instagram, Facebook, TikTok, LinkedIn, X",
  },
  {
    value: "8+",
    label: "Technologies",
    detail: "Electron, Next.js, Node.js, PostgreSQL, and more",
  },
];

const highlights = [
  "Offline-first desktop architecture with Electron and SQLite",
  "Multi-tenant SaaS with organization-level data isolation",
  "Role-based access control across all products",
  "Real-time inventory with weighted-average cost tracking",
  "AI-powered demand forecasting and content generation",
  "Static-optimized portfolio with zero runtime dependencies",
];

export function Stats() {
  return (
    <section id="stats" className="section relative" aria-label="Engineering Stats">
      <div className="grid-backdrop" aria-hidden />

      <div className="container-site relative">
        <div className="text-center">
          <Reveal>
            <p className="section-kicker">Engineering</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="section-title mt-4">Built with depth, not just breadth.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="prose-lede mt-5 mx-auto">
              Every product here was designed and built from scratch — UI, backend, database,
              and deployment decisions included.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
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
            <p className="mono-label text-fg-muted">Technical Highlights</p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {highlights.map((item) => (
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
