# Meridian implementation plan

Goal: implement the approved architectural editorial concept in docs/design.md.
Execution: inline, as requested by starting Task 2. No publishing in this task.
Architecture: TanStack Start renders the page and metadata; isolated React components manage the gallery, viewing dialog and mobile navigation. GSAP enhances a static, accessible document.

## Constraints
- Separate repository; no edits to existing Krelyvo websites.
- Limestone #E9E7E0, ink #202D30, Sora and Inter.
- Six images: source exterior plus five generated supporting scenes.
- Fictional disclosure, no enquiries, no invented property facts, noindex.
- Visible static content; reduced motion and mobile use a vertical architectural sequence.

## Build tasks
1. Foundation and images: package.json, Vite/TS configuration, image optimization script, asset manifest. Generate five images; inspect and save source plus compressed 640/1280 WebP assets. Check image existence and sizes.
2. Experience: routes/__root.tsx and index.tsx, photo, navigation, gallery, viewing and sequence components, styles.css. Browser tests first specify gallery wrapping/keyboard/focus, viewing non-submission, mobile menu and viewport layout. Run them against a minimal route to verify failure, then implement.
3. Motion and verification: use-motion.ts progressively adds desktop image transitions and brief entrances. Test reduced motion, blocked motion chunk, resizing, 320/390/430/1440 layouts, noindex and 404. Run TypeScript and production build; inspect screenshots and asset transfers.
4. Handover: README, imagery provenance/prompts, verification record and local preview. Commit the isolated repo after checks. Public GitHub and Cloudflare setup remains a later task.

## Review focus
- Early clicks before hydration: disable only interactive buttons until handlers attach.
- Gallery wraparound, Escape and focus restoration must work repeatedly.
- Long mobile navigation and 320px width must not collide with the notice.
- JS/motion failure must not hide the signature sequence.
- Preview interactions must never submit personal data or open contact actions.

## Progress
- Planning: complete. Source reference inspected; generation uses built-in image tool.
- Foundation and imagery: complete. Isolated repo, five generated sources and twelve optimized variants.
- Experience: complete. Gallery, navigation, viewing preview and full page implemented.
- Verification: complete. TypeScript/build passed; 13 production-runtime browser checks passed. See verification.md.
- Ruling: use Wrangler for production preview because Vite expects a different output layout; no deployment performed.
- Final review: independent static review, no actionable findings.
