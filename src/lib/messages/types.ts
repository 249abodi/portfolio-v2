export type NavItem = { label: string; href: string };

export type FaqItem = { q: string; a: string };

export type PaletteCommand = {
  id: string;
  label: string;
  description: string;
  href: string;
  category: "section" | "project" | "link";
};

export type CaseStudyContent = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  breadcrumbLabel: string;
  breadcrumbProjects: string;
  kicker: string;
  lede: string;
  liveSite: string;
  sourceCode: string;
  architectureLabel: string;
  problemTitle: string;
  problemText: string[];
  solutionTitle: string;
  solutionText: string[];
  designedForLabel: string;
  designedFor: string[];
  notForLabel: string;
  notFor: string[];
  stackLabel: string;
  stack: { name: string; role: string }[];
  keyFeaturesLabel: string;
  features: string[];
  challengesLabel: string;
  challenges: { title: string; description: string }[];
  resultsLabel: string;
  results: string[];
  navLabel: string;
  navName: string;
  navHref: string;
  backLabel: string;
  faq: FaqItem[];
};

export type Messages = {
  meta: {
    titleDefault: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
    siteName: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  person: {
    name: string;
    jobTitle: string;
    knowsAbout: string[];
  };
  skipToContent: string;
  header: {
    backToTop: string;
    openPalette: string;
    toggleMenu: string;
    switchToLight: string;
    switchToDark: string;
    primary: string;
    mobile: string;
    switchLanguage: string;
    languageNames: { en: string; ar: string };
  };
  nav: NavItem[];
  footer: {
    name: string;
    tagline: string;
    sections: string;
    connect: string;
    location: string;
    copyright: string;
    subline: string;
    socialLabels: { github: string; youtube: string; instagram: string; facebook: string };
  };
  hero: {
    kicker: string;
    roles: string[];
    tagline: string;
    available: string;
    viewProjects: string;
    getInTouch: string;
    scroll: string;
    scrollToAbout: string;
    portraitAlt: string;
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    whatIPlayWith: string;
    lines: string[];
    openToWork: string;
    letsTalk: string;
  };
  skills: {
    kicker: string;
    title: string;
    description: string;
    groupNames: Record<string, string>;
  };
  projects: {
    kicker: string;
    title: string;
    description: string;
    statuses: string[];
    viewProject: string;
    source: string;
    caseStudy: string;
    items: { tagline: string; description: string; features: string[] }[];
  };
  stats: {
    kicker: string;
    title: string;
    lede: string;
    technicalHighlights: string;
    items: { value: string; label: string; detail: string }[];
    highlights: string[];
  };
  github: {
    kicker: string;
    title: string;
    viewProfile: string;
    live: string;
    code: string;
    repos: { name: string; description: string; tag: string }[];
  };
  services: {
    kicker: string;
    title: string;
    lede: string;
    discuss: string;
    items: { title: string; description: string }[];
  };
  process: {
    kicker: string;
    title: string;
    steps: { step: string; title: string; description: string }[];
  };
  cv: {
    kicker: string;
    title: string;
    requestFullCv: string;
    education: string;
    coreExpertise: string;
    technologies: string;
    degree: string;
    locationFocus: string;
    expertise: string[];
    tools: string[];
  };
  contact: {
    kicker: string;
    title: string;
    lede: string;
    available: string;
    orElsewhere: string;
    form: {
      successTitle: string;
      successBody: string;
      sendAnother: string;
      errorTitle: string;
      errorBody: string;
      tryAgain: string;
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      honeypot: string;
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      send: string;
      sending: string;
    };
  };
  faq: {
    kicker: string;
    title: string;
    intro: string;
    items: FaqItem[];
  };
  palette: {
    aria: string;
    closeAria: string;
    placeholder: string;
    noResults: string;
    categories: { section: string; project: string; link: string };
    hints: [string, string, string];
    commands: PaletteCommand[];
  };
  chat: {
    launcherAria: string;
    openAria: string;
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    sendAria: string;
    stopAria: string;
    resetAria: string;
    closeAria: string;
    thinking: string;
    errorTitle: string;
    errorRetry: string;
    unconfigured: string;
    contactAria: string;
    suggestionsTitle: string;
    suggestions: string[];
    disclaimer: string;
  };
  caseStudies: {
    qaveno: CaseStudyContent;
    zelvoa: CaseStudyContent;
  };
};