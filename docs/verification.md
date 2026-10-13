# Task 2 verification — 2026-10-13

- TypeScript: passed (`bun run typecheck`).
- Production build: passed (`bun run build`), producing the Cloudflare Worker and public assets.
- Browser suite: 13/13 passed against local Wrangler production output at port 8087.
- Initial development interaction tests were red against the scaffold; implementation made them green.
- Layout checks cover 320, 390, 430 and 1440px. Desktop and mobile screenshots were visually inspected: headline and image crops intact, no horizontal overflow or notice/navigation collision.
- Viewing dialog: focus containment/restoration, Escape, repeated opening, no fields and no outgoing submission requests.
- Gallery: previous/next, keyboard wraparound, provenance captions, Escape and originating-thumbnail focus restoration.
- Mobile menu: expanded state, Escape and anchor navigation.
- Static recovery: JavaScript disabled, motion chunk blocked, reduced motion, desktop-to-mobile reset.
- Noindex, concept disclosures, safe links and HTTP 404 verified.
- Independent read-only code review found no actionable issues; reviewer did not independently execute tests.

## Loading evidence

Six large 1280px WebP assets range from 68 to 124 KiB. Small 640px variants range from 24 to 39 KiB. Hero transfer was 69,162 bytes in the local production inspection; initial JS bundles were about 108 KB and 18 KB compressed, with GSAP and ScrollTrigger in separate chunks. Fonts are self-hosted. Below-fold imagery is lazy-loaded and dimensions are reserved. These are local transfer observations, not field Core Web Vitals or a real-network performance score.

## Resolved verification issues

- The first image test incorrectly required hidden desktop-only lazy images to load on mobile. It now visits and validates every visible image; hidden redundant stage images may remain unloaded.
- Generic Vite preview expected dist/server/server.js, while this established Nitro build writes .output/server. The preview script now runs Wrangler 4.149.0 locally against the generated Worker config. All 13 checks pass using that runtime.
- On the public Cloudflare URL, the platform injects a `/cdn-cgi/rum` performance beacon. The no-submission test excludes only that exact infrastructure endpoint; all other non-GET requests still fail the test. This beacon is not an application enquiry or personal-data form.

## Task 4 public verification

Public deployment, HTTPS/custom domain, GitHub repository and the live case-study link were completed on 2026-10-13. The public suite passed 13/13 after excluding only Cloudflare’s injected RUM endpoint from the no-application-submission assertion. Cloudflare GitHub auto-build connection remains pending; see publishing.md.
