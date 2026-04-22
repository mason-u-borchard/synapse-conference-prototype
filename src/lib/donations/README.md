# Donation module

This directory is deliberately the only place that knows how donations
actually flow. Everything else (the `/donate` page, the `/api/donate`
route, the Ava concierge) goes through the `DonationProvider`
interface.

## Why

The committee has not yet finalized which donation platform the
Synapse will use. The fiscal sponsor (still being finalized by the
committee) may have a preferred donation partner; the committee may
prefer the simplicity of a Donorbox embed; or we may end up on Stripe
directly. We don't know, and we shouldn't need to know to build the
rest of the site.

The rest of the app treats donation as a tiny interface with two
behaviors: render a "donate" affordance, and (for API-driven
providers) create a checkout session. Swapping providers is one
env-var change plus (for a brand new backend) one new file.

## Choosing a provider

Set `DONATION_PROVIDER` in `.env.local` / Vercel:

| Value       | What it does                                                                           |
|-------------|----------------------------------------------------------------------------------------|
| `virtuous`  | Committee's chosen platform via ALL. Renders the Virtuous form inline via JS embed.    |
| `stripe`    | API-driven direct. Uses `STRIPE_SECRET_KEY` + Checkout Sessions.                       |
| `donorbox`  | Sends supporters to a Donorbox-hosted form at `DONATION_EMBED_URL`.                    |
| `patreon`   | Sends supporters to a Patreon tier page at `DONATION_EMBED_URL`.                       |
| `paypal`    | Sends supporters to a PayPal donation link at `DONATION_EMBED_URL`.                    |
| `none`      | Donation paused; UI explains the state.                                                |

The **Virtuous** provider is the live one. It reads
`NEXT_PUBLIC_VIRTUOUS_FORM_ID` and `NEXT_PUBLIC_VIRTUOUS_ORG_ID` (both
have safe defaults baked in -- override only if ALL rotates the form).
The donate page inserts a `<script src=cdn.virtuoussoftware.com/...>`
into a container div on client-side hydration; Virtuous takes over and
renders the form inline. Funds land in the ALL Stripe account under
the hood; receipts come from ALL. CSP allowlists the virtuoussoftware
and virtuousapi domains in `next.config.js`.

For URL-embed providers (`donorbox`, `patreon`, `paypal`), the donate
page stops contacting `/api/donate` entirely and just renders a styled
link to the `DONATION_EMBED_URL`. No code changes needed.

## Adding a brand new provider

1. Drop a new file in this directory exporting a `DonationProvider`
   (see `types.ts` for the contract).
2. Register it inside `provider.ts#getDonationProvider`.
3. Add its name to the `DonationProviderKind` union in `types.ts`.
4. Update the Content-Security-Policy `connect-src` list in
   `next.config.js` if the new provider calls a different domain.

## What this module does not do

- No database writes. Donor records live in the provider (Stripe,
  Donorbox, etc.) and are surfaced through their dashboards.
- No receipt generation. Receipts come from the chosen fiscal sponsor
  or the donation provider depending on flow.
- No UI. The `src/components/donate-form.tsx` file is the only UI;
  this module just describes the backend.
