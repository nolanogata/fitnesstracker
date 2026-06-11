# Phase Log Local

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

This repo includes a GitHub Pages workflow at `.github/workflows/pages.yml`.

In the GitHub repository settings, set Pages source to **GitHub Actions**.

All user logs are stored in each device's IndexedDB. If multiple people open the same deployed URL, each iPhone keeps separate local data.
