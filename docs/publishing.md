# Meridian publishing record — 2026-10-13

- Repository: https://github.com/Raja6559/meridian-residences (public, main).
- Worker: `krelyvo-demo-meridian` in Krelyvo’s Cloudflare account.
- Custom domain: https://demo-meridian.krelyvo.com/.
- First manually deployed version: `25485605-bda3-4598-b073-a397791d4cf7`.
- Public root: HTTP 200, headline and fictional notice rendered, noindex metadata present. Hero asset: HTTP 200.
- Public browser suite: 13/13 passed across interactions, 320–1440px layouts, reduced motion, no-JavaScript content, 404 and safe links.
- Existing Krelyvo Meridian case study links to the demo after website commit `ead5cb5`; Cloudflare website build succeeded and public HTML contains the demo link and updated scope text.

## Automatic deployment connection still to complete

The Cloudflare GitHub app previously had selected-repository access. Add `Raja6559/meridian-residences` without removing existing repositories in GitHub’s Cloudflare installation settings. Then open the `krelyvo-demo-meridian` Worker settings in Cloudflare and connect the new repository to production branch `main`, repository root `/`.

Build settings:

- Build command: `bun run build`
- Deploy command: `npx wrangler deploy --config .output/server/wrangler.json`
- Build variable: `BUN_VERSION=1.4.2`
- Preview builds: disabled

Push a fresh documentation-only commit after connection and confirm a successful `Workers Builds: krelyvo-demo-meridian` check. A GitHub push alone currently does not update the live Worker. Do not claim automatic deployment is verified until this check succeeds.

2026-10-13: Raja confirmed the connection settings were saved. This documentation change is the first fresh push to test whether the Cloudflare build starts and completes automatically.

2026-10-14: The first trigger commit had no GitHub build check and created no new Worker version. Raja confirmed the repository is visible in the Worker connection settings. A second documentation-only push now tests the saved connection after that confirmation.

2026-10-14: The GitHub connection triggered a production build, but Cloudflare selected Bun 1.2.15 and could not parse the Bun 1.4 lockfile. Raja set BUN_VERSION=1.4.2 under Builds → Build variables and secrets. This commit tests the corrected build environment.

