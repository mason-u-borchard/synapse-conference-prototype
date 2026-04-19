import Stripe from "stripe";
import type {
  DonationProvider,
  DonationCheckoutInput,
  DonationCheckoutResult,
} from "./types";

// Stripe-backed checkout. Falls back to a "stub" response when
// STRIPE_SECRET_KEY is absent so local dev never hard-fails.
export const stripeProvider: DonationProvider = {
  name: "stripe",
  label: "Stripe",
  blurb:
    "Payments are processed by Stripe. Card details never touch our servers. Recurring gifts can be cancelled with one click.",
  embedOnly: false,
  createCheckout: async (input: DonationCheckoutInput): Promise<DonationCheckoutResult> => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return {
        kind: "stub",
        message:
          "Stripe is not provisioned in this environment. The donate UI completed as a demo; a real Checkout session will be created once the committee finalizes keys.",
      };
    }
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: input.recurring ? "subscription" : "payment",
      payment_method_types: ["card"],
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: input.amountCents,
            product_data: {
              name: input.recurring
                ? "The Synapse annual support (via Applied Love Labs)"
                : "The Synapse donation (via Applied Love Labs)",
            },
            ...(input.recurring ? { recurring: { interval: "year" } } : {}),
          },
        },
      ],
    });
    if (!session.url) {
      return { kind: "stub", message: "Stripe did not return a checkout URL." };
    }
    return { kind: "redirect", url: session.url };
  },
};
