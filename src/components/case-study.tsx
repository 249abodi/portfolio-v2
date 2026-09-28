import Link from "next/link";
import type { ReactNode } from "react";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { CaseStudyContent } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { FaqList } from "@/components/faq-list";
import { ArrowUpRight, ArrowRight, Check, Github } from "@/components/icons";

export function CaseStudy({
  locale,
  t,
  name,
  productUrl,
  repoUrl,
  arch,
}: {
  locale: Locale;
  t: CaseStudyContent;
  name: string;
  productUrl: string;
  repoUrl: string;
  arch: ReactNode;
}) {
  const projectsHref = `${localizedPath("/", locale)}#projects`;
  const navHref = localizedPath(t.navHref, locale);

  return (
    <section className="section relative">
      <div className="container-site">
        <nav className="mb-10" aria-label={t.breadcrumbLabel}>
          <ol className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
            <li>
              <Link href={projectsHref} className="transition-colors duration-200 hover:text-accent">
                {t.breadcrumbProjects}
              </Link>
            </li>
            <li aria-hidden className="text-fg-faint">/</li>
            <li aria-current="page" className="text-fg-muted">{name}</li>
          </ol>
        </nav>

        <Reveal>
          <p className="section-kicker">{t.kicker}</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="section-title mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">{name}</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="prose-lede mt-5">{t.lede}</p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-semibold text-accent-contrast shadow-glow transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.liveSite}
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180" />
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-fg-subtle transition-[border-color,color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Github size={16} />
              {t.sourceCode}
            </a>
          </div>
        </Reveal>

        <Reveal variant="lg" delay={180}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-border">
            <div className="bg-surface px-6 py-4 sm:px-10">
              <p className="mono-label text-fg-muted">{t.architectureLabel}</p>
            </div>
            <div className="border-t border-border bg-surface-sunken p-4 sm:p-8">
              {arch}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{t.problemTitle}</h2>
            </Reveal>
            <Reveal delay={60}>
              <div className="mt-4 space-y-4 text-pretty leading-relaxed text-fg-muted">
                {t.problemText.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-fg">{t.solutionTitle}</h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-4 space-y-4 text-pretty leading-relaxed text-fg-muted">
                {t.solutionText.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={80}>
              <SpotlightCard className="card p-7">
                <p className="mono-label text-fg-muted">{t.stackLabel}</p>
                <ul className="mt-5 space-y-4">
                  {t.stack.map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <div>
                        <p className="text-sm font-medium text-fg">{item.name}</p>
                        <p className="text-xs text-fg-subtle">{item.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                  <div>
                    <p className="mono-label text-fg-muted">{t.designedForLabel}</p>
                    <ul className="mt-3 space-y-2">
                      {t.designedFor.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                          <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mono-label text-fg-muted">{t.notForLabel}</p>
                    <ul className="mt-3 space-y-2">
                      {t.notFor.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-fg-subtle">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight text-fg">{t.keyFeaturesLabel}</h2>
        </Reveal>
        <Reveal delay={60}>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {t.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight text-fg">{t.challengesLabel}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {t.challenges.map((challenge, i) => (
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
          <h2 className="mt-20 font-display text-2xl font-semibold tracking-tight text-fg">{t.resultsLabel}</h2>
        </Reveal>
        <Reveal delay={60}>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {t.results.map((result) => (
              <li key={result} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                {result}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-20">
            <p className="mono-label text-center text-fg-muted">FAQ</p>
            <div className="mt-6">
              <FaqList items={t.faq} />
            </div>
          </div>
        </Reveal>

        <Reveal variant="lg" delay={100}>
          <div className="mt-20 flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-10 text-center shadow-card sm:p-14">
            <p className="section-kicker">{t.navLabel}</p>
            <Link
              href={navHref}
              className="group inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-fg transition-colors duration-[var(--duration-base)] hover:text-accent"
            >
              {t.navName}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href={projectsHref}
            className="font-mono text-xs text-fg-subtle transition-colors duration-200 hover:text-accent"
          >
            <span className="inline-block rtl:scale-x-[-1]">←</span> {t.backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}