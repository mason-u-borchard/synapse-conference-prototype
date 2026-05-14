# The Synapse -- Conference Prototype

> Where women connect mind, machine, and what comes next.

The web home for The Synapse 2026, a women-led gathering at the intersection of AI, robotics, cognitive science, and consciousness. The site lives at `thesynapse.co` (v2) with the original v1 design archived at `legacy.thesynapse.co` for side-by-side comparison.

- **When:** October 9-11, 2026
- **Where:** Atlanta, GA -- venue TBD
- **Capacity:** 75 participants by invitation
- **Fiscal sponsor:** Applied Love Labs (ALL). Charitable contributions flow through ALL, which issues tax-deductible receipts in its own name.


## Tech stack

- Next.js 14 (App Router) + TypeScript strict
- Tailwind with a moss / amethyst / orchid / azure / oxide / neutral token palette and off-black / off-white / true-white / fire neutrals. Tiers 100-400 per hue; tokens live as HSL CSS variables in `src/app/globals.css`.
- Fonts: Fraunces (serif), Inter (body), Noto Sans (buttons), JetBrains Mono (eyebrows), Style Script (Julia's signature on the dedication card).
- Framer Motion for considered micro-motion; SMIL + `textPath` for the dotted-squiggle ticker on `/about`.
- Vercel AI SDK with an Anthropic-first, OpenAI-fallback chat route powering the "Ask Ava" concierge (see `src/app/api/chat/route.ts`). Ava's system prompt is reassembled from `src/content/*.json` on every request, so a content edit takes effect with no deploy.
- Google Sheets API (service account) for both registrations and the Contact tab, with a structured log fallback when no credentials are provisioned. The Notify Me email capture on `/attend` and the multi-field Keep-In-Loop form both write to the Contact tab.
- Resend for confirmation email (no-op when unset).
- **Swappable donation module:** Stripe by default, Donorbox / Patreon / PayPal as embed providers, or `none` when donations are paused. See `src/lib/donations/README.md` for the swap walkthrough.
- Upstash Redis rate limiting with an in-memory fallback.
- Vitest + Playwright; Lighthouse CI in GitHub Actions.

## Running it

```bash
npm install
cp .env.example .env.local   # no credentials are required for dev
npm run dev                  # http://localhost:3021
```

Everything has a graceful fallback when a credential is missing, so the full site runs end-to-end with zero secrets:

| Missing service                | What happens                                                |
|--------------------------------|-------------------------------------------------------------|
| `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` | Ava shows an offline banner and points to the mail alias. |
| `GOOGLE_SERVICE_ACCOUNT_B64` / `GOOGLE_SHEET_ID` | Registration and contact submissions log to stdout and still return a confirmation id. |
| `RESEND_API_KEY`               | Confirmation emails are silently skipped.                   |
| `STRIPE_SECRET_KEY`            | `/api/donate` returns a stub "demo mode" response.          |
| Upstash Redis env              | Rate-limiting falls back to an in-memory sliding window.    |

## Layout

```
src/
  app/            routes, layouts, route handlers, og images, icon.svg
  components/     UI organized by surface (header, footer, concierge, forms, cards)
  content/        JSON content -- the committee's editable source
  hooks/          focused client hooks
  lib/            content access, prompt assembly, donation module, sheets sink, email
  types/          shared content types
tests/            vitest + playwright suites
```

The `src/content/*.json` files are the single source of truth for meta, speakers, schedule, FAQ, and sponsor data. See `CONTENT_PLACEHOLDER.md` for a map of what is placeholder and what is real.

## Routes

| Route          | What it is                                                      |
|----------------|-----------------------------------------------------------------|
| `/`            | Homepage -- hero, four disciplines, organizing team, invest pitch, program arc. |
| `/about`       | Field-statement intro, dedication card on the moon, organizing team carousel, why Atlanta. |
| `/ethos`       | The nine guiding principles.                                    |
| `/attend`      | Invitation, audience list, Notify Me email capture, four discipline cards. |
| `/invest`      | Sponsor tiers, fund-the-room pitch.                             |
| `/faq`         | Categorized FAQ (attend / invest / travel / accessibility / program). |
| `/program`     | Coming soon.                                                    |
| `/apply`, `/register` | Long-form application + waitlist capture.                |
| `/donate`      | Donation flow (Stripe today, swappable).                        |
| `/privacy`     | Privacy policy.                                                 |
| `/terms`       | Terms of service.                                               |

## Scripts

| Script              | Purpose                                           |
|---------------------|---------------------------------------------------|
| `npm run dev`       | Local dev on port 3021                            |
| `npm run build`     | Production build                                  |
| `npm run start`     | Start the built app                               |
| `npm run lint`      | `next lint`                                       |
| `npm run typecheck` | Strict `tsc --noEmit`                             |
| `npm test`          | Vitest suites                                     |
| `npm run test:e2e`  | Playwright critical-flow smoke                    |
| `npm run lhci`      | Lighthouse CI against the built app               |

## Key design decisions

**Palette as tokens, not classes.** Every brand hue lives as an HSL CSS variable; Tailwind colors reference those variables via `hsl(var(--token) / <alpha>)`. Dark mode is a considered palette shift, not an inverted layer.

**Ava reads content at request time.** The chatbot's system prompt is assembled from `src/content/*.json` every call (`src/lib/concierge-prompt.ts`). Edit a content file, Ava's answers update on the next request -- no deploy cycle.

**Donation is an interface, not a vendor.** The donation module is structured so that Stripe, Donorbox, Patreon, PayPal, or a brand-new provider can be swapped in with one env var (or, for entirely new backends, one new file). See `src/lib/donations/README.md`.

**Two Vercel projects, one repo.** The `redesign-v2` branch serves the apex `thesynapse.co` and the frozen `legacy-v1` branch serves `legacy.thesynapse.co`. The new homepage carries a thin banner + a footer link back to the v1 design so visitors can compare.

**Security defaults are on, not sprinkled.** CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS, and rate limiting on every API route are the default in `next.config.js`.

## Accessibility floor

- WCAG 2.2 AA
- Visible focus rings at all times
- Skip-to-content link
- Every animation respects `prefers-reduced-motion`
- Dark mode contrast verified across text pairings
- Concierge widget honors `env(safe-area-inset-*)` on notched devices

## Swapping the donation backend

See `src/lib/donations/README.md`. TL;DR:

- Stripe: set `STRIPE_SECRET_KEY`, leave `DONATION_PROVIDER=stripe`.
- Donorbox / Patreon / PayPal: set `DONATION_PROVIDER=<name>` and `DONATION_EMBED_URL=<the hosted URL>`. The UI switches to an embed link and bypasses the API route.
- Something new: add a file implementing the `DonationProvider` interface; register it in `provider.ts`.
