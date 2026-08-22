"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;
  return (
    <section className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
          The workshop hit a snag
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          An unexpected error occurred. Try again — or reach us directly on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-outline">Back home</Link>
        </div>
      </div>
    </section>
  );
}