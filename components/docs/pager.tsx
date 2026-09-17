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
    <nav aria-label="Page" className="flex items-center justify-between gap-2">
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
        "inline-flex max-w-[48%] items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-foreground transition-colors hover:bg-gray-100",
        align === "right" && "ml-auto",
      )}
    >
      {align === "left" && (
        <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-subtle" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M10 3 5 8l5 5" />
        </svg>
      )}
      <span className="min-w-0">
        <span className="block text-[9px] leading-none tracking-[0.12em] text-subtle uppercase">{label}</span>
        <span className="mt-0.5 block truncate text-xs font-medium">{title}</span>
      </span>
      {align === "right" && (
        <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-subtle" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 3l5 5-5 5" />
        </svg>
      )}
    </Link>
  );
}
