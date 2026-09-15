import { contact } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, Github } from "@/components/icons";

const repos = [
  {
    name: "QAVENO",
    description: "Business management & POS platform — Electron, Node.js, SQLite",
    url: "https://qaveno.vercel.app/",
    repoUrl: "https://github.com/249abodi/QAVENO",
    language: "JavaScript",
    tag: "Desktop + SaaS",
  },
  {
    name: "ZELVOA",
    description: "Social media management SaaS — Next.js, React, TypeScript, PostgreSQL",
    url: "https://zelvoa.vercel.app/",
    repoUrl: "https://github.com/249abodi",
    language: "TypeScript",
    tag: "SaaS",
  },
  {
    name: "portfolio-v2",
    description: "This site — Next.js, React, TypeScript, Tailwind CSS, static export",
    url: null,
    repoUrl: "https://github.com/249abodi/portfolio-v2",
    language: "TypeScript",
    tag: "Portfolio",
  },
];

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
};

export function GitHubSection() {
  return (
    <section id="github" className="section relative" aria-label="GitHub">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="section-kicker">Open Source</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="section-title mt-4">From GitHub to production.</h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent md:pb-1"
            >
              <Github size={16} />
              View Profile
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 80}>
              <SpotlightCard className="card group flex h-full flex-col p-6 transition-[border-color,transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-fg transition-colors duration-[var(--duration-base)] group-hover:text-accent">
                      {repo.name}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-sunken px-2.5 py-0.5 font-mono text-[0.6rem] text-fg-muted">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: langColors[repo.language] ?? "var(--fg-faint)" }}
                        aria-hidden
                      />
                      {repo.language}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-surface-sunken px-2.5 py-1 font-mono text-[0.6rem] text-fg-faint">
                    {repo.tag}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-subtle">
                  {repo.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {repo.url ? (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-solid px-4 text-xs font-semibold text-accent-contrast transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Live
                      <ArrowUpRight size={12} />
                    </a>
                  ) : null}
                  <a
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Github size={13} />
                    Code
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
