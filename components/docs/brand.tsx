import Link from "next/link";
import { site } from "@/content/sidebar";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-3 rounded-md"
      aria-label={`${site.name} documentation home`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground font-display text-[15px] leading-none text-background shadow-sm">
        {site.name.charAt(0)}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="flex min-w-0 items-center gap-2">
          <span className="truncate text-[15px] font-semibold tracking-tight">
            {site.name}
          </span>
          <span className="rounded border border-border bg-surface px-1.5 py-px text-[10px] font-medium tracking-[0.1em] text-subtle uppercase">
            Docs
          </span>
        </span>
        {!compact && (
          <span className="mt-0.5 block truncate text-[12px] text-subtle">
            {site.product}
          </span>
        )}
      </span>
    </Link>
  );
}
