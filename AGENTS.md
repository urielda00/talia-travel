# AGENTS.md

## Project

This repository contains the Talia Dahan Travel website.

Structure:

- `web/` - React + Vite + TypeScript production frontend
- `studio/` - Sanity Studio

The landing page design is finished and approved.

---

## Most important rule

The current visual design of `web/` is LOCKED.

Sanity is being added only as a content management system.

Content may become dynamic, but the website must continue to look and behave exactly like the current finished implementation.

Do not redesign, restyle, simplify, restructure, or reinterpret the frontend.

Preserve:

- existing DOM/layout structure whenever possible
- CSS classes
- spacing
- typography
- colors
- image positions and crops
- responsive behavior
- animations
- section order
- button appearance
- form appearance and behavior
- desktop and mobile composition

A Sanity integration must adapt to the existing design.
The design must never adapt to Sanity.

---

## Working rules

For every task:

1. Read this file first.
2. Inspect the existing code relevant to the requested task.
3. Make only the requested change.
4. Do not continue into adjacent sections or future tasks.
5. Do not modify unrelated files.
6. Do not deploy unless explicitly requested.
7. Preserve existing functionality unless the task explicitly changes it.
8. Keep each task isolated and complete.
9. Stop when the requested task is complete.

Do not recursively inspect generated folders:

- `node_modules/`
- `dist/`
- `.sanity/`
- `.git/`
- `coverage/`
- temporary/generated files

---

## Frontend source of truth

The currently rendered landing page in `web/` is the visual source of truth.

There are older Sanity-aware frontend components and queries in the repository.
Do not replace the finished landing page with them unless explicitly instructed.

They may be inspected for reusable technical utilities, but they are not authoritative for layout, content structure, or design.

---

## Sanity direction

The existing Sanity installation and project configuration may be preserved.

The old content schemas are not authoritative.
The content model is being rebuilt according to the finished landing page.

Sanity should control content only.

Do not expose design controls such as:

- colors
- fonts
- spacing
- sizes
- layout
- columns
- CSS classes
- component selection
- section order

The client is non-technical.

Studio must therefore be:

- Hebrew-first
- clear
- simple
- descriptive
- organized by logical website sections
- free of unnecessary technical fields

Use clear Hebrew field titles and short Hebrew descriptions where useful.

Do not require the client to enter image alt text.

When a section has a fixed number of visual slots, preserve that fixed number unless the task explicitly says otherwise.

---

## Media

Images and short videos may be managed through Sanity when requested.

Replacing media must not change the existing frontend dimensions, aspect ratios, crops, or layout.

Do not move fixed branding assets such as the logo into Sanity unless explicitly requested.

---

## Brand

Brand name:

`Talia Dahan Travel`

Hebrew presentation:

`טליה דהן - טיולי בוטיק`

Supporting line:

`טיולים וחוויות לדתיים ולמסורתיים`

The site is Hebrew-first and RTL.

---

## Verification

For `web/` changes:

- run `npm run build` inside `web/`
- fix only errors caused by the requested task

For `studio/` changes:

- run the relevant Sanity build/check available in `studio/`
- fix only errors caused by the requested task

At completion report briefly:

- files changed
- what changed
- verification result

Then stop.