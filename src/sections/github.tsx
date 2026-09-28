import { company, contact, zelvoa } from "@/lib/site";
import type { Messages } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, Github } from "@/components/icons";

const urls = [
  { name: "QAVENO", url: company.href, repoUrl: company.repo, language: "JavaScript" },
  { name: "ZELVOA", url: zelvoa.href, repoUrl: zelvoa.repo, language: "TypeScript" },
  { name: "portfolio-v2", url: null, repoUrl: "https://github.com/249abodi/portfolio-v2", language: "TypeScript" },
];

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
};

export function GitHubSection({ t }: { t: Messages["github"] }) {
  return (
    <section id="github" className="section relative" aria-label="GitHub">
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
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent md:pb-1"
            >
              <Github size={16} />
              {t.viewProfile}
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.repos.map((repo, i) => {
            const info = urls[i];
            return (
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
                          style={{ backgroundColor: langColors[info?.language ?? ""] ?? "var(--fg-faint)" }}
                          aria-hidden
                        />
                        {info?.language ?? "TypeScript"}
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
                    {info?.url ? (
                      <a
                        href={info.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-solid px-4 text-xs font-semibold text-accent-contrast transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {t.live}
                        <ArrowUpRight size={12} />
                      </a>
                    ) : null}
                    <a
                      href={info?.repoUrl ?? contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <Github size={13} />
                      {t.code}
                    </a>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}