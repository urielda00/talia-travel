# AGENTS.md

## Project scope

This repository contains the Talya Travel project.

Current structure:

- `studio/` - Sanity Studio
- `web/` - React + Vite + TypeScript frontend

Always treat the repository root as the main workspace.

## Important working rules

- Read this `AGENTS.md` before starting every task.
- Do not scan, inspect, summarize, or reason over generated dependency folders unless explicitly required.
- Do not recursively traverse large generated directories.
- Prefer targeted inspection of source and configuration files only.
- Do not modify unrelated files.
- Keep changes task-focused.
- Before editing, inspect only the files relevant to the requested task.
- After editing, run only the checks relevant to the changed area unless explicitly asked for broader verification.

## Ignore for code inspection

Do not inspect or recursively search inside:

- `node_modules/`
- `**/node_modules/`
- `dist/`
- `**/dist/`
- `build/`
- `**/build/`
- `.sanity/`
- `**/.sanity/`
- `.cache/`
- `**/.cache/`
- `coverage/`
- `**/coverage/`
- `.git/`
- temporary files
- generated logs

These directories may be used by build tools, but should not be treated as source code.

## Current design phase

The project is currently in a frontend-only landing-page design phase.

For all current frontend tasks:

- Work ONLY inside `web/`.
- Completely ignore `studio/`.
- Do not inspect `studio/`.
- Do not inspect Sanity schemas.
- Do not inspect Sanity queries.
- Do not inspect Sanity content structure.
- Do not connect new frontend work to Sanity.
- Do not let Sanity influence layout or design decisions.
- Hardcoded/mock content is explicitly allowed.
- Temporary/local images are explicitly allowed.
- Temporary/mock media is explicitly allowed.

Sanity integration will be handled only after the landing-page design is fully approved.

The current priority is:

- UI/UX quality
- conversion
- responsive behavior
- visual polish

## Product context

Talya Travel organizes and leads curated group trips from Israel to special and exotic destinations around the world.

The trips are experience-driven and may include:

- carefully planned itineraries
- boutique or quality accommodation
- local experiences
- attractions
- culinary experiences
- transportation and logistics
- group experiences
- personal guidance by Talya
- carefully selected destinations
- strong attention to detail

Each landing page is designed to sell ONE specific trip.

The destination, dates, price, itinerary, images, package details and trip content may change between trips.

The landing-page structure should remain reusable for future trips.

The visitor should feel that this is a carefully designed premium group travel experience, not a generic organized tour.

## Main conversion goal

The landing page has one primary goal:

Encourage the visitor to become interested in the specific trip and take action.

Typical actions may include:

- requesting more information
- contacting Talya
- registering
- reserving a place

Every major section should support the sale of the current trip.

Avoid unrelated browsing paths or website-style distractions.

The page should feel like one continuous conversion-focused landing page.

## Frontend

Frontend lives in:

`web/`

Stack:

- React
- Vite
- TypeScript

Do not recreate the frontend project.

Do not create Next.js.

The frontend is a premium conversion-focused landing page for one specific international group trip.

Frontend priorities:

- exceptional UI/UX quality
- strong conversion flow
- premium travel aesthetic
- mobile-first
- fully responsive
- rich photography
- strong visual storytelling
- elegant Hebrew RTL typography
- clear hierarchy
- strong image crops
- intentional spacing
- repeated but tasteful CTAs
- accessibility
- fast loading
- maintainable React components

The visitor should understand very quickly:

- where the trip is going
- what type of trip it is
- what makes it special
- when it happens
- how long it lasts
- what experiences are included
- what the package includes
- how much it costs
- who Talya is
- why Talya can be trusted
- how to join

Do not introduce a heavy UI framework.

Prefer:

- React
- TypeScript
- custom CSS
- semantic HTML
- native browser functionality

It is acceptable to rewrite or replace existing frontend components and styles when required by the requested design task.

Do not preserve weak existing visual decisions just because they already exist.

## Landing-page UX direction

This must feel like a landing page for ONE trip, not a general travel agency website.

Prioritize:

- immediate understanding of the trip
- emotional excitement
- clear trip information
- visual storytelling
- strong photography
- easy scanning
- clear conversion flow
- trust
- social proof
- repeated opportunities to take action

Avoid:

- large general website navigation
- unrelated destination browsing
- "discover other trips" behavior unless explicitly requested
- magazine-style layouts that hide the actual offer
- excessive artistic composition that reduces clarity
- sections that exist only for decoration
- excessive empty space
- unclear CTAs

A user should not wonder what the page is selling.

## Design direction

Talya Travel should feel:

- premium
- boutique
- warm
- exciting
- experiential
- trustworthy
- photographic
- elegant
- polished
- personal
- conversion-focused

The page should feel like a premium long-form sales landing page for a specific international group trip.

Visual qualities to aim for:

- rich destination photography
- strong hero imagery
- elegant Hebrew typography
- warm colors
- soft premium surfaces
- carefully controlled spacing
- varied section rhythm
- image/text balance
- visual depth
- subtle layering
- intentional crop ratios
- refined buttons
- strong mobile design

Avoid:

- SaaS/dashboard aesthetics
- generic corporate layouts
- generic React template appearance
- table-like UI
- excessive generic cards
- wireframe-looking sections
- repetitive grids everywhere
- unnecessary borders
- excessive shadows
- huge meaningless whitespace
- excessive pill-shaped UI
- visually disconnected sections
- overly experimental typography
- design that looks more like a magazine homepage than a trip landing page

## Visual reference

The client likes the landing-page structure and visual level of:

