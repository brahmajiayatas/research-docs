import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { Pre } from "@/components/mdx/pre";

function heading(Tag: "h2" | "h3" | "h4", className: string) {
  return function Heading({
    children,
    id,
    ...props
  }: ComponentProps<typeof Tag>) {
    return (
      <Tag id={id} className={className} {...props}>
        {id ? (
          <a href={`#${id}`} className="no-underline text-inherit hover:text-accent">
            {children}
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  };
}

export const mdxComponents = {
  h2: heading(
    "h2",
    "scroll-mt-28 mt-12 mb-4 border-t border-border/70 pt-8 font-display text-[1.65rem] leading-snug font-medium tracking-[-0.02em] text-foreground",
  ),
  h3: heading(
    "h3",
    "scroll-mt-28 mt-9 mb-3 text-lg font-medium tracking-tight text-foreground",
  ),
  h4: heading(
    "h4",
    "scroll-mt-28 mt-7 mb-2 text-base font-medium tracking-tight text-foreground",
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 text-[15.5px] leading-8 text-pretty text-muted" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-[15.5px] leading-8 text-muted marker:text-subtle" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[15.5px] leading-8 text-muted marker:text-subtle" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-accent underline decoration-accent/30 underline-offset-[5px] transition-colors hover:decoration-accent"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-6 border-l border-accent/50 bg-accent-soft/40 py-1 pl-5 text-[15.5px] leading-8 text-foreground [&_p]:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-12 border-border/80" {...props} />,
  table: ({ children, ...props }) => (
    <div className="mb-8 overflow-x-auto rounded-xl border border-border/80 bg-surface">
      <table className="w-full min-w-[40rem] border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-hover text-left text-foreground" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-[12px] font-medium tracking-[0.08em] uppercase" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-t border-border/80 px-4 py-3 align-top text-muted first:font-medium first:text-foreground" {...props}>
      {children}
    </td>
  ),
  code: ({ children, className, ...props }) => {
    const isBlock = Boolean(className);
    return (
      <code
        className={
          isBlock
            ? `font-mono text-[0.84em] ${className ?? ""}`
            : "rounded-[5px] bg-hover px-1.5 py-0.5 font-mono text-[0.84em] text-foreground"
        }
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: Pre,
} satisfies MDXComponents;
