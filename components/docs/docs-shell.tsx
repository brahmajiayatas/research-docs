"use client";

import { useState, type ReactNode } from "react";
import { Brand } from "@/components/docs/brand";
import { MobileNav } from "@/components/docs/mobile-nav";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import type { SidebarSection } from "@/content/sidebar";
import { cn } from "@/lib/cn";

const FRAME = "mx-auto w-full max-w-[88rem] px-5 lg:px-8";

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
    FRAME,
    "grid grid-cols-1",
    sidebarOpen
      ? "lg:grid-cols-[18.5rem_minmax(0,1fr)] xl:grid-cols-[18.5rem_minmax(0,1fr)_14rem]"
      : "xl:grid-cols-[minmax(0,1fr)_14rem]",
  );

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-background/90 backdrop-blur-md">
        <div className={cn(FRAME, "flex h-16 items-center gap-3")}>
          <MobileNav sections={sections} />
          <button
            type="button"
            className="hidden size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-gray-100 hover:text-foreground lg:inline-flex"
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
        </div>
      </header>

      <div className={cn(columns, "lg:gap-x-8")}>
        <aside
          className={cn(
            "docs-scroll sticky top-16 hidden h-[calc(100vh-4rem)] min-w-0 self-start overflow-x-hidden overflow-y-auto overscroll-contain border-r border-gray-200 bg-gray-50 p-3",
            sidebarOpen && "lg:block",
          )}
        >
          {sidebarOpen ? <SidebarNav sections={sections} /> : null}
        </aside>

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

      {pager ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-background/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md">
          <div className={cn(columns, "py-2")}>
            {sidebarOpen ? <div className="hidden lg:block" aria-hidden="true" /> : null}
            <div className="min-w-0">{pager}</div>
            <div className="hidden xl:block" aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
