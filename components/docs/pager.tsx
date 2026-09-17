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
    <nav aria-label="Page" className="mt-20 grid gap-3 border-t border-border/80 pt-8 sm:grid-cols-2">
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
        "group rounded-xl border border-border/80 bg-surface px-4 py-4 transition-colors hover:border-accent/30 hover:bg-elevated",
        align === "right" && "text-right sm:justify-self-end sm:w-full",
      )}
    >
      <div className="text-[11px] tracking-[0.14em] text-subtle uppercase">{label}</div>
      <div className={cn("mt-1.5 flex items-center gap-2 font-medium text-foreground", align === "right" && "justify-end")}>
        {align === "left" && (
          <svg viewBox="0 0 16 16" className="size-3.5 text-subtle transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
        )}
        <span>{title}</span>
        {align === "right" && (
          <svg viewBox="0 0 16 16" className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M6 3l5 5-5 5" />
          </svg>
        )}
      </div>
    </Link>
  );
}
