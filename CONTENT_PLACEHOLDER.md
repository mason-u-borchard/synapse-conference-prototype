# Content placeholders

Every piece of text and data in this prototype is placeholder content
unless otherwise decided by the committee. The site ships with these
values so that layout, typography, and flows can be evaluated against
something that reads like real conference copy -- but the committee
owns the actual content decisions.

## Where placeholders live

All of it is in `src/content/*.json`. That's the full list of
placeholder sources:

- `meta.json` -- conference name, subtitle, dates, venue, mission,
  principles, fiscal sponsor info. **Committed facts:** the conference
  is in Atlanta on October 9-11, 2026. Everything else -- venue,
  fiscal sponsor, registration rates, speaker roster -- is a
  placeholder.
- `speakers.json` -- twenty speakers, listed as "Speaker 1" through
  "Speaker 20" while the committee finalizes invitations. Each has an
  affiliation, research areas, a plausible academic-style talk title,
  and an abstract; none of the names are real people yet.
- `schedule.json` -- three days, four tracks, realistic cadence. Time
  slots and titles are placeholder structures the committee can
  edit or replace wholesale.
- `faq.json` -- the ten most-likely questions. The committee should
  review and adjust answers; registration rates and exact dates
  deliberately read as "to be finalized" rather than bluffing.
- `sponsors.json` -- tiers labeled Presenting / Supporting / Community.
  Every entry -- including the Presenting-tier "Fiscal sponsor TBD" --
  is a placeholder until the committee confirms partnerships.
- `committee.json` -- six roles with [TBD] names until the committee
  approves public listing.

## How placeholders feed the chatbot

Ava reads from these same JSON files at request time -- see
`src/lib/concierge-prompt.ts`. Updating any content file updates
Ava's answers on the next chat request, no deploy cycle needed.

## What's NOT a placeholder

- The layout and design system (colors, typography, spacing)
- The signature hero animation
- The swappable donation module architecture (see
  `src/lib/donations/README.md`)
- Accessibility defaults (focus rings, reduced-motion, skip link)
- Form pipeline, rate limiting, security headers
- Ava's disclosure that she's an AI assistant

Those are design decisions this prototype is proposing, not content to
edit. They are worth reviewing, but they are not scaffolding.
