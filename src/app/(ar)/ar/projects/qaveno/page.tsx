import { CaseStudy } from "@/components/case-study";
import { QavenoArchDiagram } from "@/sections/arch-diagrams";
import { getMessages } from "@/lib/i18n";
import { buildPageMetadata, faqJsonLd, renderJsonLd, softwareJsonLd } from "@/lib/seo";
import { company } from "@/lib/site";

export const metadata = buildPageMetadata({
  locale: "ar",
  basePath: "/projects/qaveno/",
  title: "QAVENO — دراسة حالة",
  description:
    "QAVENO منصة لإدارة الأعمال ونقاط البيع مبنية بـ Electron و Node.js و SQLite — تتولى المبيعات والمخزون والمشتريات والفروع وصلاحيات المستخدمين.",
  keywords: [
    "QAVENO",
    "نظام نقاط بيع",
    "برنامج نقاط البيع",
    "إدارة المخزون",
    "منصة إدارة أعمال",
    "عبدالرحمن محمد",
  ],
  ogTitle: "QAVENO — دراسة حالة — عبدالرحمن محمد",
  ogDescription: "منصة إدارة أعمال ونقاط بيع تعمل كتطبيق سطح مكتب ومنتج SaaS.",
  ogImage: "/og.png",
  ogImageAlt: "QAVENO — دراسة حالة — عبدالرحمن محمد",
  siteName: "عبدالرحمن محمد — المعرض",
});

export default function ArabicQavenoCaseStudy() {
  const messages = getMessages("ar");
  const t = messages.caseStudies.qaveno;

  return (
    <>
      <CaseStudy
        locale="ar"
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