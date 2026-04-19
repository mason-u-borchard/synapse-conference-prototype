# Contributing

This repo is a prototype -- one of several pieces the organizing committee
is using to shape what the actual Synapse website becomes. Keep changes
small, surface tradeoffs early, and bias toward handing back choices to
the committee rather than foreclosing them in code.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev   # localhost:3021
```

Everything has a graceful fallback when a credential is missing, so you
can run the site end-to-end with zero secrets (Ava stays offline, emails
log to stdout, etc.).

## Branching & commits

- Work on short-lived feature branches.
- Conventional Commits, scoped, with a short body explaining the *why*:

  ```
  feat(concierge): route off-topic questions through a single warm deflection

  - Keep tone consistent when Ava gets asked for pizza recommendations
  - Mirrors the committee's preference for fewer prompts with stronger steering
  ```

  Allowed types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`,
  `test`, `perf`, `build`, `ci`.

## Code style

- TypeScript strict. No `as any`.
- Component and function names use conference vocabulary
  (`SpeakerCard`, `SessionRow`, `assembleConciergePrompt`), not generic
  CRUD names.
- Comments explain *why*, not *what* -- and only where the why is
  non-obvious.

## Content

Speaker bios, abstracts, FAQ, sponsor copy, and mission statement all
live as JSON in `src/content/`. They are **placeholders** until the
committee finalizes text. Ava reads these at request time, so editing
a JSON file updates the chatbot's grounding automatically.

## Accessibility floor

WCAG 2.2 AA. Before merging any change that affects interaction, color,
or motion:

- Tab through the flow without a mouse.
- Test with `prefers-reduced-motion` enabled.
- Verify contrast in both light and dark mode.

## Reaching the committee

Questions, concerns, or "this prototype made a decision the committee
should make" flags: open a GitHub discussion or email
`hello@thesynapse.example`.
