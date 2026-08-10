# AGENTS.md

## Project scope

This repository contains the Talia Travels project.

Current structure:
- `studio/` - Sanity Studio
- frontend will be added later

Always treat the repository root as the main workspace.

## Important working rules

- Do not scan, inspect, summarize, or reason over generated dependency folders unless explicitly required.
- Do not recursively traverse large generated directories.
- Prefer targeted inspection of source and configuration files only.
- Do not modify unrelated files.
- Keep changes small and task-focused.
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

The frontend will later use React + Vite and Netlify.

Until frontend work is explicitly requested:
- Do not create Next.js.
- Do not create frontend code.
- Do not install frontend libraries.

## Dependencies

- Do not add dependencies unless clearly necessary.
- Prefer built-in Sanity/React capabilities.
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

1. Inspect only relevant files.
2. State a short implementation plan.
3. Make the smallest correct change.
4. Run relevant validation/build checks.
5. Fix errors caused by the change.
6. Report:
   - files created
   - files modified
   - checks run
   - results
7. Stop after the requested task.

Do not continue into adjacent tasks without being asked.

## Product direction

This is a premium boutique travel landing page.

Priorities:
- premium visual experience
- fast loading
- mobile-first
- simple content management
- minimal ongoing developer maintenance
- media should be handled efficiently

For video:
- prefer externally hosted YouTube / YouTube Shorts content
- Sanity should store references/URLs, not large video files
- frontend should later lazy-load video embeds