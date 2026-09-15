export const profile = {
  name: "Abdulrahman Mohammed",
  firstName: "Abdulrahman",
  monogram: "AM",
  role: "Full-Stack Web Developer",
  roles: ["Software Engineering Student", "Full-Stack Web Developer", "SaaS Developer"],
  tagline: "I design and build full-stack software products — from POS systems to multi-tenant SaaS platforms.",
  location: "Malaysia",
  university: "Universiti Teknologi Malaysia",
  studyLine: "Software Engineering",
};

export const contact = {
  email: "bm605079@gmail.com",
  github: "https://github.com/249abodi",
  youtube: "https://www.youtube.com/@3kbbb",
  instagram: "https://www.instagram.com/249_abodii",
  facebook: "https://www.facebook.com/profile.php?id=61576883101977",
};

export const company = {
  name: "QAVENO",
  tagline: "Business management & POS platform",
  href: "https://qaveno.vercel.app/",
  repo: "https://github.com/249abodi/QAVENO",
  stack: ["Electron", "Node.js", "SQLite", "JavaScript"],
  description: "A business management and point-of-sale system that runs as a desktop app and a SaaS platform — handling sales, inventory, purchasing, branches, and user roles across the full business workflow.",
  features: ["POS terminal", "Inventory & stock control", "Sales & purchasing", "Multi-branch operations", "Users, roles & permissions", "Desktop + SaaS"],
};

export const zelvoa = {
  name: "ZELVOA",
  tagline: "Social media management SaaS",
  href: "https://zelvoa.vercel.app/",
  repo: "https://github.com/249abodi",
  stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma"],
  description: "A multi-tenant SaaS platform for social media management — scheduling content, running campaigns, and tracking analytics with role-based access for teams and organizations.",
  features: ["Content scheduling", "Campaign management", "Analytics dashboard", "Unified inbox", "Organizations & workspaces", "Roles & permissions"],
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    name: "QAVENO",
    tagline: company.tagline,
    href: company.href,
    repo: company.repo,
    caseStudy: "/projects/qaveno/",
    stack: company.stack,
    description: company.description,
    features: company.features,
  },
  {
    name: "ZELVOA",
    tagline: zelvoa.tagline,
    href: zelvoa.href,
    repo: zelvoa.repo,
    caseStudy: "/projects/zelvoa/",
    stack: zelvoa.stack,
    description: zelvoa.description,
    features: zelvoa.features,
  },
  {
    name: "Portfolio",
    tagline: "This site — designed and built from scratch",
    href: null,
    repo: null,
    caseStudy: null,
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    description:
      "A dark-first, minimal developer portfolio. Static export, zero runtime dependencies, accessible and responsive down to 320px.",
    features: ["Static export", "Dark-first design system", "Fully responsive", "Keyboard accessible"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "REST APIs", "Authentication", "Role-based access"],
  },
  {
    group: "Database",
    items: ["PostgreSQL", "Prisma", "SQLite"],
  },
  {
    group: "Desktop",
    items: ["Electron"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Docker", "UI design"],
  },
];

export const services = [
  {
    title: "Website Development",
    description: "Fast, responsive, accessible websites built for real business goals.",
    icon: "globe",
  },
  {
    title: "React & Next.js Development",
    description: "Modern web apps with component architecture, clean state and strong DX.",
    icon: "code",
  },
  {
    title: "SaaS Development",
    description: "Multi-tenant platforms with auth, subscriptions, dashboards and roles.",
    icon: "cloud",
  },
  {
    title: "Dashboard & Tool Development",
    description: "Admin panels, analytics views and internal tools that teams actually use.",
    icon: "layout",
  },
  {
    title: "API Integration",
    description: "REST integrations that connect your product to the services it needs.",
    icon: "plug",
  },
  {
    title: "Responsive Frontend Development",
    description: "Intentional layouts that feel native on every screen — mobile to desktop.",
    icon: "frame",
  },
];

export const process = [
  {
    step: "01",
    title: "Understand",
    description: "I listen to the goal, the users and the constraints before a line of code.",
  },
  {
    step: "02",
    title: "Plan",
    description: "Clear scope, architecture and milestones so nothing ships by surprise.",
  },
  {
    step: "03",
    title: "Build",
    description: "Clean, maintainable code — shipped in working increments, not a big bang.",
  },
  {
    step: "04",
    title: "Test",
    description: "I verify flows, edge cases and responsive behavior before handover.",
  },
  {
    step: "05",
    title: "Deliver",
    description: "A production-ready product, deployed and documented for the long term.",
  },
];