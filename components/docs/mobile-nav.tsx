"use client";

import { useEffect, useState } from "react";
import { Brand } from "@/components/docs/brand";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import type { SidebarSection } from "@/content/sidebar";

export function MobileNav({ sections }: { sections: SidebarSection[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-hover hover:text-foreground lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open documentation menu"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/30"
            aria-label="Close documentation menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-elevated">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Brand compact />
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-hover hover:text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close documentation menu"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="docs-scroll flex-1 overflow-y-auto px-3 py-5">
              <SidebarNav sections={sections} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
