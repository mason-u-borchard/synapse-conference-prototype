# Making Ava Live -- Full-Dynamic Deployment

The static export path at `/synapse-conference-prototype/` serves every
page, but Ava (the concierge), the registration form, and the donation
button all need server-side endpoints. This walkthrough swaps that
setup for a live deployment so everything works.

## Approach

1. **Vercel** hosts the Next.js app (free tier, generous limits). Vercel
   runs the API routes for `/api/chat`, `/api/submit-form`, and
   `/api/donate` as serverless functions.
2. **nginx on the Vultr VPS** proxies `masonborchard.com/synapse-conference-prototype/`
   to the Vercel deployment. The public URL stays the same; only the
   underlying serving changes.

No other shape of masonborchard.com is affected.

## Prerequisites

- GitHub repo for this project (we have one: `mason-u-borchard/synapse-conference-prototype`)
- Vercel account (free tier is fine)
- SSH access to the Vultr VPS (you already use `ssh timothason`)
- An OpenAI API key (or Anthropic key) to set in Vercel env

## Step 1 -- Push the current repo to GitHub

The existing GitHub repo was populated by an earlier build that has
since been rewritten. We need the current local history there instead.

```bash
cd /home/borchard/borchard-labs-workspace/synapse-conference-prototype
git remote add origin git@github.com:mason-u-borchard/synapse-conference-prototype.git
# force-push replaces the old public history with the current clean history:
git push --force origin main
```

## Step 2 -- Create Vercel project

1. Sign in at vercel.com (GitHub login is fine)
2. "Add New" -> "Project" -> import `mason-u-borchard/synapse-conference-prototype`
3. Accept the default Next.js framework preset
4. Environment variables -- add these under Production and Preview:

   | Name                       | Value                                        |
   |----------------------------|----------------------------------------------|
   | `NEXT_PUBLIC_BASE_PATH`    | `/synapse-conference-prototype`              |
   | `NEXT_PUBLIC_SITE_URL`     | `https://masonborchard.com`                  |
   | `OPENAI_API_KEY`           | your `sk-proj-...` key                       |
   | `CONCIERGE_MODEL_ID`       | `gpt-4o-mini`                                |

   Optional for later:
   - `ANTHROPIC_API_KEY` (takes precedence over OpenAI if set)
   - `GOOGLE_SERVICE_ACCOUNT_B64`, `GOOGLE_SHEET_ID` (registration -> Sheets)
   - `RESEND_API_KEY` (confirmation emails)
   - `STRIPE_SECRET_KEY` (live donation checkout)
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (rate limit)

5. Click Deploy. Vercel gives you a URL like
   `https://synapse-conference-prototype-[hash].vercel.app`.
   The production URL is `https://synapse-conference-prototype.vercel.app`.

6. Test at that URL directly -- open `/synapse-conference-prototype/` on
   the Vercel domain, click "Ask Ava", verify she streams a reply.

## Step 3 -- Add nginx proxy on the VPS

SSH to the VPS and open your nginx server block for masonborchard.com
(usually `/etc/nginx/sites-available/masonborchard.com` or in
`/etc/nginx/conf.d/`). Paste the block below *inside* the `server { }`
for `masonborchard.com`, above the catch-all `location /` if present:

```nginx
location /synapse-conference-prototype/ {
    proxy_pass https://synapse-conference-prototype.vercel.app;
    proxy_http_version 1.1;
    proxy_set_header Host synapse-conference-prototype.vercel.app;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_ssl_server_name on;

    # Ava streams -- disable buffering and caching so tokens arrive live
    proxy_buffering off;
    proxy_cache off;
    proxy_set_header Connection "";
    proxy_read_timeout 120s;
}
```

Then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

If `nginx -t` is happy, the new route is live.

## Step 4 -- Clean up the old static export on the VPS

The earlier static export landed at
`/var/www/masonborchard.com/synapse-conference-prototype/` and would
shadow nginx's proxy rule if `location /` tries filesystem first. You
have two safe options:

**Option A (recommended):** Remove the directory from the VPS.

```bash
ssh timothason 'rm -rf /var/www/masonborchard.com/synapse-conference-prototype'
```

Also remove the local synced copy so future `deploy.sh` doesn't put it
back:

```bash
rm -rf ../masonborchard.com/synapse-conference-prototype
```

(The `.gitignore` entry for this path is already in place, so nothing
is tracked locally.)

**Option B:** Leave the directory in place as a read-only fallback. The
nginx `location /synapse-conference-prototype/` block above matches
*before* the default filesystem handler, so the proxy wins. Only relevant
if you want a local cached copy for some reason.

## Step 5 -- Verify

```bash
# From any machine:
curl -sI https://masonborchard.com/synapse-conference-prototype/ | head -3
curl -sN -X POST https://masonborchard.com/synapse-conference-prototype/api/chat \
    -H 'content-type: application/json' \
    -d '{"messages":[{"role":"user","content":"What are the dates?"}]}' \
    --max-time 30 | head -20
```

The first call should return `HTTP/2 200`. The second should stream
tokens starting with `f:{...}` and `0:"..."` -- Ava answering live.

Open `https://masonborchard.com/synapse-conference-prototype/` in a
browser, click "Ask Ava", and ask something. She should reply
immediately, with full streaming.

## Rollback

If anything goes wrong:

```bash
# On the VPS, comment out the location block, then:
sudo nginx -t && sudo systemctl reload nginx
```

The site falls back to whatever filesystem content exists at
`/var/www/masonborchard.com/synapse-conference-prototype/`. If you
removed it in Step 4, you can re-run
`bash scripts/sync-to-personal-site.sh && cd ../masonborchard.com && bash deploy.sh`
from this repo to restore the static export.

## Ongoing updates

With live deployment, the update loop becomes:

```bash
# In synapse-conference-prototype:
git push origin main   # Vercel auto-redeploys on push
```

No more `sync-to-personal-site.sh`; the static-export script becomes
only useful if you ever need to revert to the subpath-served static
site again.
