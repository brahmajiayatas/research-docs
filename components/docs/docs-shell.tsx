"use client";

import { useState, type ReactNode } from "react";
import { Brand } from "@/components/docs/brand";
import { MobileNav } from "@/components/docs/mobile-nav";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import type { SidebarSection } from "@/content/sidebar";
import { cn } from "@/lib/cn";

// The sidebar is flush with the viewport's left edge, so only the reading area
// is centered, inside the space left of it.
const EDGE = "w-full px-5 lg:px-8";
const READING_FRAME = "mx-auto w-full max-w-[80rem] px-5 lg:px-8";
const READING_GRID = "grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-x-8";

export function DocsShell({
  sections,
  children,
  toc,
  pager,
}: {
  sections: SidebarSection[];
  children: ReactNode;
  toc?: ReactNode;
  pager?: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const columns = cn(
    "grid grid-cols-1",
    sidebarOpen && "lg:grid-cols-[18.5rem_minmax(0,1fr)]",
  );

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className={cn(EDGE, "flex h-16 items-center gap-3")}>
          <MobileNav sections={sections} />
          <button
            type="button"
            className="hidden size-8 items-center justify-center rounded-md text-subtle transition-colors hover:bg-hover hover:text-foreground lg:inline-flex"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={sidebarOpen}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="4" y="5" width="16" height="14" rx="2" />
              <path d="M9 5v14" />
            </svg>
          </button>
          <Brand />
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className={columns}>
        <aside
          className={cn(
            "docs-scroll sticky top-16 hidden h-[calc(100vh-4rem)] min-w-0 self-start overflow-x-hidden overflow-y-auto overscroll-contain border-r border-border bg-sidebar px-4 py-5 lg:px-5",
            sidebarOpen && "lg:block",
          )}
        >
          {sidebarOpen ? <SidebarNav sections={sections} /> : null}
        </aside>

        <div className={cn(READING_FRAME, READING_GRID)}>
          <main
            id="content"
            tabIndex={-1}
            className="min-w-0 pt-10 pb-24 outline-none lg:pt-12"
          >
            {children}
          </main>

          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] min-w-0 self-start overflow-x-hidden overflow-y-auto overscroll-contain pt-12 xl:block">
            {toc}
          </aside>
        </div>
      </div>

      {pager ? (
        <div
          className={cn(
            "pointer-events-none fixed inset-x-0 bottom-0 z-30",
            sidebarOpen && "lg:left-[18.5rem]",
          )}
        >
          <div className={cn(READING_FRAME, READING_GRID)}>
            <div className="pointer-events-auto min-w-0 border-t border-border bg-background/95 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-md">
              {pager}
            </div>
            <div className="hidden xl:block" aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
