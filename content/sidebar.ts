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
    title: "Documentation",
    items: [
      { title: "Product vision", href: "/" },
      { title: "Core capabilities", href: "/capabilities" },
      {
        title: "Important safety and legal design",
        href: "/safety-and-legal-design",
      },
    ],
  },
];

export const site = {
  name: "Ayatas",
  product: "AI-Assisted Divorce Mediation Platform",
  title: "Ayatas Divorce Mediation Docs",
  description:
    "A secure, structured, and human-supervised digital platform designed to help couples navigate divorce and separation in a more organized, transparent, and collaborative way.",
};
