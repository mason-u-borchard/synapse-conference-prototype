import type { Metadata } from "next";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Support the convening",
  description: "Donations flow through Applied Love Labs, our host and fiscal sponsor. Funding categories and allocation percentages are placeholders while the committee finalizes priorities.",
};

export default function DonatePage() {
  const provider = getDonationProvider();
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Donate</p>
        <h1 className="text-display-lg text-balance">[Placeholder — replace with a concrete statement of what donor dollars do that registration fees cannot: e.g., underwrite the first ten travel grants for non-R1 doctoral researchers; fund CART captioning across all rooms.]</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Donations will support parts of the convening that registration
          fees cannot cover. The specific funding categories are
          placeholders while the committee finalizes its priorities --
          see the illustrative breakdown in the sidebar. Every dollar
          donated will be ring-fenced from operating costs.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          Gifts flow through <span className="text-ink">{meta.fiscalSponsor.name}</span>, our host and fiscal sponsor; receipts are issued in ALL's name. {provider.blurb}
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <DonateForm providerName={provider.name} providerLabel={provider.label} embedOnly={provider.embedOnly} embedUrl={provider.embedUrl} />
        <aside className="space-y-8">
          <section className="paper p-6">
            <h2 className="eyebrow mb-4 text-muted-foreground">Illustrative allocation</h2>
            <ul className="space-y-3">
              <AllocationRow share={55} label="Category A (e.g., travel grants)" />
              <AllocationRow share={25} label="Category B (e.g., access)" />
              <AllocationRow share={20} label="Category C (e.g., mentorship)" />
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Categories and percentages are placeholders the committee
              will confirm. Funds flow through Applied Love Labs.
            </p>
          </section>
          <section className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Transparency</h2>
            <p className="text-sm text-pretty text-muted-foreground">
              Financial reporting is published through Applied Love Labs
              and reviewed annually. The committee is still selecting
              a donation platform; the active backend here is{" "}
              <span className="font-mono text-ink">{provider.label}</span>.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function AllocationRow({ share, label }: { share: number; label: string }) {
  return (
    <li>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-serif text-sm text-ink">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{share}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted" role="progressbar" aria-valuenow={share} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gold" style={{ width: `${share}%` }} />
      </div>
    </li>
  );
}
