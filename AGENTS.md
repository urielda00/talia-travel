# AGENTS.md

## Project scope

This repository contains the Talia Travels project.

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

The project is currently in a frontend-first visual design phase.

The immediate goal is to create an excellent standalone boutique travel landing page before deciding which content will later be editable through Sanity.

During this phase:

- visual quality takes priority
- frontend content may be hardcoded/mock content
- do not let the Sanity schema dictate the visual composition
- do not modify Sanity schemas unless explicitly requested
- do not spend time wiring new UI sections to Sanity
- do not remove the existing Sanity integration, but it does not need to drive the redesigned page yet
- when necessary, isolate or temporarily bypass existing Sanity-driven rendering cleanly rather than deleting the integration

Only after the visual design is approved will editable content be mapped back to Sanity.

## Sanity project

Sanity Studio lives in:

`studio/`

Important:

- Do not recreate the Sanity project.
- Do not change the Sanity project ID or dataset unless explicitly requested.
- Do not deploy unless explicitly requested.
- Keep schemas modular.
- Keep code identifiers in English.
- Hebrew labels are preferred in the client-facing Sanity Studio.
- The client should control content, not visual layout.
- Avoid page-builder style flexibility.
- Prefer a simple self-service CMS that requires minimal developer maintenance after handoff.

## Frontend

Frontend lives in:

`web/`

Stack:

- React
- Vite
- TypeScript

The current task is to build a new standalone landing page from scratch.

Frontend priorities:

- exceptional UI/UX quality
- premium boutique travel aesthetic
- mobile-first
- fully responsive
- rich photography
- strong visual storytelling
- elegant Hebrew RTL typography
- custom layout and composition
- accessibility
- fast loading
- maintainable React components

Do not use the existing page as the visual foundation.

It is acceptable to replace or rewrite existing frontend components and styles when necessary.

Do not introduce a heavy UI framework.
Prefer React, TypeScript and custom CSS.

## Design direction

Talia Travels should feel:

- premium
- boutique
- feminine
- warm
- editorial
- travel-focused
- photographic
- elegant
- custom-designed rather than template-based

Avoid:

- SaaS/dashboard aesthetics
- table-like UI
- excessive generic cards
- wireframe-looking layouts
- repetitive section structures
- unnecessary borders
- excessive whitespace without compositional purpose
- copying another website one-to-one

The client likes the visual richness and level of:
`https://womentravel.co.il/secretforest-october/`

Use it only as a quality/style reference.
Do not duplicate its exact layout, typography, assets, copy, or composition.

## Media

Images:

- final production images will be hosted through Sanity
- during the visual design phase, temporary/local/mock images may be used where required
- layouts must support responsive image crops
- photography should be a major part of the visual experience

Video:

- prefer YouTube and YouTube Shorts
- Shorts should visually use vertical 9:16 presentation
- do not host large videos in the repository or Sanity
- embeds should eventually be lazy-loaded
- do not load YouTube iframes before interaction when implementing production media behavior

## Dependencies

- Do not add dependencies unless clearly necessary.
- Prefer built-in React/CSS/browser capabilities.
- Explain any new dependency before adding it when the task does not explicitly require one.

## Git hygiene

Never commit:

- secrets
- `.env` files
- `node_modules`
- build output
- Sanity generated/cache output

Respect the root `.gitignore`.

## Task execution style

For each task:

1. Read `AGENTS.md`.
2. Inspect only relevant files.
3. State a short implementation plan.
4. Make the requested change.
5. Run relevant validation/build checks.
6. Fix errors caused by the change.
7. Report:
   - files created
   - files modified
   - checks run
   - results
8. Stop after the requested task.

Do not continue into adjacent tasks without being asked.