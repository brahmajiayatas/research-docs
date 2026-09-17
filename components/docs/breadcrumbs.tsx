import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ title: string; href: string }>;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] text-subtle">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.href}-${item.title}`} className="flex items-center gap-2">
              {index > 0 && (
                <svg viewBox="0 0 16 16" className="size-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 3.5 10.5 8 6 12.5" />
                </svg>
              )}
              {last ? (
                <span className="text-foreground">{item.title}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
