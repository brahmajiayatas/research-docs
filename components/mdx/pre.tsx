"use client";

import { useRef, useState, type ComponentProps } from "react";

export function Pre({ children, ...props }: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="group relative mb-7">
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto rounded-xl bg-code p-5 font-mono text-[13px] leading-7 text-code-fg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[13px] [&_code]:text-code-fg"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] tracking-wide text-code-fg/80 uppercase transition-colors hover:bg-white/10 hover:text-code-fg"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
