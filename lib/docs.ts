import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { ReactElement } from "react";
import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { sidebar, type SidebarItem, type SidebarSection } from "@/content/sidebar";
import { mdxComponents } from "@/components/mdx/mdx-components";

const CONTENT_DIR = path.join(process.cwd(), "content", "docs");

export type DocFrontmatter = {
  title: string;
  description?: string;
};

export type TocItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export type DocPage = {
  href: string;
  slug: string[];
  title: string;
  description?: string;
  section: string;
  content: ReactElement;
  toc: TocItem[];
};

export function flattenSidebar(): Array<SidebarItem & { section: string }> {
  return sidebar.flatMap((section) =>
    section.items.map((item) => ({ ...item, section: section.title })),
  );
}

export function hrefToSlug(href: string): string[] {
  if (href === "/") return [];
  return href.replace(/^\//, "").split("/");
}

export function hrefToFile(href: string): string {
  if (href === "/") return path.join(CONTENT_DIR, "index.mdx");
  const slugPath = href.replace(/^\//, "");
  const file = path.join(CONTENT_DIR, `${slugPath}.mdx`);
  if (fs.existsSync(file)) return file;
  const indexFile = path.join(CONTENT_DIR, slugPath, "index.mdx");
  if (fs.existsSync(indexFile)) return indexFile;
  throw new Error(`Missing documentation file for ${href}`);
}

export function isKnownHref(href: string): boolean {
  return flattenSidebar().some((item) => item.href === href);
}

export function getSidebar(): SidebarSection[] {
  return sidebar;
}

function headingText(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim();
}

export function extractToc(source: string): TocItem[] {
  const body = source.replace(/^---[\s\S]*?---\s*/, "");
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const headingPattern = /^(#{2,3})\s+(.+?)\s*$/gm;

  for (const match of body.matchAll(headingPattern)) {
    const depth = match[1].length as 2 | 3;
    const title = headingText(match[2]);
    items.push({
      id: slugger.slug(title),
      title,
      depth,
    });
  }

  return items;
}

export const getDoc = cache(async function getDoc(href: string): Promise<DocPage> {
  const file = hrefToFile(href);
  const source = fs.readFileSync(file, "utf8");
  const { content, frontmatter } = await compileMDX<DocFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const entry = flattenSidebar().find((item) => item.href === href);

  return {
    href,
    slug: hrefToSlug(href),
    title: frontmatter.title,
    description: frontmatter.description,
    section: entry?.section ?? "Documentation",
    content,
    toc: extractToc(source),
  };
});

export function getPager(href: string) {
  const items = flattenSidebar();
  const index = items.findIndex((item) => item.href === href);
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null,
  };
}

export function getBreadcrumbs(href: string) {
  const items = flattenSidebar();
  const current = items.find((item) => item.href === href);
  if (!current) return [];

  const crumbs: Array<{ title: string; href: string }> = [];
  if (href !== "/") {
    crumbs.push({ title: "Docs", href: "/" });
  }

  const section = sidebar.find((entry) => entry.title === current.section);
  const sectionHome = section?.items[0]?.href;
  if (href !== "/" && section && sectionHome && sectionHome !== href) {
    crumbs.push({ title: section.title, href: sectionHome });
  }

  crumbs.push({ title: current.title, href });
  return crumbs;
}

export function findHref(slug?: string[]) {
  const href = !slug || slug.length === 0 ? "/" : `/${slug.join("/")}`;
  return isKnownHref(href) ? href : null;
}
