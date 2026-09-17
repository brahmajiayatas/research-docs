import { DocsShell } from "@/components/docs/docs-shell";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { Pager } from "@/components/docs/pager";
import { TableOfContents } from "@/components/docs/tableofcontents";
import { sidebar } from "@/content/sidebar";
import {
  findHref,
  flattenSidebar,
  getBreadcrumbs,
  getDoc,
  getPager,
  hrefToSlug,
} from "@/lib/docs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return flattenSidebar().map((item) => ({
    slug: hrefToSlug(item.href),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const href = findHref(slug);
  if (!href) return { title: "Not found" };
  try {
    const doc = await getDoc(href);
    return {
      title: doc.title,
      description: doc.description,
    };
  } catch {
    return { title: "Not found" };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const href = findHref(slug);
  if (!href) notFound();

  let doc;
  try {
    doc = await getDoc(href);
  } catch {
    notFound();
  }

  const pager = getPager(href);
  const breadcrumbs = getBreadcrumbs(href);

  return (
    <DocsShell
      sections={sidebar}
      toc={<TableOfContents items={doc.toc} />}
      pager={<Pager previous={pager.previous} next={pager.next} />}
    >
      <article className="w-full min-w-0">
        <header className="mb-10">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-3 truncate text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
            {doc.section}
          </p>
          <h1 className="max-w-full font-display text-[2.35rem] leading-[1.15] font-medium tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            {doc.title}
          </h1>
          {doc.description ? (
            <p className="mt-5 max-w-[42rem] font-display text-[1.35rem] leading-8 text-pretty text-muted italic">
              {doc.description}
            </p>
          ) : null}
        </header>
        {doc.toc.length > 0 && (
          <div className="mb-10 max-w-[42rem] rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 xl:hidden">
            <TableOfContents items={doc.toc} />
          </div>
        )}
        {/* Text blocks stay at a readable measure; tables use the full column. */}
        <div className="min-w-0 [&>*]:max-w-[42rem] [&>div]:max-w-none">
          {doc.content}
        </div>
      </article>
    </DocsShell>
  );
}
