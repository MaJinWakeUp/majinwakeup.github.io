# Publications filter

Publications lists the bibliography from `assets/ref.bib`. The filter field hides entries whose text does not contain the query. It does not edit the bibliography.

## Sub-features

- `pub-all` shows the unfiltered list, including DisPatch and the survey paper.
- `pub-match` keeps entries that contain the query.
- `pub-clear` restores the hidden entries when the field is emptied.

## How to get to it (user POV)

- Choose `Publications` in the header.
- Open `/publications/`.
- Type in the field labeled `Filter publications by title, author, or year`.

## Driving it with verify-academic-site

Preconditions:

- `doctor` reports `listener: owned`.

- **Open.** Open the page. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs open /publications/`. The heading is present. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id publications --text "Publications"`.
- **Match.** Type `DisPatch`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs fill --label "Filter publications by title, author, or year" --value "DisPatch"`. The visible list contains `DisPatch` and does not contain `Deep transfer learning for intelligent vehicle perception`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs text --id pubList`.
- **Proof.** Capture while `DisPatch` is still the query, before clearing it. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs snapshot --path publications/dispatch.aria.txt` and `node .cursor/skills/verify-academic-site/scripts/verify.mjs screenshot --path publications/dispatch.png`. The screenshot shows `DisPatch` in the filter and in the list.
- **Clear.** Empty the field. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs fill --label "Filter publications by title, author, or year" --value ""`. The visible list contains `Deep transfer learning for intelligent vehicle perception` again.

## Gotchas

- Filtering sets `display: none` on non-matching `[data-pub-searchable]` rows. `textContent` still includes them. `text` uses `innerText`, which does not.
- The query is not written to the URL or to `localStorage`. A reload shows the full list.
- The field `aria-label` is `Filter publications by title, author, or year`. The placeholder is `Filter by title, author, or year...`.
