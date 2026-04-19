# Deployment

This prototype is designed to live at
`https://masonborchard.com/synapse-conference-prototype` via a Vercel
rewrite from the personal-site project. It can also be hosted on its
own domain later (e.g., `thesynapsecon.com`) with one config change.

## 1. Deploy to Vercel

1. From the Vercel dashboard, import this repo as a new project.
   Keep the default Next.js framework preset.
2. In the project's environment variables, set the values below. All
   environments (production + preview) unless you want preview
   deployments to run without a chatbot, which is fine.

   | Variable                       | Value                                        | Required? |
   |-------------------------------|----------------------------------------------|-----------|
   | `NEXT_PUBLIC_BASE_PATH`       | `/synapse-conference-prototype`              | yes (if subpath) |
   | `NEXT_PUBLIC_SITE_URL`        | `https://masonborchard.com`                  | yes       |
   | `ANTHROPIC_API_KEY`           | From anthropic.com/settings/keys             | soft      |
   | `OPENAI_API_KEY`              | Only if Anthropic is not used                | soft      |
   | `CONCIERGE_MODEL_ID`          | Optional override (e.g., `gpt-4o` or newer Claude) | no   |
   | `GOOGLE_SERVICE_ACCOUNT_B64`  | base64-encoded service account JSON          | soft      |
   | `GOOGLE_SHEET_ID`             | The target Sheet ID                          | soft      |
   | `RESEND_API_KEY`              | Resend API key                               | soft      |
   | `RESEND_FROM`                 | e.g., `The Synapse <hello@thesynapse.org>`   | soft      |
   | `DONATION_PROVIDER`           | `stripe` / `donorbox` / `patreon` / `paypal` / `none` | no |
   | `STRIPE_SECRET_KEY`           | For Stripe-backed donations                  | conditional |
   | `DONATION_EMBED_URL`          | For embed-based donation providers           | conditional |
   | `UPSTASH_REDIS_REST_URL`      | Rate limiter                                 | soft      |
   | `UPSTASH_REDIS_REST_TOKEN`    | Rate limiter                                 | soft      |

   "Soft" means the site still builds and ships without the variable;
   the corresponding feature degrades to a stub.

3. Deploy. Vercel will give you a `*.vercel.app` URL -- note it.

## 2. Wire the rewrite on the personal site

Add the rewrite below to masonborchard.com's `next.config.js` (or
`vercel.json`). Replace the destination with your actual Vercel URL.

### Next.js:

```js
// next.config.js on masonborchard.com
module.exports = {
  async rewrites() {
    return [
      {
        source: "/synapse-conference-prototype/:path*",
        destination: "https://synapse-conference-prototype.vercel.app/synapse-conference-prototype/:path*",
      },
    ];
  },
};
```

### vercel.json:

```json
{
  "rewrites": [
    {
      "source": "/synapse-conference-prototype/:path*",
      "destination": "https://synapse-conference-prototype.vercel.app/synapse-conference-prototype/:path*"
    }
  ]
}
```

Push that change and Vercel redeploys masonborchard.com. The
prototype is now reachable at
`https://masonborchard.com/synapse-conference-prototype`.

## 3. When the conference gets a real domain

When the committee chooses `thesynapsecon.com` (or similar) through
ALL / TILT:

1. In Vercel, add the domain to the prototype project.
2. Update DNS to point the apex / www record at Vercel's standard
   targets (`76.76.21.21` for A records or `cname.vercel-dns.com` for
   CNAMEs).
3. Clear `NEXT_PUBLIC_BASE_PATH` (set it to an empty string).
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain.
5. Update `src/app/robots.ts` to allow indexing (remove the
   placeholder-era disallow).
6. Remove the rewrite from masonborchard.com if you no longer want
   the subpath fallback.

## 4. Local verification of the subpath build

```bash
NEXT_PUBLIC_BASE_PATH=/synapse-conference-prototype npm run build
NEXT_PUBLIC_BASE_PATH=/synapse-conference-prototype npm run start
# then visit http://localhost:3021/synapse-conference-prototype
```

Internal links, asset URLs, API route calls, and sitemap entries all
resolve under the basePath. `robots.txt` disallows crawling the
prototype path so it stays unlisted until the committee chooses to
promote it.

## 5. CI expectations

`.github/workflows/ci.yml` runs lint, typecheck, test, and build on
every PR. Lighthouse CI asserts 90+ performance, 95+ accessibility,
and 90+ best-practices/SEO on the four most-trafficked pages.

## 6. Operational notes

- Ava returns a 503 if no model provider key is set. The UI handles
  that gracefully (offline banner pointing to the committee email).
- Stripe is in "stub mode" when `STRIPE_SECRET_KEY` is unset -- the
  UI shows a polite demo-mode message. When the committee picks the
  real donation platform, either provision Stripe or flip
  `DONATION_PROVIDER` to `donorbox`/`patreon`/`paypal` and set
  `DONATION_EMBED_URL`.
- The Sheets sink retries transient 5xx / 429 with exponential
  backoff. A full outage surfaces as an actionable 500 response.
- Rate limiting uses Upstash in prod and an in-memory sliding window
  in dev; the limiter silently downgrades if Upstash env vars are
  missing.
