import { getMessages, localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { company, contact, llms, process, profile, projects, services, skills, zelvoa } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

function list(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function projectBlock(project: (typeof projects)[number], locale: Locale): string {
  const lines: string[] = [
    `### ${project.name}`,
    project.tagline,
    "",
    project.description,
    "",
    "**What it does**",
    list(project.features),
    "",
    "**Technology**",
    list(project.stack),
  ];

  const links: string[] = [];
  if (project.href) links.push(`- Live site: ${project.href}`);
  if (project.repo) links.push(`- Source code: ${project.repo}`);
  if (project.caseStudy) links.push(`- Case study: ${localizedPath(project.caseStudy, locale)}`);
  if (links.length > 0) {
    lines.push("", "**Links**", list(links));
  }

  return lines.join("\n");
}

export function buildKnowledge(locale: Locale): string {
  const messages = getMessages(locale);
  const site = getSiteUrl().replace(/\/$/, "");

  const sections: string[] = [];

  sections.push(
    [
      "## Person",
      `Name: ${profile.name} (also written Abdalrhman Mohammed).`,
      `Roles: ${profile.roles.join(", ")}.`,
      `Primary role: ${profile.role}.`,
      `Tagline: ${profile.tagline}`,
      `Location: ${profile.location}.`,
      `University: ${profile.university} — ${profile.studyLine}.`,
      `Status: open to freelance work and new projects.`,
    ].join("\n")
  );

  sections.push(
    [
      "## Contact",
      "These are the only real contact details. Never invent others.",
      `- Email: ${contact.email}`,
      `- GitHub: ${contact.github}`,
      `- YouTube: ${contact.youtube}`,
      `- Instagram: ${contact.instagram}`,
      `- Facebook: ${contact.facebook}`,
      `- Portfolio: ${site}${locale === "ar" ? "/ar/" : "/"}`,
    ].join("\n")
  );

  sections.push(
    [
      "## Projects",
      projectBlock(projects[0], locale),
      "",
      projectBlock(projects[1], locale),
      "",
      projectBlock(projects[2], locale),
    ].join("\n")
  );

  sections.push(
    [
      "## Product details",
      `${company.name} — ${company.tagline}. Runs on ${company.operatingSystem}. Category: ${company.category}.`,
      `${zelvoa.name} — ${zelvoa.tagline}. Runs on ${zelvoa.operatingSystem}. Category: ${zelvoa.category}.`,
      "Do not quote prices, customer counts, revenue, or performance numbers — they are not documented.",
    ].join("\n")
  );

  sections.push(
    [
      "## Skills",
      ...skills.map((group) => `**${group.group}**\n${list(group.items)}`),
      "",
      `**Core expertise**\n${list(messages.cv.expertise)}`,
      "",
      `**Tools**\n${list(messages.cv.tools)}`,
    ].join("\n")
  );

  sections.push(
    ["## Services", ...services.map((s) => `**${s.title}** — ${s.description}`)].join("\n\n")
  );

  sections.push(
    ["## Process", ...process.map((step) => `**${step.step} ${step.title}** — ${step.description}`)].join("\n\n")
  );

  sections.push(
    [
      "## FAQ",
      ...messages.faq.items.map((item) => `**Q: ${item.q}**\nA: ${item.a}`),
    ].join("\n\n")
  );

  sections.push(
    [
      "## Case study sources",
      `- QAVENO: ${localizedPath("/projects/qaveno/", locale)}`,
      `- ZELVOA: ${localizedPath("/projects/zelvoa/", locale)}`,
      `- Machine-readable summary: ${site}/llms.txt`,
      `- Product list: ${llms.products.map((p) => `${p.name} (${p.url})`).join(", ")}`,
    ].join("\n")
  );

  sections.push(
    [
      "## What is NOT documented",
      "Do not state any of the following as fact: years of experience, number of clients, number of users, revenue, performance improvements, launch dates, employer history, certifications, awards, or technologies absent from the lists above.",
    ].join("\n")
  );

  return sections.join("\n\n---\n\n");
}
