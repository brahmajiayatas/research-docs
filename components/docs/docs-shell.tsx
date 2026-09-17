"use client";

import { useState, type ReactNode } from "react";
import { Brand } from "@/components/docs/brand";
import { MobileNav } from "@/components/docs/mobile-nav";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import type { SidebarSection } from "@/content/sidebar";
import { cn } from "@/lib/cn";

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

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-background/90 backdrop-blur-md">
        <div className="flex h-16 items-center gap-3 px-4 lg:px-5">
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
      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside
          className={cn(
            "docs-scroll sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50 transition-[width,padding] duration-200 ease-out lg:block",
            sidebarOpen ? "w-[18.5rem] px-4 py-6" : "w-0 overflow-hidden border-r-0 p-0",
          )}
        >
          {sidebarOpen && <SidebarNav sections={sections} />}
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-[88rem] gap-14 px-5 pt-10 pb-24 lg:px-10 lg:pt-12">
            <main id="content" tabIndex={-1} className="min-w-0 flex-1 outline-none">
              {children}
            </main>
            <aside className="sticky top-28 hidden w-56 shrink-0 self-start xl:block">
              {toc}
            </aside>
          </div>
        </div>
      </div>
      {pager ? (
        <div
          className={cn(
            "fixed right-0 bottom-0 z-30 border-t border-gray-200 bg-background/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md",
            sidebarOpen ? "left-0 lg:left-[18.5rem]" : "left-0",
          )}
        >
          <div className="mx-auto max-w-[88rem]">{pager}</div>
        </div>
      ) : null}
    </div>
  );
}
