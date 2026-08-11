# AGENTS.md

## Scope

This repository contains the Talya Dahan Travel project.

Structure:

- `web/` - React + Vite + TypeScript frontend
- `studio/` - Sanity Studio

For the current design phase:

- Work ONLY inside `web/`.
- Ignore `studio/` completely.
- Do not inspect or modify Sanity.
- Do not connect frontend work to Sanity yet.

Sanity integration will be handled later.

---

## Working rules

- Read this file before each task.
- Inspect only files relevant to the requested task.
- Do not modify unrelated files.
- Do not continue into adjacent work.
- Keep changes small and task-focused.
- Do not deploy unless explicitly requested.
- After frontend changes, run `npm run build`.
- Fix only errors caused by the requested change.

Do not recursively inspect:

- `node_modules/`
- `dist/`
- `build/`
- `.sanity/`
- `.cache/`
- `coverage/`
- `.git/`
- generated or temporary files

---

## Brand

Brand name:

`Talya Dahan Travel`

Do not use the old name:

`Talya Travel`

Hebrew brand presentation:

`טליה דהן - טיולי בוטיק`

Supporting line:

`טיולים וחוויות לדתיים ולמסורתיים`

The website sells premium boutique group trips.

It should feel:

- premium
- boutique
- elegant
- warm
- personal
- exciting
- polished
- trustworthy

Luxury should NOT mean dark or heavy.

The site should remain bright, airy and inviting.

---

## Brand colors

Use the existing brand palette consistently:

- Primary blue: `#173B6D`
- Deep blue: `#102A4D`
- Gold: `#C9A15B`
- Soft gold: `#E2C48E`
- Ivory: `#F7F3EA`
- Champagne: `#EFE7D8`
- Light blue-grey: `#EAF1F5`
- Main text: `#243247`
- Secondary text: `#566273`
- Subtle border: `rgba(23, 59, 109, 0.12)`

Rules:

- Blue is the main brand color.
- Gold is an accent only.
- Large backgrounds should usually stay light.
- Do not reintroduce the old green/pink visual language.
- WhatsApp may keep its recognizable green.

---

## Typography

The site is Hebrew-first and RTL.

Use:

- `Suez One` for major section headings and hero headings
- `Heebo` for body text, buttons, forms, labels and smaller headings

Do not use the display font for long text.

Headings should feel distinctive and boutique, not formal or corporate.

---

## Frontend direction

Frontend stack:

- React
- Vite
- TypeScript
- custom CSS

Do not:

- recreate the project
- migrate to Next.js
- add a heavy UI framework
- add dependencies unless clearly necessary

Prefer native React, CSS and browser functionality.

The page is a conversion-focused landing page for ONE specific trip.

Prioritize:

- clear hierarchy
- strong photography
- premium visual quality
- good spacing
- clear CTAs
- trust
- social proof
- mobile quality

Avoid:

- SaaS/dashboard aesthetics
- generic React-template appearance
- excessive cards
- excessive borders
- huge empty spaces
- visually disconnected sections
- dark luxury styling

---

## Responsive

Maintain:

- RTL
- desktop quality
- tablet quality
- mobile quality

Check especially:

- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px+

Requirements:

- no accidental horizontal scrolling
- readable typography
- touch-friendly buttons
- intentional image crops
- sensible stacking on mobile
- floating WhatsApp must not cover important UI

---

## Accessibility

Preserve reasonable accessibility:

- semantic HTML
- real buttons and links
- visible focus states
- useful alt text
- sufficient contrast
- keyboard-accessible controls

Respect `prefers-reduced-motion` when adding motion.

---

## Current media rules

Images:

- local images are allowed during design
- supplied client images are allowed
- final Sanity integration comes later

Videos:

- YouTube and YouTube Shorts are preferred
- do not host large videos directly in the repository
- Shorts should use 9:16 presentation
- autoplay is acceptable only when muted and explicitly requested
- always provide a safe fallback when video data is missing

---

## Footer

Preferred branding:

`טליה דהן - טיולי בוטיק`

Supporting line:

`טיולים וחוויות לדתיים ולמסורתיים`

Preferred footer direction:

- deep blue `#102A4D`
- light text
- subtle gold accents
- minimal and clean

Keep existing useful links and functionality.

---

## Task completion

For every task:

1. Read this file.
2. Inspect only relevant files.
3. Make only the requested change.
4. Preserve unrelated functionality.
5. Run relevant checks.
6. For frontend work, run `npm run build`.
7. Report briefly:
   - files changed
   - what changed
   - build/check result
8. Stop.

For visual tasks, do not stop at "it works".

The result should also look intentional, polished and consistent with the Talya Dahan Travel brand.