"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SidebarSection } from "@/content/sidebar";

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
    <nav aria-label="Documentation" className="space-y-5">
      <label className="block px-2">
        <span className="sr-only">Filter pages</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter pages"
          className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[13px] text-foreground outline-none placeholder:text-subtle"
        />
      </label>
      {visibleSections.length === 0 ? (
        <p className="px-2 text-[13px] text-muted">No matching pages.</p>
      ) : (
        visibleSections.map((section) => {
          const open = isOpen(section);
          const sectionId = `nav-${section.title.replace(/\s+/g, "-").toLowerCase()}`;

          return (
            <div key={section.title}>
              <button
                type="button"
                onClick={() => toggle(section.title)}
                className="flex w-full items-center justify-between gap-2 px-2 text-left text-[11px] leading-4 font-medium tracking-[0.12em] text-pretty text-subtle uppercase"
                aria-expanded={open}
                aria-controls={sectionId}
              >
                {section.title}
                <svg
                  viewBox="0 0 20 20"
                  className={cn(
                    "size-3.5 shrink-0 text-subtle transition-transform duration-200",
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
                <ul id={sectionId} className="mt-2 space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className={cn(
                            "relative block rounded-md px-2.5 py-1.5 text-[13.5px] leading-5 transition-colors",
                            active
                              ? "bg-gray-100 font-medium text-foreground"
                              : "text-muted hover:bg-gray-100 hover:text-foreground",
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          {active && (
                            <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent" />
                          )}
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })
      )}
    </nav>
  );
}
