export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export const sidebar: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Positioning", href: "/overview/positioning" },
      { title: "Product principles", href: "/overview/principles" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { title: "System overview", href: "/architecture" },
      { title: "Technology stack", href: "/architecture/stack" },
      { title: "Frontend", href: "/architecture/frontend" },
      { title: "Backend", href: "/architecture/backend" },
      { title: "Data model", href: "/architecture/data" },
      { title: "Infrastructure", href: "/architecture/infrastructure" },
      { title: "SaaS model", href: "/architecture/saas" },
    ],
  },
  {
    title: "AI platform",
    items: [
      { title: "Closed AI", href: "/ai/closed-ai" },
      { title: "Conversation design", href: "/ai/conversation" },
      { title: "Model stack", href: "/ai/models" },
      { title: "RAG and legal knowledge", href: "/ai/knowledge" },
      { title: "AI governance", href: "/ai/governance" },
    ],
  },
  {
    title: "Core engines",
    items: [
      { title: "Decision tree engine", href: "/engines/decision-trees" },
      { title: "Decision tree catalog", href: "/engines/decision-trees/catalog" },
      { title: "Mediation engine", href: "/engines/mediation" },
      { title: "Evidence and documents", href: "/engines/evidence" },
      { title: "Negotiation workspace", href: "/engines/negotiation" },
      { title: "Agreement generation", href: "/engines/agreements" },
    ],
  },
  {
    title: "Safety, security, and privacy",
    items: [
      { title: "Safety and escalation", href: "/safety/escalation" },
      { title: "Human-in-the-loop", href: "/safety/human-review" },
      { title: "Security", href: "/safety/security" },
      { title: "Privacy", href: "/safety/privacy" },
      { title: "AI security", href: "/safety/ai-security" },
    ],
  },
  {
    title: "Experience",
    items: [
      { title: "User journey", href: "/experience/user-journey" },
    ],
  },
  {
    title: "Roadmap",
    items: [
      { title: "MVP", href: "/roadmap/mvp" },
      { title: "Later phases", href: "/roadmap/phases" },
      { title: "Delivery plan", href: "/roadmap/plan" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Legal disclaimer", href: "/legal" },
      { title: "Sources", href: "/sources" },
    ],
  },
];

export const site = {
  name: "Ayatas",
  product: "Divorce Mediation Platform",
  title: "Ayatas Divorce Mediation Docs",
  description:
    "Product and technical documentation for an AI-assisted divorce mediation platform.",
};
