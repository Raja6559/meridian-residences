# Meridian publishing record — 2026-10-13

- Repository: https://github.com/Raja6559/meridian-residences (public, main).
- Worker: `krelyvo-demo-meridian` in Krelyvo’s Cloudflare account.
- Custom domain: https://demo-meridian.krelyvo.com/.
- First manually deployed version: `25485605-bda3-4598-b073-a397791d4cf7`.
- Public root: HTTP 200, headline and fictional notice rendered, noindex metadata present. Hero asset: HTTP 200.
- Public browser suite: 13/13 passed across interactions, 320–1440px layouts, reduced motion, no-JavaScript content, 404 and safe links.
- Existing Krelyvo Meridian case study links to the demo after website commit `ead5cb5`; Cloudflare website build succeeded and public HTML contains the demo link and updated scope text.

## Automatic deployment verified — 2026-10-24

- GitHub production connection: `Raja6559/meridian-residences`, branch `main`.
- Build command: `bun run build`.
- Deploy command: `npx wrangler deploy --config .output/server/wrangler.json`.
- Build variable: `BUN_VERSION=1.4.2` under Cloudflare Builds settings. The first automatic attempt used Bun 1.2.15 and failed to parse `bun.lock` version 2.
- GitHub check for commit `640beab`: `Workers Builds: krelyvo-demo-meridian` succeeded.
- Cloudflare deployed version `d8a67236-65b4-4ff6-80f4-b4f87c90d5f9` on 2026-10-24, replacing the initial manual version.
- After deployment, the public page and `/images/exterior-1280.webp` returned HTTP 200. The title, fictional concept notice, and `noindex` metadata were present.

Future pushes to `main` trigger the connected Cloudflare production build.
