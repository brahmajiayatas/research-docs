import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">404</p>
      <h1 className="font-display text-4xl font-medium tracking-[-0.03em]">Page not found</h1>
      <p className="text-muted">This documentation page does not exist.</p>
      <Link href="/" className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
        Return to the documentation home
      </Link>
    </div>
  );
}
