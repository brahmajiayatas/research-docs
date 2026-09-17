import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

function heading(Tag: "h2" | "h3" | "h4", className: string) {
  return function Heading({
    children,
    id,
    ...props
  }: ComponentProps<typeof Tag>) {
    return (
      <Tag id={id} className={className} {...props}>
        {id ? (
          <a href={`#${id}`} className="text-inherit no-underline hover:text-accent">
            {children}
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  };
}

const linkClassName =
  "font-medium text-accent underline decoration-accent/30 underline-offset-[5px] transition-colors hover:decoration-accent";

export const mdxComponents = {
  h2: heading(
    "h2",
    "scroll-mt-32 mt-12 mb-4 border-t border-gray-200 pt-8 font-display text-[1.65rem] leading-snug font-medium tracking-[-0.02em] text-foreground",
  ),
  h3: heading(
    "h3",
    "scroll-mt-32 mt-9 mb-3 text-lg font-medium tracking-tight text-foreground",
  ),
  h4: heading(
    "h4",
    "scroll-mt-32 mt-7 mb-2 text-base font-medium tracking-tight text-foreground",
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 text-[15.5px] leading-8 text-pretty text-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-[15.5px] leading-8 text-foreground marker:text-subtle" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[15.5px] leading-8 text-foreground marker:text-subtle" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href = "/" }) => {
    const external = href.startsWith("http://") || href.startsWith("https://");

    if (external) {
      return (
        <a href={href} className={linkClassName} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={linkClassName}>
        {children}
      </Link>
    );
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-6 bg-gray-50 py-1 pl-5 text-[15.5px] leading-8 text-foreground [&_p]:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-12 border-gray-200" {...props} />,
  table: ({ children, ...props }) => (
    <div className="mb-8 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50">
      <table
        className="w-full min-w-[34rem] border-collapse text-sm [&_td:first-child]:w-10 [&_th:first-child]:w-10"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 text-left text-foreground" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-[12px] font-medium tracking-[0.08em] uppercase" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-t border-gray-200 px-4 py-3 align-top text-foreground first:font-medium" {...props}>
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
            : "rounded-[5px] bg-gray-50 px-1.5 py-0.5 font-mono text-[0.84em] text-foreground"
        }
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="mb-7 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-[13px] leading-7 text-foreground [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[13px] [&_code]:text-foreground"
      {...props}
    >
      {children}
    </pre>
  ),
} satisfies MDXComponents;
