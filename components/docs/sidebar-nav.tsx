"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  function sectionContainsPath(section: SidebarSection) {
    return section.items.some(
      (item) =>
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(`${item.href}/`)),
    );
  }

  function isOpen(section: SidebarSection) {
    if (section.title in toggled) return toggled[section.title];
    return sectionContainsPath(section);
  }

  function toggle(title: string) {
    const section = sections.find((item) => item.title === title);
    setToggled((current) => ({
      ...current,
      [title]: !(title in current ? current[title] : section ? sectionContainsPath(section) : true),
    }));
  }

  return (
    <nav aria-label="Documentation" className="space-y-7">
      {sections.map((section) => {
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
                            ? "bg-accent-soft font-medium text-foreground"
                            : "text-muted hover:bg-hover hover:text-foreground",
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
      })}
    </nav>
  );
}
