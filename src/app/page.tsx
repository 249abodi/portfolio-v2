import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Projects } from "@/sections/projects";
import { Stats } from "@/sections/stats";
import { GitHubSection } from "@/sections/github";
import { Services } from "@/sections/services";
import { Process } from "@/sections/process";
import { CV } from "@/sections/cv";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <GitHubSection />
      <Services />
      <Process />
      <CV />
      <Contact />
    </>
  );
}