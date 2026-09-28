import { services } from "@/lib/site";
import type { Messages } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import {
  ArrowRight,
  Cloud,
  Code,
  Frame,
  Globe,
  Layout,
  Plug,
} from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  globe: Globe,
  code: Code,
  cloud: Cloud,
  layout: Layout,
  plug: Plug,
  frame: Frame,
};

export function Services({ t }: { t: Messages["services"] }) {
  return (
    <section id="services" className="section relative" aria-label="Services">
      <div className="grid-backdrop" aria-hidden />

      <div className="container-site relative">
        <div className="max-w-2xl">
          <Reveal>
            <p className="section-kicker">{t.kicker}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="section-title mt-4">{t.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="prose-lede mt-5">{t.lede}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code;
            const item = t.items[i] ?? service;
            return (
              <Reveal key={service.title} delay={i * 60}>
                <SpotlightCard className="card group flex h-full flex-col p-7 transition-[border-color,transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover">
                  <span className="icon-nudge flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-sunken text-accent transition-colors duration-[var(--duration-base)] group-hover:-translate-y-1 group-hover:border-accent">
                    <Icon width={20} height={20} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-subtle">
                    {item.description}
                  </p>
                  <a
                    href="#contact"
                    className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {t.discuss}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180" />
                  </a>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}