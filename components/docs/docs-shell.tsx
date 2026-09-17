"use client";

import { useState } from "react";
import { Brand } from "@/components/docs/brand";
import { MobileNav } from "@/components/docs/mobile-nav";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import type { SidebarSection } from "@/content/sidebar";
import { cn } from "@/lib/cn";

export function DocsShell({
  sections,
  children,
  toc,
}: {
  sections: SidebarSection[];
  children: React.ReactNode;
  toc?: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-md">
        <div className="flex h-16 items-center gap-3 px-4 lg:px-5">
          <MobileNav sections={sections} />
          <button
            type="button"
            className="hidden size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-hover hover:text-foreground lg:inline-flex"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-pressed={!sidebarOpen}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="4" y="5" width="16" height="14" rx="2" />
              <path d="M9 5v14" />
            </svg>
          </button>
          <Brand />
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside
          className={cn(
            "docs-scroll sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto border-r border-border/80 bg-sidebar transition-[width,padding] duration-200 ease-out lg:block",
            sidebarOpen ? "w-[18.5rem] px-4 py-6" : "w-0 overflow-hidden p-0 border-r-0",
          )}
        >
          {sidebarOpen && <SidebarNav sections={sections} />}
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-[88rem] gap-14 px-5 py-10 lg:px-10 lg:py-12">
            <div className="min-w-0 flex-1">{children}</div>
            <aside className="sticky top-28 hidden w-56 shrink-0 self-start xl:block">
              {toc}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
