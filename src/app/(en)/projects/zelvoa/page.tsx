import { CaseStudy } from "@/components/case-study";
import { ZelvoaArchDiagram } from "@/sections/arch-diagrams";
import { getMessages } from "@/lib/i18n";
import { buildPageMetadata, faqJsonLd, renderJsonLd, softwareJsonLd } from "@/lib/seo";
import { profile, zelvoa } from "@/lib/site";

export const metadata = buildPageMetadata({
  locale: "en",
  basePath: "/projects/zelvoa/",
  title: "ZELVOA — Case Study",
  description:
    "ZELVOA is a multi-tenant SaaS platform for social media management — scheduling content, running campaigns, and tracking analytics with role-based access.",
  keywords: [
    "ZELVOA",
    "social media management",
    "social media scheduling",
    "SaaS platform",
    "multi-tenant",
    "Abdulrahman Mohammed",
  ],
  ogTitle: "ZELVOA — Case Study — Abdulrahman Mohammed",
  ogDescription:
    "A multi-tenant SaaS platform for social media management with scheduling, campaigns, and analytics.",
  ogImage: "/og.png",
  ogImageAlt: "ZELVOA — Case Study — Abdulrahman Mohammed",
  siteName: `${profile.name} — Portfolio`,
});

export default function ZelvoaCaseStudy() {
  const messages = getMessages("en");
  const t = messages.caseStudies.zelvoa;

  return (
    <>
      <CaseStudy
        locale="en"
        t={t}
        name={zelvoa.name}
        productUrl={zelvoa.href}
        repoUrl={zelvoa.repo}
        arch={<ZelvoaArchDiagram />}
      />
      {renderJsonLd(
        softwareJsonLd({
          id: zelvoa.href,
          name: zelvoa.name,
          description: zelvoa.description,
          url: zelvoa.href,
          applicationCategory: zelvoa.category,
          operatingSystem: zelvoa.operatingSystem,
          offers: {
            priceCurrency: zelvoa.pricing.currency,
            lowPrice: zelvoa.pricing.low,
            highPrice: zelvoa.pricing.high,
            offerCount: zelvoa.pricing.count,
          },
        })
      )}
      {renderJsonLd(faqJsonLd(t.faq))}
    </>
  );
}