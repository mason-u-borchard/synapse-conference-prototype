// Shared types for the donation module. The committee is still deciding
// which donation backend to use (Stripe, Donorbox, PayPal, Patreon, a
// platform ALL recommends, etc.). Every provider implements the same
// DonationProvider interface so the UI and API route never know which
// backend is live -- swap one module and everything keeps working.

export type DonationProviderKind =
  | "stripe"
  | "paypal"
  | "patreon"
  | "donorbox"
  | "none";

export interface DonationCheckoutInput {
  amountCents: number;
  recurring: boolean;
  cancelUrl: string;
  successUrl: string;
}

export type DonationCheckoutResult =
  | { kind: "redirect"; url: string }
  | { kind: "stub"; message: string }
  | { kind: "disabled"; message: string };

export interface DonationProvider {
  name: DonationProviderKind;
  /** Shown above the donate form so supporters know where their money goes. */
  label: string;
  /** Short blurb describing how the provider works for this site. */
  blurb: string;
  /** True when the provider doesn't need our /api/donate at all -- use the embed URL. */
  embedOnly: boolean;
  /** The embed URL (Donorbox/Patreon/PayPal) or empty for API-driven providers. */
  embedUrl?: string;
  /** Create a checkout session (API-driven providers only). */
  createCheckout?: (input: DonationCheckoutInput) => Promise<DonationCheckoutResult>;
}
