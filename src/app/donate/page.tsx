import type { Metadata } from "next";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Support the convening",
  description: "Donations fund travel grants, access accommodations, and the mentor-matching program. Fiscally sponsored by Applied Love Labs.",
};

export default function DonatePage() {
  const provider = getDonationProvider();
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Donate</p>
        <h1 className="text-display-lg text-balance">Hold the door open for someone else.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Donations underwrite the three parts of the convening the market
          will not: travel grants for doctoral researchers, access
          accommodations, and the mentor-matching program. Every dollar
          donated is ring-fenced from operating costs and accounted for
          separately at year's end.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          The Synapse is fiscally sponsored by <span className="text-ink">{meta.fiscalSponsor.name}</span>; your receipt is issued in ALL's name. {provider.blurb}
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <DonateForm providerName={provider.name} providerLabel={provider.label} embedOnly={provider.embedOnly} embedUrl={provider.embedUrl} />
        <aside className="space-y-8">
          <section className="paper p-6">
            <h2 className="eyebrow mb-4 text-muted-foreground">Where it goes</h2>
            <ul className="space-y-3">
              <AllocationRow share={55} label="Travel grants" />
              <AllocationRow share={25} label="Access accommodations" />
              <AllocationRow share={20} label="Mentor-matching program" />
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Zero percent goes to organizer honoraria. Funds flow through Applied Love Labs.
            </p>
          </section>
          <section className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Transparency</h2>
            <p className="text-sm text-pretty text-muted-foreground">
              Financials are published through Applied Love Labs and reviewed
              annually. The committee is currently deciding between several
              donation platforms; the active backend is{" "}
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
