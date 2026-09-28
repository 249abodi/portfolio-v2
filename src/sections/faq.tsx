import type { Messages } from "@/lib/messages/types";
import { Reveal } from "@/components/reveal";
import { FaqList } from "@/components/faq-list";

export function Faq({ t }: { t: Messages["faq"] }) {
  return (
    <section className="section relative" aria-label="FAQ">
      <div className="container-narrow">
        <div className="text-center">
          <Reveal>
            <p className="section-kicker">{t.kicker}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="section-title mt-4">{t.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="prose-lede mt-5 mx-auto">{t.intro}</p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="mt-12">
            <FaqList items={t.items} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}