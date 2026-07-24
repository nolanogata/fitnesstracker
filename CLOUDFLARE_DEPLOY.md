# Cloudflare Workers migration

The app remains local-first, but a Cloudflare Worker and D1 become the
authenticated cloud source of truth when the `/api/session` endpoint is
available. A GitHub Pages deployment continues to work in local-only mode.

## 1. Create Cloudflare resources

1. Create a Cloudflare account and a Zero Trust organization.
2. Create a Worker connected to this repository. Cloudflare's current Vite
   import flow deploys the site as a Worker with Static Assets rather than a
   legacy Pages project.
3. Set the production branch to `main`, build command to `npm run build`,
   production deploy command to `npx wrangler deploy`, and non-production
   branch deploy command to `npx wrangler versions upload --env preview`.
   `wrangler.toml` maps `dist` to Worker Static Assets.
4. Create the `phase-log-production` and `phase-log-preview` D1 databases.
5. Create the private `phase-log-catalog-evidence` and
   `phase-log-catalog-evidence-preview` R2 buckets.
6. Put each D1 database ID in the matching production or preview binding in
   `wrangler.toml`. R2 bindings use bucket names rather than IDs.
7. Apply all files under `migrations/` to both D1 databases.

Both R2 buckets must remain private. Do not add a public development URL or a
public custom domain to either bucket. Keep the Workers usage model on Free
and R2 on Standard storage. Create a low-dollar budget alert under
Manage Account > Billing > Billable Usage; budget alerts notify but do not
hard-stop usage.

## 2. Protect the Worker with Access

Require Access for both Worker URL types:

- `fitnesstracker.alex-naoya-ogata.workers.dev`
- `*-fitnesstracker.alex-naoya-ogata.workers.dev`

Use the email one-time PIN identity provider and an explicit email allowlist.
Set `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` to the resulting team domain and
application audience. Set `ADMIN_EMAILS` to a comma-separated list of
administrators.

The Worker verifies the Access JWT again. Do not enable
`DEV_AUTH_BYPASS` in preview or production.

## 3. Configure Gemini

Create a Google AI Studio project on the free tier and add the key as a Worker
secret:

```bash
npx wrangler secret put GEMINI_API_KEY
```

Set the currently available high-accuracy Flash model in
`GEMINI_PRIMARY_MODEL` and the lower-cost model in
`GEMINI_FALLBACK_MODEL`. Confirm the project's actual RPM/RPD limits in AI
Studio, then set:

- `GEMINI_PER_USER_DAILY_LIMIT`
- `GEMINI_GLOBAL_DAILY_LIMIT`

The global app limit should be no more than 80% of the displayed Google RPD
quota. The app never moves to a paid model automatically.

## 4. Configure Workers AI advice

The `AI` binding in `wrangler.toml` runs the in-app text advice feature on
Cloudflare Workers AI. It does not use the Gemini API key or Gemini quota.

- Production: 3 advice calls per user and 30 total per UTC day.
- Preview: 1 advice call per user and 5 total per UTC day.
- Model: `@cf/qwen/qwen3-30b-a3b-fp8`.

Keep the account on Workers Free. When the Workers AI free allocation or the
app limit is reached, the API fails closed and the UI offers the external-AI
report flow. Do not configure automatic paid-provider failover.

## 5. R2 lifecycle

On both evidence buckets, create an enabled Object Lifecycle Rule for prefix
`catalog-evidence/` that expires objects after 180 days.

The D1 approval record and SHA-256 evidence fingerprint remain after object
deletion. Meal photos and receipt photos used for Gemini analysis are never
written to R2.

## 6. Migrate existing data

1. Keep GitHub Pages available during validation.
2. Export one JSON backup from the old origin. Schema v1 and v2 backups are
   accepted.
3. Sign in to the Cloudflare Worker deployment.
4. Import the JSON under Settings > Export > Backup JSON.
5. Confirm that the screen reports cloud migration and run “Sync now”.
6. Verify totals on a second invited device before disabling GitHub Pages.

Browser origin isolation prevents a new Cloudflare URL from directly reading
the old GitHub Pages IndexedDB, so the one-time JSON transfer is required.

## 7. Local development

Copy `.dev.vars.example` to `.dev.vars`, keep it untracked, and run:

```bash
npx wrangler dev
```

Run `npm run build` before deployment. The build includes both the existing
regression suite and a separate type check for the Worker API.
