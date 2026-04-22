import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apply to Participate",
  description: "The Synapse is a curated gathering of 75 participants. Applications open after the Program team finalizes the review process.",
};

export default function RegisterPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Apply</p>
        <h1 className="text-display-lg text-balance">Applications open soon.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is a curated gathering of 75 participants. Most
          places are invitation-based; a limited number will open through
          an application window the Program team is finalizing now. Once
          the window opens, the form lands here and we reach out to
          everyone who asked to be kept in the loop.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          Questions in the meantime? Ask Ava -- the concierge in the
          bottom-right corner -- or use the links below.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#apply" className="btn btn-ghost">How participation works</Link>
          <Link href="/schedule" className="btn btn-ghost">The program arc</Link>
          <Link href="/donate" className="btn btn-ghost">Support the convening</Link>
        </div>
      </header>
    </div>
  );
}
