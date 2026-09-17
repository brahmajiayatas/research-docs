"use client";

import { useEffect, type ReactNode } from "react";

const BLOCKED_KEYS = new Set(["c", "x", "s", "a", "u", "p"]);

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

export function ContentProtection({ children }: { children: ReactNode }) {
  useEffect(() => {
    function prevent(event: Event) {
      if (isEditable(event.target)) return;
      event.preventDefault();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isEditable(event.target)) return;
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && BLOCKED_KEYS.has(key)) {
        event.preventDefault();
      }
    }

    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("selectstart", prevent);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return children;
}
