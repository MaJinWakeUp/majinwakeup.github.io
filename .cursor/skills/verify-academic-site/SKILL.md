---
name: verify-academic-site
description: "Drive Jin Ma's academic Jekyll site the way a reader does — home, publications filter, about, teaching, service, site search, and dark mode — and keep screenshots plus page state as proof. Use when a page, nav item, publication list, or theme change has to be shown working."
---

# Verify the academic site

The site is a Jekyll site. A reader uses Home (`/`), About (`/about/`), Publications (`/publications/`), Teaching (`/teaching/`), and Service (`/service/`). This skill builds an isolated copy, serves it, drives it with headless Chrome, and stores proof under the run directory.

The feature map in `features/` is the source for what to drive. A proof that opens only the home page is incomplete when the map lists other pages.

## Launch

From the repo root:

```bash
eval "$(node .cursor/skills/verify-academic-site/scripts/verify.mjs launch)"
```

That runs `bundle exec jekyll serve --host 127.0.0.1 --port <free> --destination <run>/site` on a port at or above `4010`, waits until `http://127.0.0.1:<port>/` returns HTTP 200 and a body that contains `Jin Ma`, and prints `export ACADEMIC_SITE_VERIFY_DIR=...`. The build goes to that run directory, not the checkout's `_site/`. Pass `--port` only when a specific free port is required. Pass `--dir` to choose the run directory; the default is `/tmp/academic-site-verify/<run-id>`.

Ready means that HTTP response, not a fixed sleep. The log is `$ACADEMIC_SITE_VERIFY_DIR/dev.log`. A first build can take a while because `jekyll-scholar` renders `assets/ref.bib`. The server's start time is stored in `state.json` before that file says the run is running, so `stop` can clean up an interrupted launch. Chrome's start time is stored the same way.

Two serves can run at once when they use different ports and destinations. Do not pass port `4000` if a server this run did not start is already there. `doctor` refuses a port whose listener is outside this run's process tree.

Ruby, Bundler, and the Gemfile gems are required. Driving the page requires `google-chrome` on `PATH`, or `CHROME_PATH`. `launch` prints a single-quoted `export` so a `--dir` with spaces is preserved by `eval`. `doctor` identifies the listener with `lsof` when it is installed, and otherwise reads Linux `/proc`. `stop` signals a pid only when `ps` still reports the start time recorded at launch. That start time stays put if Bundler replaces itself. A second `stop` does nothing.

## Doctor

```bash
node .cursor/skills/verify-academic-site/scripts/verify.mjs doctor
```

Run this before driving whenever something looks off. It exits 0 only when all of these are true:

- `state.json` says `running` and the recorded pid is alive
- the listener on that port is in that pid's process tree
- `GET /` is HTTP 200 and the HTML contains `Jin Ma`

## Drive

Every command below reads `ACADEMIC_SITE_VERIFY_DIR`. Chrome starts on the first browser command, headless, `--lang=en-US`, with a user-data-dir inside the run directory so the theme choice does not leak into another run.

```bash
node .cursor/skills/verify-academic-site/scripts/verify.mjs open /
node .cursor/skills/verify-academic-site/scripts/verify.mjs open /publications/
node .cursor/skills/verify-academic-site/scripts/verify.mjs click --role link --name "Publications"
node .cursor/skills/verify-academic-site/scripts/verify.mjs click --label "Search site"
node .cursor/skills/verify-academic-site/scripts/verify.mjs click --label "Toggle dark mode"
node .cursor/skills/verify-academic-site/scripts/verify.mjs fill --label "Filter publications by title, author, or year" --value "DisPatch"
node .cursor/skills/verify-academic-site/scripts/verify.mjs fill --label "Search pages" --value "Teaching"
node .cursor/skills/verify-academic-site/scripts/verify.mjs text --selector ".home-hero"
node .cursor/skills/verify-academic-site/scripts/verify.mjs text --id pubList
node .cursor/skills/verify-academic-site/scripts/verify.mjs attr --selector "html" --name data-bs-theme
node .cursor/skills/verify-academic-site/scripts/verify.mjs storage --key theme
node .cursor/skills/verify-academic-site/scripts/verify.mjs url
node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id publications --text "Publications"
node .cursor/skills/verify-academic-site/scripts/verify.mjs press --key Escape
node .cursor/skills/verify-academic-site/scripts/verify.mjs press --key k --mod ctrl
node .cursor/skills/verify-academic-site/scripts/verify.mjs snapshot --path publications/dispatch.aria.txt
node .cursor/skills/verify-academic-site/scripts/verify.mjs screenshot --path publications/dispatch.png
```

`--label` matches an `aria-label` exactly. `--role` and `--name` match the accessible name. `fill` sets the DOM value and dispatches `input`, which is what the publication filter and site search listen to. `text` uses `innerText`, so publication rows hidden with `display: none` drop out.

Stable handles:

| Handle | Where |
|---|---|
| `.home-hero` | Home name, `Jin Ma` |
| `nav` links `Home`, `About`, `Publications`, `Teaching`, `Service` | Header, from `_config.yml` `nav_pages` |
| `#publications` | Publications heading |
| `#pubSearch`, `aria-label="Filter publications by title, author, or year"` | Publication filter |
| `[data-pub-searchable]` | One bibliography entry |
| `#about`, `#teaching`, `#service` | Page headings |
| `aria-label="Search site"` | Opens the search overlay |
| `#searchInput`, `aria-label="Search pages"` | Site search field |
| `#searchResults` | Site search results |
| `#darkModeToggle`, `aria-label="Toggle dark mode"` | Theme button |
| `html[data-bs-theme]` and `localStorage` key `theme` | Saved theme |

## Evidence

Write proof under `$ACADEMIC_SITE_VERIFY_DIR/evidence/`. Relative `--path` values are resolved there. Capture the action and the resulting state:

- the command stdout
- an accessibility snapshot
- a screenshot that shows the changed heading or the filtered list
- a side effect when there is one. Dark mode writes `localStorage` key `theme` and sets `data-bs-theme`. Publication filtering and site search change only the open page. They do not write the bibliography or `assets/search.json`.

Exercise the served pages. Do not treat `npm test` or a raw read of `assets/ref.bib` as a substitute for the filter the reader uses. There is no dry-run mode. `jekyll serve` renders the same pages GitHub Pages publishes, minus production analytics.

## Cleanup

```bash
node .cursor/skills/verify-academic-site/scripts/verify.mjs stop
```

`stop` signals the Jekyll server and Chrome only when `ps` still reports the start time recorded at launch. It then deletes the Chrome profile and the run's generated `site/` directory. It does not delete `$ACADEMIC_SITE_VERIFY_DIR/evidence` or the checkout's `_site/`. A second `stop` prints `already stopped` and does not signal anyone. After `stop`, `doctor` fails. Confirm the screenshot and snapshot are still in `evidence/` before treating the run as finished.

Do not kill a process by name. Do not stop a Jekyll pid that `launch` did not record.

## Helpers

The only helper is `scripts/verify.mjs`, already executable. Invoke it as shown above from the repo root. Commands: `launch`, `doctor`, `stop`, `open`, `click`, `select`, `fill`, `text`, `attr`, `url`, `storage`, `wait`, `press`, `snapshot`, `screenshot`. `press --key Escape` sends Escape. `press --key k --mod ctrl` sends Ctrl+K. `wait --id <id> --attr class --lacks open` waits until that class token is absent.
