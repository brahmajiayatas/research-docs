"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Brand } from "@/components/docs/brand";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import type { SidebarSection } from "@/content/sidebar";

export function MobileNav({ sections }: { sections: SidebarSection[] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md text-subtle transition-colors hover:bg-hover hover:text-foreground lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open documentation menu"
        aria-expanded={open}
        aria-controls="mobile-docs-menu"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
              aria-label="Close documentation menu"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-docs-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="absolute inset-y-0 left-0 z-10 flex h-dvh w-[min(20rem,88vw)] flex-col border-r border-border bg-sidebar shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div id={titleId}>
                  <Brand compact />
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-subtle transition-colors hover:bg-hover hover:text-foreground"
                  onClick={() => setOpen(false)}
                  aria-label="Close documentation menu"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
              <div className="docs-scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-sidebar px-4 py-5">
                <SidebarNav sections={sections} onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
