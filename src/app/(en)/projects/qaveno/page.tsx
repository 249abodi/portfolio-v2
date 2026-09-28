import { CaseStudy } from "@/components/case-study";
import { QavenoArchDiagram } from "@/sections/arch-diagrams";
import { getMessages } from "@/lib/i18n";
import { buildPageMetadata, faqJsonLd, renderJsonLd, softwareJsonLd } from "@/lib/seo";
import { company, profile } from "@/lib/site";

export const metadata = buildPageMetadata({
  locale: "en",
  basePath: "/projects/qaveno/",
  title: "QAVENO — Case Study",
  description:
    "QAVENO is a business management and point-of-sale platform built with Electron, Node.js, and SQLite — handling sales, inventory, purchasing, branches, and user roles.",
  keywords: [
    "QAVENO",
    "point of sale system",
    "POS software",
    "inventory management",
    "business management platform",
    "Abdulrahman Mohammed",
  ],
  ogTitle: "QAVENO — Case Study — Abdulrahman Mohammed",
  ogDescription:
    "A business management and POS platform that runs as a desktop app and a SaaS product.",
  ogImage: "/og.png",
  ogImageAlt: "QAVENO — Case Study — Abdulrahman Mohammed",
  siteName: `${profile.name} — Portfolio`,
});

export default function QavenoCaseStudy() {
  const messages = getMessages("en");
  const t = messages.caseStudies.qaveno;

  return (
    <>
      <CaseStudy
        locale="en"
        t={t}
        name={company.name}
        productUrl={company.href}
        repoUrl={company.repo}
        arch={<QavenoArchDiagram />}
      />
      {renderJsonLd(
        softwareJsonLd({
          id: company.href,
          name: company.name,
          description: company.description,
          url: company.href,
          applicationCategory: company.category,
          operatingSystem: company.operatingSystem,
          offers: {
            priceCurrency: company.pricing.currency,
            lowPrice: company.pricing.low,
            highPrice: company.pricing.high,
            offerCount: company.pricing.count,
          },
        })
      )}
      {renderJsonLd(faqJsonLd(t.faq))}
    </>
  );
}