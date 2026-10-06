# Site search

The navbar search opens an overlay and filters `assets/search.json`. It does not change page content outside the overlay.

## Sub-features

- `search-open` opens the overlay from the navbar button.
- `search-match` lists pages whose title or body contains the query.
- `search-miss` says when nothing matches.
- `search-close` clears the overlay on Escape.

## How to get to it (user POV)

- Choose the button labeled `Search site` in the navbar.
- Press Ctrl+K or Command+K.

## Driving it with verify-academic-site

Preconditions:

- `doctor` reports `listener: owned`.
- A page is open. `open /` is enough.

- **Open.** Choose search. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs click --label "Search site"`. The overlay class contains `open`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs attr --id searchOverlay --name class`.
- **Match.** Type `Teaching`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs fill --label "Search pages" --value "Teaching"`. Wait for the result. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id searchResults --text "Teaching"`.
- **Proof.** Capture while `Teaching` is still the query. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs screenshot --path site-search/teaching.png`. The shot shows the overlay and a Teaching result.
- **Miss.** Replace the query with `zzznomatch`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs fill --label "Search pages" --value "zzznomatch"`. The results say `No results for "zzznomatch"`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id searchResults --text "No results"`.
- **Close.** Press Escape. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs press --key Escape`. The overlay class no longer contains `open`, and the field is empty. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id searchOverlay --attr class --lacks open` and `node .cursor/skills/verify-academic-site/scripts/verify.mjs attr --id searchInput --name value`.
- **Keyboard open.** Press Ctrl+K. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs press --key k --mod ctrl`. The overlay class contains `open` again. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs attr --id searchOverlay --name class`.

## Gotchas

- Results wait 150ms after the last keystroke, then fetch `/assets/search.json`. Wait for `#searchResults` text instead of reading it immediately.
- Closing the overlay clears the field. A later recipe that needs an empty search should click `Search site` again or reload.
- The index is the built `assets/search.json`. A page missing from that file cannot be found here even if it is linked in the nav.
