# 100% トラッカー

Mobile-first local-only PWA for food, workout, body weight, goal, and AI-ready report logging.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The production target is Cloudflare Workers with Static Assets, Access, D1,
private R2 evidence storage, and an optional Gemini photo-analysis secret.
See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md).

GitHub Pages can remain enabled during migration. On that origin the app keeps
working in local-only mode. On the protected Cloudflare origin, D1 is the cloud
source of truth and IndexedDB is the offline cache.
