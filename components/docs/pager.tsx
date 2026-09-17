import Link from "next/link";
import { cn } from "@/lib/cn";

export function Pager({
  previous,
  next,
}: {
  previous: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Page" className="flex items-center justify-between gap-3">
      {previous ? (
        <PagerLink href={previous.href} label="Previous" title={previous.title} />
      ) : (
        <span />
      )}
      {next ? (
        <PagerLink href={next.href} label="Next" title={next.title} align="right" />
      ) : null}
    </nav>
  );
}

function PagerLink({
  href,
  label,
  title,
  align = "left",
}: {
  href: string;
  label: string;
  title: string;
  align?: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex max-w-[48%] items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-foreground shadow-sm transition-colors hover:border-border-strong hover:bg-surface",
        align === "right" && "ml-auto text-right",
      )}
    >
      {align === "left" && (
        <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-subtle transition-colors group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M10 3 5 8l5 5" />
        </svg>
      )}
      <span className="min-w-0">
        <span className="block text-[10px] leading-none tracking-[0.14em] text-subtle uppercase">{label}</span>
        <span className="mt-1 block truncate text-[13px] font-medium">{title}</span>
      </span>
      {align === "right" && (
        <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-subtle transition-colors group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M6 3l5 5-5 5" />
        </svg>
      )}
    </Link>
  );
}
