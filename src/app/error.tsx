"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[synapse] unhandled client error", error);
  }, [error]);

  return (
    <div className="container-gutter flex min-h-[70vh] flex-col items-start justify-center py-section">
      <p className="eyebrow mb-4">500</p>
      <h1 className="text-display-lg text-balance">Something misfired on our end.</h1>
      <p className="mt-6 max-w-prose text-lg text-muted-foreground text-pretty">
        The site hit an unexpected error. Try reloading, or let us know what
        you were doing when it happened.
      </p>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">Try again</button>
        <Link href="/" className="btn btn-ghost">Home</Link>
      </div>
    </div>
  );
}
