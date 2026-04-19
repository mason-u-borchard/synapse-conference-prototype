import type { DonationProvider, DonationProviderKind } from "./types";
import { stripeProvider } from "./stripe";
import { makeEmbedProvider } from "./embed";
import { noneProvider } from "./none";

const VALID: readonly DonationProviderKind[] = ["stripe", "paypal", "patreon", "donorbox", "none"];

function parseProvider(raw: string | undefined): DonationProviderKind {
  const lower = (raw ?? "stripe").trim().toLowerCase() as DonationProviderKind;
  return VALID.includes(lower) ? lower : "stripe";
}

/**
 * Pick the donation provider at runtime based on DONATION_PROVIDER env.
 * When the committee picks a final platform, either:
 *   1. If the platform is Stripe, set STRIPE_SECRET_KEY and leave
 *      DONATION_PROVIDER=stripe. No code change.
 *   2. If the platform is Donorbox / Patreon / PayPal, set
 *      DONATION_PROVIDER=<name> and DONATION_EMBED_URL to the hosted
 *      form. The UI will render an embed link and bypass /api/donate.
 *   3. To implement something entirely new, drop a new file under
 *      src/lib/donations/ exporting a DonationProvider and register
 *      it below. Keep the interface identical so nothing else changes.
 */
export function getDonationProvider(): DonationProvider {
  const kind = parseProvider(process.env.DONATION_PROVIDER);
  switch (kind) {
    case "stripe":
      return stripeProvider;
    case "donorbox":
    case "patreon":
    case "paypal":
      return makeEmbedProvider(kind);
    case "none":
      return noneProvider;
  }
}

export const donationProviderKind = (): DonationProviderKind =>
  parseProvider(process.env.DONATION_PROVIDER);
