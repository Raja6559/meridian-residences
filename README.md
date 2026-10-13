# Meridian Residences

A standalone fictional residential concept by Krelyvo Studio. Architectural editorial styling, an original reference exterior and five AI-generated supporting photographs. This is a portfolio demo, not a live property website.

## Local development

Run in `D:\Raja\Business Work\Krelyvo Studio\portfolio-demos\meridian-residences`:

```powershell
bun install --frozen-lockfile
bun run dev
```

Open http://127.0.0.1:8086. Use Bun 1.4.2 (the lockfile needs a compatible version).

```powershell
bun run typecheck
bun run test
bun run build
```

The tests use installed Google Chrome via Playwright. `bun run images` regenerates the responsive WebP files from assets/source using Sharp. After building, `bun run preview` serves the Cloudflare output locally at http://127.0.0.1:8087 using Wrangler. Vite’s generic preview expects a different server output location and is not used. To test this production preview in PowerShell, run `$env:DEMO_BASE_URL = 'http://127.0.0.1:8087'` before `bun run test`.

## Structure

- `src/routes`: server-rendered page, metadata and error/404 states.
- `src/components`: image renderer, navigation, gallery, viewing preview and progressive scroll sequence.
- `src/data/images.ts`: six image descriptions, names and provenance labels.
- `assets/source`: original reference and generated sources, not served directly.
- `public/images`: responsive 640/1280 WebP variants.
- `docs/design.md`: approved direction and scope.
- `docs/imagery.md`: prompts and provenance.
- `tests/experience.spec.ts`: interactions, layouts, reduced motion, animation failure, safe links and noindex.

## Concept boundaries

No form, booking, contact details, analytics integration, property specifications or personal data collection. The viewing journey is illustrative. Supporting interiors do not claim to be verified rooms of a real development. The gallery labels generated imagery. Content remains readable without animations; mobile and reduced-motion layouts do not use sticky choreography.

## Later publishing task

This repository is local only until publishing is separately requested. Build output is `.output/public` and `.output/server/wrangler.json`. The Worker configuration has a distinct provisional name, `krelyvo-demo-meridian`, with no domain route yet.

The planned domain is `demo-meridian.krelyvo.com`. In Cloudflare Builds, use `BUN_VERSION=1.4.2`, build command `bun run build`, and deploy command `npx wrangler deploy --config .output/server/wrangler.json`. Verify public HTTPS, noindex and interactions before linking the existing Krelyvo case study. No homepage preview section is included.
