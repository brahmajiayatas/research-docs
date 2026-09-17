import Link from "next/link";
import { site } from "@/content/sidebar";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${site.name} documentation home`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground font-display text-[15px] leading-none text-background">
        A
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium tracking-tight">
          {site.name}
        </span>
        {!compact && (
          <span className="block truncate text-[11px] tracking-[0.16em] text-subtle uppercase">
            Documentation
          </span>
        )}
      </span>
    </Link>
  );
}
