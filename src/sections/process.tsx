import { process } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Process() {
  return (
    <section className="section relative" aria-label="Process">
      <div className="container-narrow">
        <div className="text-center">
          <Reveal>
            <p className="section-kicker">Process</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="section-title mt-4">A clear path from idea to shipped.</h2>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {process.map((step, i) => (
            <Reveal key={step.step} delay={i * 60} as="li">
              <div className="relative h-full pt-2">
                <span className="font-display text-4xl font-semibold tracking-tight text-accent/30" aria-hidden>
                  {step.step}
                </span>
                <span className="mt-2 block h-px w-10 bg-accent" aria-hidden />
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{step.description}</p>
                {i < process.length - 1 ? (
                  <span className="absolute -right-3 top-6 hidden text-fg-faint lg:block" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}