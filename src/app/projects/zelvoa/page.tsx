import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, ArrowRight, Check, Github } from "@/components/icons";
import { ZelvoaArchDiagram } from "@/sections/arch-diagrams";

export const metadata: Metadata = {
  title: "ZELVOA — Case Study",
  description:
    "ZELVOA is a multi-tenant SaaS platform for social media management — scheduling content, running campaigns, and tracking analytics with role-based access.",
  openGraph: {
    title: "ZELVOA — Case Study — Abdulrahman Mohammed",
    description:
      "A multi-tenant SaaS platform for social media management with scheduling, campaigns, and analytics.",
    type: "website",
  },
};

const stack = [
  { name: "Next.js", role: "Full-stack React framework" },
  { name: "React", role: "UI component library" },
  { name: "TypeScript", role: "Type-safe development" },
  { name: "PostgreSQL", role: "Relational database" },
  { name: "Prisma", role: "Database ORM & migrations" },
];

const features = [
  "Content calendar with visual scheduling across platforms",
  "AI content assistant for captions, hashtags, and variations",
  "Analytics dashboard tracking reach, engagement, and followers",
  "Unified inbox for messages from every connected platform",
  "Campaign management with goals, timelines, and reporting",
  "Organizations and workspaces for team collaboration",
  "Role-based access with approval workflows and audit trails",
  "Multi-tenant architecture with per-organization isolation",
];

const challenges = [
  {
    title: "Multi-Tenant Data Isolation",
    description:
      "Building a SaaS where each organization has its own workspace, social accounts, and content pipeline — with clean data boundaries and role-based scoping across the entire platform.",
  },
  {
    title: "Unified Social API Integration",
    description:
      "Connecting to Instagram, Facebook, TikTok, LinkedIn, and X with a clean provider abstraction — handling OAuth flows, rate limits, and clear integration status when providers are unavailable.",
  },
  {
    title: "Content Scheduling Reliability",
    description:
      "Ensuring scheduled posts publish on time with a safe job queue, retry logic, and transparent status — never faking a publish when an integration is down.",
  },
];

const results = [
  "Multi-tenant SaaS with organization-level data isolation",
  "Supports Instagram, Facebook, TikTok, LinkedIn, and X",
  "Free tier with 1 social account and 10 posts per month",
  "Tiered pricing from Free to Agency plan",
];

export default function ZelvoaCaseStudy() {
  return (
    <section className="section relative">
      <div className="container-site">
        <nav className="mb-10" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
            <li>
              <Link href="/#projects" className="transition-colors duration-200 hover:text-accent">
                Projects
              </Link>
            </li>
            <li aria-hidden className="text-fg-faint">/</li>
            <li aria-current="page" className="text-fg-muted">ZELVOA</li>
          </ol>
        </nav>

        <Reveal>
          <p className="section-kicker">Case Study</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="section-title mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            ZELVOA
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="prose-lede mt-5">
            A multi-tenant SaaS platform for social media management — scheduling content, running
            campaigns, and tracking analytics with role-based access for teams and organizations.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://zelvoa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Live Site
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/249abodi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Github size={16} />
              Source Code
            </a>
          </div>
        </Reveal>

        <Reveal variant="lg" delay={180}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-border">
            <div className="bg-surface px-6 py-4 sm:px-10">
              <p className="mono-label text-fg-muted">Architecture Overview</p>
            </div>
            <div className="border-t border-border bg-surface-sunken p-4 sm:p-8">
              <ZelvoaArchDiagram />
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">The Problem</h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
                Social media managers and businesses juggle multiple platforms — each with its own
                posting interface, analytics, and inbox. There&apos;s no single workspace that handles
                scheduling, collaboration, and reporting across Instagram, Facebook, TikTok, LinkedIn,
                and X without the complexity of enterprise tools.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-fg">The Solution</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
                ZELVOA is a browser-based SaaS that unifies social media management into one workspace.
                Built with Next.js and PostgreSQL, it provides a content calendar, AI content assistant,
                unified inbox, campaign management, and analytics — with a multi-tenant architecture
                that supports organizations, teams, and approval workflows.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={80}>
              <SpotlightCard className="card p-7">
                <p className="mono-label text-fg-muted">Tech Stack</p>
                <div className="mt-5 space-y-4">
                  {stack.map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <div>
                        <p className="text-sm font-medium text-fg">{item.name}</p>
                        <p className="text-xs text-fg-subtle">{item.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight text-fg">Key Features</h2>
        </Reveal>
        <Reveal delay={60}>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight text-fg">Technical Challenges</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {challenges.map((challenge, i) => (
            <Reveal key={challenge.title} delay={i * 60}>
              <SpotlightCard className="card group h-full p-6 transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-border-strong">
                <span className="font-mono text-[0.65rem] text-fg-faint" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-fg">
                  {challenge.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-subtle">
                  {challenge.description}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight text-fg">Results</h2>
        </Reveal>
        <Reveal delay={60}>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {results.map((result) => (
              <li key={result} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                {result}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="lg" delay={100}>
          <div className="mt-20 flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-10 text-center shadow-card sm:p-14">
            <p className="section-kicker">Previous Case Study</p>
            <Link
              href="/projects/qaveno/"
              className="group inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-fg transition-colors duration-[var(--duration-base)] hover:text-accent"
            >
              QAVENO
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href="/#projects"
            className="font-mono text-xs text-fg-subtle transition-colors duration-200 hover:text-accent"
          >
            ← Back to all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
