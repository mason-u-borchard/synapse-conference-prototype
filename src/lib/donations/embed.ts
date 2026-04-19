import type { DonationProvider, DonationProviderKind } from "./types";

// Embed-style providers (Donorbox, Patreon, PayPal's hosted button)
// don't need our /api/donate endpoint at all -- the UI just sends the
// supporter to an external URL. This module produces one of these
// providers on demand based on DONATION_PROVIDER and DONATION_EMBED_URL.

interface EmbedConfig {
  name: DonationProviderKind;
  label: string;
  blurbFor: (url: string | undefined) => string;
}

const CONFIGS: Record<Exclude<DonationProviderKind, "stripe" | "none">, EmbedConfig> = {
  donorbox: {
    name: "donorbox",
    label: "Donorbox",
    blurbFor: () =>
      "Donations are handled by Donorbox. Your receipt is issued by Applied Love Labs, our fiscal sponsor.",
  },
  patreon: {
    name: "patreon",
    label: "Patreon",
    blurbFor: () =>
      "Ongoing support is handled through Patreon. Cancel from your Patreon account at any time.",
  },
  paypal: {
    name: "paypal",
    label: "PayPal",
    blurbFor: () =>
      "Donations are processed by PayPal. PayPal sends the receipt; Applied Love Labs receives the funds.",
  },
};

export function makeEmbedProvider(kind: Exclude<DonationProviderKind, "stripe" | "none">): DonationProvider {
  const config = CONFIGS[kind];
  const url = process.env.DONATION_EMBED_URL;
  return {
    name: config.name,
    label: config.label,
    blurb: config.blurbFor(url),
    embedOnly: true,
    embedUrl: url,
  };
}
