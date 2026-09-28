import { CaseStudy } from "@/components/case-study";
import { ZelvoaArchDiagram } from "@/sections/arch-diagrams";
import { getMessages } from "@/lib/i18n";
import { buildPageMetadata, faqJsonLd, renderJsonLd, softwareJsonLd } from "@/lib/seo";
import { zelvoa } from "@/lib/site";

export const metadata = buildPageMetadata({
  locale: "ar",
  basePath: "/projects/zelvoa/",
  title: "ZELVOA — دراسة حالة",
  description:
    "ZELVOA منصة SaaS متعددة المستأجرين لإدارة وسائل التواصل — جدولة المحتوى وتشغيل الحملات ومتابعة التحليلات مع صلاحيات حسب الأدوار.",
  keywords: [
    "ZELVOA",
    "إدارة وسائل التواصل",
    "جدولة منشورات التواصل",
    "منصة SaaS",
    "متعدد المستأجرين",
    "عبدالرحمن محمد",
  ],
  ogTitle: "ZELVOA — دراسة حالة — عبدالرحمن محمد",
  ogDescription: "منصة SaaS متعددة المستأجرين لإدارة وسائل التواصل مع الجدولة والحملات والتحليلات.",
  ogImage: "/og.png",
  ogImageAlt: "ZELVOA — دراسة حالة — عبدالرحمن محمد",
  siteName: "عبدالرحمن محمد — المعرض",
});

export default function ArabicZelvoaCaseStudy() {
  const messages = getMessages("ar");
  const t = messages.caseStudies.zelvoa;

  return (
    <>
      <CaseStudy
        locale="ar"
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