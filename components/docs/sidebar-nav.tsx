"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SidebarItem, SidebarSection } from "@/content/sidebar";

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

function isActivePath(pathname: string, href: string) {
  return normalizePath(pathname) === normalizePath(href);
}

function findParent(items: SidebarItem[], item: SidebarItem) {
  const href = normalizePath(item.href);
  let match: SidebarItem | undefined;

  for (const candidate of items) {
    const parentHref = normalizePath(candidate.href);
    if (parentHref === "/" || parentHref === href) continue;
    const depth = parentHref.split("/").filter(Boolean).length;
    if (depth < 2) continue;
    if (
      href.startsWith(`${parentHref}/`) &&
      (!match || parentHref.length > normalizePath(match.href).length)
    ) {
      match = candidate;
    }
  }

  return match;
}

function nestItems(items: SidebarItem[]) {
  const claimed = new Set(
    items
      .filter((item) => findParent(items, item))
      .map((item) => item.href),
  );

  return items
    .filter((item) => !claimed.has(item.href))
    .map((item) => ({
      item,
      children: items.filter((child) => findParent(items, child)?.href === item.href),
    }));
}

export function SidebarNav({
  sections,
  onNavigate,
}: {
  sections: SidebarSection[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const normalized = query.trim().toLowerCase();

  const visibleSections = useMemo(() => {
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            !normalized ||
            item.title.toLowerCase().includes(normalized) ||
            section.title.toLowerCase().includes(normalized),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [normalized, sections]);

  function isOpen(section: SidebarSection) {
    if (normalized) return true;
    return toggled[section.title] ?? true;
  }

  function toggle(title: string) {
    setToggled((current) => ({
      ...current,
      [title]: !(current[title] ?? true),
    }));
  }

  return (
    <nav aria-label="Documentation" className="flex min-w-0 flex-col gap-5">
      <label className="relative block">
        <span className="sr-only">Filter pages</span>
        <svg
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-subtle"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="4.25" />
          <path d="m10.2 10.2 3 3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter pages"
          className="h-9 w-full rounded-lg border border-border bg-background pr-2.5 pl-8 text-[13px] text-foreground shadow-sm transition-colors outline-none placeholder:text-subtle hover:border-border-strong focus:border-accent/45"
        />
      </label>
      {visibleSections.length === 0 ? (
        <p className="px-1 text-[13px] text-muted">No matching pages.</p>
      ) : (
        visibleSections.map((section) => {
          const open = isOpen(section);
          const sectionId = `nav-${section.title.replace(/\s+/g, "-").toLowerCase()}`;
          const grouped = nestItems(section.items);

          return (
            <div key={section.title} className="min-w-0">
              <button
                type="button"
                onClick={() => toggle(section.title)}
                className="group flex h-8 w-full min-w-0 items-center gap-2 rounded-md text-left"
                aria-expanded={open}
                aria-controls={sectionId}
                title={section.title}
              >
                <span className="min-w-0 flex-1 truncate text-[11px] font-semibold tracking-[0.1em] text-subtle uppercase transition-colors group-hover:text-foreground">
                  {section.title}
                </span>
                <svg
                  viewBox="0 0 20 20"
                  className={cn(
                    "size-3.5 shrink-0 text-subtle transition-transform duration-200 group-hover:text-muted",
                    open ? "rotate-90" : "",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M7 5l6 5-6 5" />
                </svg>
              </button>
              {open && (
                <ul
                  id={sectionId}
                  className="mt-1 ml-1 flex min-w-0 flex-col gap-0.5 pl-3"
                >
                  {grouped.map(({ item, children }) => (
                    <li key={item.href} className="min-w-0">
                      <NavLink
                        item={item}
                        active={isActivePath(pathname, item.href)}
                        onNavigate={onNavigate}
                      />
                      {children.length > 0 && (
                        <ul className="mt-0.5 ml-3 flex min-w-0 flex-col gap-0.5">
                          {children.map((child) => (
                            <li key={child.href} className="min-w-0">
                              <NavLink
                                item={child}
                                active={isActivePath(pathname, child.href)}
                                nested
                                onNavigate={onNavigate}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </nav>
  );
}

function NavLink({
  item,
  active,
  nested = false,
  onNavigate,
}: {
  item: SidebarItem;
  active: boolean;
  nested?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      title={item.title}
      onClick={onNavigate}
      className={cn(
        "flex min-h-9 min-w-0 items-center rounded-r-md border-l-2 py-1.5 pr-2.5 text-[13.5px] leading-5 transition-colors",
        nested ? "pl-3.5" : "pl-2.5",
        active
          ? "border-accent bg-hover font-medium text-foreground"
          : "border-transparent text-muted hover:bg-hover hover:text-foreground",
      )}
      aria-current={active ? "page" : undefined}
    >
      <span className="min-w-0 truncate">{item.title}</span>
    </Link>
  );
}
