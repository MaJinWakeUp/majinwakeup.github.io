# Academic site verification map

This directory is the maintained source for verifying the reader-facing pages. Read the index before driving the site, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch with `node .cursor/skills/verify-academic-site/scripts/verify.mjs launch` and export `ACADEMIC_SITE_VERIFY_DIR`.
- Run `doctor` and require `listener: owned`, HTTP 200, and a page that contains `Jin Ma`.
- Chrome uses a fresh profile inside that directory. No theme is saved yet.
- The serve destination is inside the run directory. Do not drive port 4000 unless this run bound it.

## Driving conventions

- Start every recipe from a fresh profile unless its preconditions say otherwise.
- Prefer ids and `aria-label`s over CSS position.
- Treat every command as literal.
- Read publication rows with `text`, which uses `innerText`. Hidden rows stay in the DOM.
- Do not remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an accessibility snapshot and a screenshot.
- Dark-mode proof includes `storage --key theme` and `data-bs-theme`.
- Record the feature file and the entry point with the artifacts.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the reader-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with verify-academic-site`
4. `Gotchas`

## Features

- [Home](./home.md) covers the hero and the section nav.
- [Publications filter](./publications.md) covers the bibliography search field.
- [About, teaching, and service](./pages.md) covers the three content pages.
- [Site search](./site-search.md) covers the navbar search overlay.
- [Dark mode](./dark-mode.md) covers the theme toggle and its saved choice.
