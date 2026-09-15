import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, ArrowRight, Check, Github } from "@/components/icons";
import { QavenoArchDiagram } from "@/sections/arch-diagrams";

export const metadata: Metadata = {
  title: "QAVENO — Case Study",
  description:
    "QAVENO is a business management and point-of-sale platform built with Electron, Node.js, and SQLite — handling sales, inventory, purchasing, branches, and user roles.",
  openGraph: {
    title: "QAVENO — Case Study — Abdulrahman Mohammed",
    description:
      "A business management and POS platform that runs as a desktop app and a SaaS product.",
    type: "website",
  },
};

const stack = [
  { name: "Electron", role: "Desktop runtime" },
  { name: "Node.js", role: "Backend & business logic" },
  { name: "SQLite", role: "Offline-first local database" },
  { name: "JavaScript", role: "Full-stack language" },
];

const features = [
  "POS terminal with barcode scanning and keyboard shortcuts",
  "Real-time inventory with weighted-average costing",
  "Sales and purchasing workflows with full audit trail",
  "Multi-branch operations with inter-branch stock transfers",
  "Role-based access — owner, admin, manager, cashier",
  "AI-powered demand forecasting and anomaly detection",
  "Offline-first architecture with optional cloud sync",
  "Desktop app and SaaS deployment modes",
];

const challenges = [
  {
    title: "Offline-First Data Consistency",
    description:
      "Building a system that works without internet while keeping multi-branch data consistent required careful conflict resolution and a local-first database strategy with SQLite.",
  },
  {
    title: "Multi-Branch Stock Transfers",
    description:
      "Implementing inter-branch dispatch and receive with partial transfers and weighted-average cost blending across locations added significant complexity to the inventory layer.",
  },
  {
    title: "Role-Based Permissions at Scale",
    description:
      "Granular permissions across owner, admin, manager, and cashier roles — with branch-level scoping and full audit logging — required a well-structured access control system.",
  },
];

const results = [
  "Full-featured POS system running on Windows desktop",
  "Multi-branch inventory management with real-time tracking",
  "SaaS deployment via Vercel with tiered pricing",
  "24-hour free trial with no credit card required",
];

export default function QavenoCaseStudy() {
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
            <li aria-current="page" className="text-fg-muted">QAVENO</li>
          </ol>
        </nav>

        <Reveal>
          <p className="section-kicker">Case Study</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="section-title mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            QAVENO
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="prose-lede mt-5">
            A business management and point-of-sale platform that runs as a desktop app and a
            SaaS product — handling sales, inventory, purchasing, branches, and user roles across
            the full business workflow.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://qaveno.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Live Site
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/249abodi/QAVENO"
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
              <QavenoArchDiagram />
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
                Small and mid-size retailers need a professional POS and inventory system but often
                can&apos;t rely on cloud-only solutions — unreliable internet, complex setup, and high
                subscription costs make existing options impractical. They need something that works
                offline, scales across branches, and doesn&apos;t require an IT team to operate.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-fg">The Solution</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
                QAVENO is an offline-first desktop platform built on Electron with a local SQLite
                database. It combines a fast POS terminal with inventory management, purchasing,
                multi-branch operations, and analytics — all running locally with optional cloud sync.
                A SaaS tier hosted on Vercel extends access for teams that want centralized control.
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
            <p className="section-kicker">Next Case Study</p>
            <Link
              href="/projects/zelvoa/"
              className="group inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-fg transition-colors duration-[var(--duration-base)] hover:text-accent"
            >
              ZELVOA
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
