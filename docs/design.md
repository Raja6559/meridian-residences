# Meridian Residences — Task 1 design and motion specification

Date: 2026-10-13
Status: Design direction and supporting AI imagery selected by Raja. Specification ready for review. Website implementation and image generation belong to Task 2.

## Purpose and scope

Create a standalone, single-page fictional residential concept for Krelyvo’s portfolio. Preserve Meridian’s existing identity and source exterior photograph. The experience should demonstrate thoughtful property presentation, accessible interactions and restrained motion without suggesting a real property launch.

Design read: an architectural editorial portfolio experience for prospective property and design clients, using limestone, ink and generous negative space.

This document is the only Task 1 deliverable. Do not change Krelyvo’s homepage, existing case study or other demos. Publishing and linking the case study happen after implementation and verification.

## Visual system

- Limestone background: #E9E7E0. Ink: #202D30. Deep overlay: #152124. Pale text: #F1EFE8.
- Preserve the spaced uppercase MERIDIAN / RESIDENCES wordmark.
- Sora headings and Inter body copy, self-hosted with font-display: swap.
- Structured sans-serif typography, asymmetric editorial grids, fine rules and square or minimally rounded image frames. Avoid repeating feature-card grids.
- Keep type readable at 320px, use fluid sizing without clipped lines, and use ink or pale backgrounds for copy rather than relying on photography for contrast.
- Maximum content width around 1440px, with responsive gutters and generous but bounded spacing.

## Page journey

### 1. Concept notice and navigation

Visible notice: “Fictional residential concept by Krelyvo Studio.”

Navigation: Architecture, Living Spaces, Gallery, and “Preview a viewing”. Keep the notice in normal document flow above the navigation. Sticky navigation must not overlap content; anchors account for its height. On small screens, retain the wordmark and an accessible menu control with expanded state, Escape dismissal and focus restoration.

### 2. Hero

Headline: “Space for what comes next.”

Supporting copy: “Considered architecture. Light-filled spaces. An exploration of the everyday moments that make a place feel like home.”

Actions: “Explore the spaces” anchors to the living-space section; “Preview a viewing” opens the preview dialog.

Use the existing exterior photograph as a large architectural frame. Place the headline on limestone above or beside the frame, allowing the building to remain visible. On mobile, stack copy and image and select a crop that preserves the villa and pool. Do not force all hero content into one viewport.

### 3. Architectural philosophy

Heading: “Give the space room to speak.”

Short fictional design narrative about natural light, material contrast and the relationship between inside and outside. Pair with the material-detail image. Describe visual intentions rather than construction guarantees, sustainability certifications or real specifications.

### 4. Living spaces

Heading: “Room for your everyday.”

Three editorial image-and-copy entries: Living, Gathering, Rest. Use the living-room, dining and bedroom imagery respectively. Each entry includes a brief description of the design direction, not a unit listing or amenity promise.

### 5. Signature architectural sequence

Heading: “From the setting to the everyday.”

Three moments: The setting (original exterior), The light (living room), The pause (terrace). On desktop, an adjacent sticky image composition changes as the corresponding text enters view. Preserve native scrolling and keep all text in normal flow. Images must have meaningful descriptions independent of animation.

At widths below 1024px, display each image with its text vertically. Reduced-motion mode uses the same static arrangement. No scroll interception, horizontal scroll requirement, parallax or prolonged pinned section.

### 6. Gallery

Heading: “A closer perspective.”

Asymmetric gallery using all six images. Each thumbnail opens an accessible image-preview dialog with caption, close button and previous/next controls. Support Escape, focus containment/restoration, keyboard controls and visible focus. Do not auto-advance. Label generated images “AI-generated concept image”; label the source exterior “Concept reference image”.

### 7. Viewing preview and footer

Heading: “Imagine your next chapter.”

Preview dialog explains: explore the spaces → discuss your interests → arrange a viewing. State clearly that this is an illustrative journey and no real viewing can be booked. Include no fields, submissions, requests, phone numbers or messaging links.

Footer repeats the fictional-concept disclosure and links to https://krelyvo.com/work/meridian-residences.

## Image direction

Retain the existing source: krelyvo-studio-website/src/assets/concept-real-estate.jpg. It depicts a contemporary glass-and-concrete villa, pool, warm interior light and a blue-hour setting. Preserve its existing provenance; do not invent a license attribution.

Generate five coordinated supporting images during Task 2:

1. Living room — full-height glazing, pale stone, warm timber, restrained furniture and soft late-day light.
2. Dining space — architectural dining area with a timber table, neutral upholstery and an outlook compatible with the exterior.
3. Bedroom — calm neutral materials, generous glazing and subtle warm lighting.
4. Terrace — sheltered outdoor seating near water, pale stone and the same blue-hour atmosphere.
5. Material detail — close architectural composition of stone, timber and a glazing junction.

Use the exterior as a visual reference. Supporting images are imagined design interpretations, not verified rooms or a guaranteed spatial reconstruction. Avoid people, branding, generated text and implausible structural details. Record generation prompts and provenance; regenerate obvious inconsistencies before use.

Prepare responsive WebP sizes around 640, 1280 and, when justified for the hero, 1920 pixels. Target roughly 200 KB or less per 1280px image, subject to visible quality. Reserve dimensions, prioritize only the hero and lazy-load below-fold imagery. Do not ship full-resolution source PNGs to visitors.

## Motion and accessibility

- One gentle hero entrance; brief opacity/translation reveals for later sections.
- GSAP only for coordinated reveals and the signature sequence, loaded separately.
- Content is visible by default and remains usable if animation code fails.
- Reduced motion disables scroll choreography, animated reveals and smooth scrolling.
- Native links, semantic headings, skip link, descriptive alt text and visible keyboard focus.
- Dialogs use an accessible primitive with focus containment, Escape and trigger-focus restoration; opening one dialog must not leave another active beneath it.
- Motion is decorative; no information depends on completing an animation.

## Implementation boundaries for Task 2

Working folder: D:/Raja/Business Work/Krelyvo Studio/portfolio-demos/meridian-residences.

Use the established React, TypeScript, Tailwind and TanStack Start/Cloudflare approach from Ember & Oak. Keep the implementation in its own repository. Reuse implementation patterns, not Ember’s restaurant identity or content. Keep page sections, image rendering, dialogs, gallery state and motion setup understandable as separate components.

No backend, database, analytics integration, personal-data collection, real enquiry delivery or booking system. No floor plans, prices, addresses, availability, review claims, awards or property dimensions in this version.

Include noindex metadata in the build from the start. A later publishing task will configure demo-meridian.krelyvo.com, a distinct Worker and Git connection. Use the project-compatible Bun version in Cloudflare Builds; do not rely on its older default. Do not change deployment settings during Task 1.

## Verification and completion criteria

- Check 320, 390, 430 and 1440px layouts: no overflow, clipped headlines, overlapping navigation or misleading image crops.
- Check all anchors, mobile menu, gallery controls and viewing triggers with mouse and keyboard.
- Verify dialog focus containment, Escape and restoration, including repeated opening and closing.
- Verify reduced motion, failed-animation fallback, desktop sequence and resizing back to mobile.
- Confirm no personal-data fields or application submission requests, concept disclosures and image labels, noindex metadata, and unknown-route handling.
- Run TypeScript checks, focused browser tests and a production build. Review image transfer sizes and loading before claiming performance is satisfactory.
- Publishing verification later checks HTTPS, public content and the existing case-study link before adding the demo link to Krelyvo.

## Next task

Task 2 — Build Meridian Residences and generate its five supporting concept images.
Recommended model: Sol · High.
