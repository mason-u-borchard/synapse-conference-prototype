import type { DonationProvider } from "./types";

// Virtuous is the donation CRM that Applied Love Labs uses to take gifts.
// The ALL team provisions a form (vform) in Virtuous and gives us two
// public identifiers -- a form GUID and the ALL org id -- plus a small
// JavaScript shim that renders the form inline on our page. Virtuous
// itself sits on Stripe under the hood (data-merchantType="StripeUnified"),
// but we never see the Stripe keys; the funds land in ALL's account and
// receipts are issued in ALL's name.

const DEFAULT_VFORM = "55AF1B1C-90F3-4EA9-BFD0-44B725480143";
const DEFAULT_ORG_ID = "5729";

export function makeVirtuousProvider(): DonationProvider {
  const vformId = (process.env.NEXT_PUBLIC_VIRTUOUS_FORM_ID ?? DEFAULT_VFORM).trim();
  const orgId = (process.env.NEXT_PUBLIC_VIRTUOUS_ORG_ID ?? DEFAULT_ORG_ID).trim();
  return {
    name: "virtuous",
    label: "Applied Love Labs",
    blurb:
      "Donations are processed securely through the Applied Love Labs donation platform. Receipts are issued in ALL's name.",
    embedOnly: true,
    virtuous: { vformId, orgId },
  };
}
