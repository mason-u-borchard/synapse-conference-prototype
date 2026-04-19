# The Synapse -- Conference Prototype

> Where women connect mind, machine, and what comes next.

A prototype for The Synapse 2026, a women-focused academic conference on
consciousness research, cognitive science, and machine intelligence.
Fiscally sponsored by **Applied Love Labs** (ALL / TILT).

- **When:** October 2026 (exact dates TBD by the committee)
- **Where:** Atlanta, Georgia (venue TBD)
- **Fiscal sponsor:** Applied Love Labs / TILT

## What this repo is

One of several artifacts the organizing committee is using to shape
what the actual Synapse website becomes. A second prototype built by
Audubon (using Claude Code + Tailwind templates + Vercel) is being
evaluated in parallel. Neither is trying to win; both are trying to
make the committee's decision easier either way.

The goal of this prototype specifically is to:

1. Demonstrate that the signature design direction (editorial,
   academic-warm, neural-inspired) can carry the whole site without
   drifting into Tailwind-template default aesthetics.
2. Show a working, content-grounded Ava concierge whose knowledge
   updates when the JSON content files update.
3. Propose a **swappable donation module** designed around the
   committee's biggest open question: which donation platform to
   use through ALL/TILT.
4. Get to a place where Lighthouse passes 90+ and accessibility
   passes without special configuration.

## A note on how this was built

This prototype was built with Claude Code assistance. Keeping that
in the README is intentional -- the organizing committee has been
open about AI tooling, and Ava (the on-site concierge) is herself an
AI. Hiding the build process while the product is an AI chatbot
would be a strange choice.

The code, design decisions, and content placeholders were made
intentionally and reviewed by a human (Mason Borchard). AI was used
the way most senior engineers use it: to move faster through
boilerplate so attention can go to the decisions that matter.

## Tech stack

- Next.js 14 (App Router) + TypeScript strict
- Tailwind CSS with a design-token layer (aubergine / ivory / gold)
- Framer Motion for considered micro-motion
- Vercel AI SDK with an Anthropic-first, OpenAI-fallback chat route
  (see `src/app/api/chat/route.ts`)
- Google Sheets API (service account) for registrations, with a
  structured log fallback when no credentials are provisioned
- Resend for confirmation email (no-op when unset)
- **Swappable donation module:** Stripe by default, Donorbox /
  Patreon / PayPal as embed providers, or `none` when donations are
  paused. See `src/lib/donations/README.md` for the swap walkthrough.
- Upstash Redis rate limiting with an in-memory fallback
- Vitest + Playwright; Lighthouse CI in GitHub Actions

## Running it

```bash
npm install
cp .env.example .env.local   # no credentials are required for dev
npm run dev                  # http://localhost:3021
```

Everything has a graceful fallback when a credential is missing, so
you can run the full site end-to-end with zero secrets:

| Missing service                | What happens                                                |
|--------------------------------|-------------------------------------------------------------|
| `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` | Ava shows an offline banner and points to the mail alias. |
| Google service account         | Registrations log to stdout and still return a confirmation id. |
| `RESEND_API_KEY`               | Confirmation emails are silently skipped.                   |
| `STRIPE_SECRET_KEY`            | `/api/donate` returns a stub "demo mode" response.          |
| Upstash Redis env              | Rate-limiting falls back to an in-memory sliding window.    |

## Layout

```
src/
  app/            routes, layouts, route handlers, og images
  components/     UI organized by surface
  content/        JSON content -- the committee's editable source
  hooks/          focused client hooks
  lib/            content access, prompt assembly, donation module, I/O
  types/          shared content types
tests/            vitest + playwright suites
```

The `src/content/*.json` files are the single source of truth for
speaker, schedule, FAQ, and sponsor data. See `CONTENT_PLACEHOLDER.md`
for a map of what is placeholder and what is real.

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

**Palette as tokens, not classes.** Aubergine / ivory / gold hues
live as HSL CSS variables; Tailwind colors reference those variables
via `hsl(var(--token) / <alpha>)`. Dark mode is a considered palette
shift, not an inverted layer.

**Ava reads content at request time.** The chatbot's system prompt is
assembled from `src/content/*.json` every call
(`src/lib/concierge-prompt.ts`). Edit a content file, Ava's answers
update on the next request -- no deploy cycle.

**Donation is an interface, not a vendor.** The committee's biggest
open question is which donation platform ALL / TILT will use. The
donation module is structured so that Stripe, Donorbox, Patreon,
PayPal, or a brand new provider can be swapped in with one env var
(or, for entirely new backends, one new file). See
`src/lib/donations/README.md`.

**Security defaults are on, not sprinkled.** CSP, X-Frame-Options,
Referrer-Policy, Permissions-Policy, HSTS, and rate limiting on every
API route are the default in `next.config.js`. Tami's
cybersecurity-review thread on the mailing list suggested this as a
priority for whichever prototype moves forward.

## Accessibility floor

- WCAG 2.2 AA
- Visible focus rings at all times
- Skip-to-content link
- Every animation respects `prefers-reduced-motion`
- Dark mode contrast verified across text pairings

## Swapping the donation backend

See `src/lib/donations/README.md`. TL;DR:

- Stripe: set `STRIPE_SECRET_KEY`, leave `DONATION_PROVIDER=stripe`.
- Donorbox / Patreon / PayPal: set `DONATION_PROVIDER=<name>` and
  `DONATION_EMBED_URL=<the hosted URL>`. The UI switches to an embed
  link and bypasses the API route.
- Something new: add a file implementing the `DonationProvider`
  interface; register it in `provider.ts`.

## Credits

- Placeholder speaker bios are imaginary; see
  `CONTENT_PLACEHOLDER.md`.
- Typography: Fraunces (OFL), Inter (OFL), JetBrains Mono (Apache 2.0).
- Built with assistance from Anthropic's Claude via Claude Code.
