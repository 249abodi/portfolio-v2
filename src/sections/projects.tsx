import { projects } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, ArrowRight, Check, Github } from "@/components/icons";
import { PortfolioPreview, QavenoPreview, ZelvoaPreview } from "@/sections/project-previews";

const previews = [QavenoPreview, ZelvoaPreview, PortfolioPreview];
const statuses = ["Released", "In development", "This site"];

export function Projects() {
  return (
    <section id="projects" className="section relative" aria-label="Projects">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="section-kicker">Selected Work</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="section-title mt-4">Products I&apos;ve designed and shipped.</h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-sm text-sm leading-relaxed text-fg-subtle md:pb-1">
              Three full-stack systems, each built from the ground up — UI, backend, database and
              deployment decisions included.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-6">
          {projects.map((project, i) => {
            const Preview = previews[i];
            const status = statuses[i];
            const featured = i === 0;
            return (
              <Reveal key={project.name} variant="lg" delay={i * 80}>
                <SpotlightCard
                  as="article"
                  className={`card group overflow-hidden transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover ${
                    featured ? "grid lg:grid-cols-2" : "grid md:grid-cols-2"
                  }`}
                >
                  <div className="relative overflow-hidden border-b border-border p-3 md:p-5 lg:border-b-0 lg:border-r">
                    <div className="overflow-hidden rounded-xl">
                      <Preview className="aspect-[16/10] transition-transform duration-[var(--duration-slower)] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]" />
                    </div>
                    <span className="absolute left-6 top-6 rounded-full border border-border bg-surface/90 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-muted backdrop-blur transition-colors duration-[var(--duration-base)] group-hover:border-accent/40">
                      {status}
                    </span>
                  </div>

                  <div className="flex flex-col p-6 md:p-9">
                    <div>
                      <p className="font-mono text-[0.65rem] text-fg-faint" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg transition-colors duration-[var(--duration-base)] group-hover:text-accent">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-sm text-accent">{project.tagline}</p>
                    </div>

                    <p className="mt-5 text-pretty leading-relaxed text-fg-subtle">{project.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-surface-sunken px-3 py-1 font-mono text-[0.7rem] text-fg-muted transition-colors duration-[var(--duration-base)] group-hover:border-accent/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-muted">
                          <Check size={15} className="mt-0.5 shrink-0 text-accent transition-transform duration-[var(--duration-base)] group-hover:scale-110" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
                        >
                          View Project
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      ) : null}
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} source code on GitHub`}
                          className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                        >
                          <Github size={16} />
                          Source
                        </a>
                      ) : null}
                      {project.caseStudy ? (
                        <a
                          href={project.caseStudy}
                          className="group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                        >
                          Case Study
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </a>
                      ) : null}
                    </div>
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