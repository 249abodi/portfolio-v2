import { buildPageMetadata } from "@/lib/seo";
import { getMessages } from "@/lib/i18n";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Projects } from "@/sections/projects";
import { Stats } from "@/sections/stats";
import { GitHubSection } from "@/sections/github";
import { Services } from "@/sections/services";
import { Process } from "@/sections/process";
import { CV } from "@/sections/cv";
import { Faq } from "@/sections/faq";
import { Contact } from "@/sections/contact";

export const metadata = buildPageMetadata({
  locale: "ar",
  basePath: "/",
  title: "عبدالرحمن محمد — مطوّر ويب متكامل ومطوّر تطبيقات SaaS",
  description:
    "طالب هندسة برمجيات ومطوّر ويب متكامل. أصمّم وأبني منتجات متكاملة — من أنظمة نقاط البيع إلى منصات SaaS متعددة المستأجرين.",
  keywords: [
    "عبدالرحمن محمد",
    "مطوّر ويب متكامل",
    "مطوّر ويب",
    "مطوّر تطبيقات SaaS",
    "مطوّر React",
    "مطوّر Next.js",
    "طالب هندسة برمجيات",
  ],
  ogImage: "/og.png",
  ogImageAlt: "عبدالرحمن محمد — طالب هندسة برمجيات / مطوّر ويب متكامل / مطوّر تطبيقات SaaS",
  siteName: "عبدالرحمن محمد — المعرض",
});

export default function ArabicHome() {
  const messages = getMessages("ar");

  return (
    <>
      <Hero t={messages.hero} name={messages.person.name} />
      <About t={messages.about} />
      <Skills t={messages.skills} />
      <Projects t={messages.projects} locale="ar" />
      <Stats t={messages.stats} />
      <GitHubSection t={messages.github} />
      <Services t={messages.services} />
      <Process t={messages.process} />
      <CV t={messages.cv} />
      <Faq t={messages.faq} />
      <Contact t={messages.contact} />
    </>
  );
}