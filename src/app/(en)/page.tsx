import { buildPageMetadata } from "@/lib/seo";
import { getMessages } from "@/lib/i18n";
import { profile } from "@/lib/site";
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
  locale: "en",
  basePath: "/",
  title: `${profile.name} — Full-Stack Web Developer & SaaS Developer`,
  description:
    "Software engineering student and full-stack developer. I design and build full-stack products — from POS systems to multi-tenant SaaS platforms.",
  keywords: [
    "Abdulrahman Mohammed",
    "full-stack developer",
    "web developer",
    "SaaS developer",
    "React developer",
    "Next.js developer",
    "software engineering student",
  ],
  ogImage: "/og.png",
  ogImageAlt: `${profile.name} — Software Engineering Student / Full-Stack Web Developer / SaaS Developer`,
  siteName: `${profile.name} — Portfolio`,
});

export default function Home() {
  const messages = getMessages("en");

  return (
    <>
      <Hero t={messages.hero} name={profile.name} />
      <About t={messages.about} />
      <Skills t={messages.skills} />
      <Projects t={messages.projects} locale="en" />
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