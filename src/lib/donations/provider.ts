import type { DonationProvider, DonationProviderKind } from "./types";
import { stripeProvider } from "./stripe";
import { makeEmbedProvider } from "./embed";
import { makeVirtuousProvider } from "./virtuous";
import { noneProvider } from "./none";

const VALID: readonly DonationProviderKind[] = ["stripe", "paypal", "patreon", "donorbox", "virtuous", "none"];

function parseProvider(raw: string | undefined): DonationProviderKind {
  const lower = (raw ?? "virtuous").trim().toLowerCase() as DonationProviderKind;
  return VALID.includes(lower) ? lower : "virtuous";
}

/**
 * Pick the donation provider at runtime based on DONATION_PROVIDER env.
 * The committee's chosen platform is Virtuous (via Applied Love Labs),
 * so that's the default when the env var is missing or malformed --
 * a misconfigured environment still lands on the real donation form
 * instead of silently falling back to a stub.
 *
 * Alternate providers:
 *   - stripe: direct Stripe Checkout. Needs STRIPE_SECRET_KEY.
 *   - donorbox / patreon / paypal: URL embeds. Need DONATION_EMBED_URL.
 *   - none: donations paused; UI explains the state.
 * To add a new backend, drop a file in src/lib/donations/ exporting a
 * DonationProvider and register it in the switch below.
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
    case "virtuous":
      return makeVirtuousProvider();
    case "none":
      return noneProvider;
  }
}

export const donationProviderKind = (): DonationProviderKind =>
  parseProvider(process.env.DONATION_PROVIDER);