`https://womentravel.co.il/secretforest-october/`

Use this reference strongly for:

- landing-page flow
- section density
- typography hierarchy
- image/text rhythm
- CTA frequency
- conversion structure
- long-form page pacing
- responsive behavior
- premium visual level

Do NOT reuse or copy:

- third-party branding
- logos
- text
- photographs
- copyrighted assets

Use Talya Travel branding and original / supplied assets.

The goal is to reach a similar level and landing-page style while keeping the Talya Travel page its own product.

## Typography

The site is Hebrew-first and RTL.

Typography should be:

- readable
- premium
- expressive where appropriate
- clean in body content

Use strong hierarchy between:

- eyebrow text
- main page headings
- section headings
- body content
- metadata
- CTA text

Avoid:

- too many competing font styles
- giant headings that dominate without purpose
- poor Hebrew line breaks
- text blocks that are too wide
- low contrast
- excessive decorative typography

Special emphasis typography may be used sparingly for selected accent phrases.

It should remain elegant and readable.

## Images

Photography is a major part of the product.

During the current design phase:

- local/mock images may be used
- supplied Talya/client images may be used
- final production images will later be hosted through Sanity

Layouts should support:

- landscape images
- portrait images
- editorial mosaics
- responsive crops
- mobile-specific crops where necessary

Image composition should feel intentional.

Avoid:

- stretched images
- awkward crops
- repeated use of the same image without reason
- images dominating sections unintentionally
- tiny image grids that lose visual impact

Use lazy loading for below-the-fold images where appropriate.

## Video

Preferred video source:

- YouTube
- YouTube Shorts

Do not host large videos in the repository.

Do not upload large video files to Sanity.

Shorts should visually use vertical 9:16 presentation.

When implementing real video behavior:

- use preview/poster first
- do not autoplay
- do not load YouTube iframe before user interaction when practical
- lazy-load media
- keep mobile performance in mind

## Mobile-first requirements

Mobile quality is critical.

Do not simply shrink desktop layouts.

Design intentionally for small screens.

At minimum, frontend work should consider:

- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px+

Mobile requirements:

- no accidental horizontal scrolling
- readable typography
- balanced vertical spacing
- strong image crops
- touch-friendly buttons
- comfortable accordion controls
- clear CTA hierarchy
- good Shorts/media behavior
- no oversized images consuming unnecessary screen height
- floating WhatsApp must not obscure important UI

Intentional horizontal scrolling is acceptable only for components such as:

- Shorts
- testimonials
- explicitly designed media carousels

## Accessibility

Maintain reasonable accessibility throughout frontend work.

Prefer:

- semantic HTML
- real buttons for actions
- real links for navigation
- keyboard-accessible controls
- visible focus states
- useful alt text
- sufficient contrast
- accessible accordion behavior

Respect:

`prefers-reduced-motion`

Do not add motion that is required to understand content.

## WhatsApp

The floating WhatsApp action should:

- use a recognizable WhatsApp icon
- look polished
- remain accessible
- work on desktop and mobile
- respect mobile safe areas
- not cover important CTAs or form controls

Do not use fake text glyphs as the WhatsApp icon.

## Social icons

Social icons should:

- be recognizable
- be visually consistent
- use correct platform symbols
- have consistent sizing and spacing
- include hover/focus states where appropriate

Avoid mismatched or fake-looking icons.

## Footer

The footer should be minimal and appropriate for a focused landing page.

It may include:

- Talya Travel branding
- social links
- WhatsApp
- email
- minimal navigation
- copyright

Do not build a large multi-column corporate footer unless explicitly requested.

The final CTA, contact section and footer should visually flow together.

## Sanity project

Sanity Studio lives in:

`studio/`

For the CURRENT design phase:

- ignore it completely during frontend tasks

Do not:

- inspect it
- modify it
- change schemas
- change datasets
- change project ID
- deploy it

Later, after the frontend is approved, editable frontend content will be mapped to Sanity in a separate phase.

At that future stage:

- client controls content, not visual layout
- avoid page-builder flexibility
- keep editing simple
- keep code identifiers in English
- Hebrew labels are preferred in Studio
- prefer minimal developer maintenance

## Dependencies

- Do not add dependencies unless clearly necessary.
- Prefer built-in React/CSS/browser capabilities.
- Do not introduce a heavy UI framework.
- Explain any new dependency before adding it when the task does not explicitly require one.

## Git hygiene

Never commit:

- secrets
- `.env` files
- `node_modules`
- build output
- Sanity generated/cache output

Respect the root `.gitignore`.

Do not deploy unless explicitly requested.

## Task execution style

For every task:

1. Read `AGENTS.md`.
2. Inspect only the files relevant to the requested task.
3. State a short implementation plan.
4. Make only the requested changes.
5. Do not continue into adjacent work.
6. Run relevant validation checks.
7. Fix errors caused by the task.
8. If visual work was requested, inspect the rendered result at the relevant responsive widths.
9. Report:
   - files created
   - files modified
   - checks run
   - results
10. Stop after the requested task.

Do not continue into another task without being asked.

## Visual task completion standard

For UI/UX tasks, functional correctness alone is not enough.

Before considering a visual task complete, check:

- Does the section look professionally designed?
- Does it support the sale of the current trip?
- Is the hierarchy obvious?
- Is the photography used effectively?
- Is whitespace intentional?
- Is the CTA clear?
- Does the section fit the visual language of the whole page?
- Does mobile feel intentionally designed?
- Is anything still generic, awkward or unfinished?

If a requested section visibly fails these checks, refine it before stopping.