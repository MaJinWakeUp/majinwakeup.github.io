# About, teaching, and service

These three pages are linked from the header. Each has one main heading and a body a reader can check.

## Sub-features

- `about-name` shows Jin Ma on the about page.
- `teaching-courses` lists Clemson courses, including CPSC 4200/6200.
- `service-certificates` lists the AsiaCCS 2024 volunteer certificate.

## How to get to it (user POV)

- Choose `About`, `Teaching`, or `Service` in the header.
- Open `/about/`, `/teaching/`, or `/service/`.

## Driving it with verify-academic-site

Preconditions:

- `doctor` reports `listener: owned`.

- **About.** Open the page. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs open /about/`. The heading is About. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id about --text "About"`. The page names Jin Ma. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs text --selector ".pi-name"`.
- **Teaching.** Open the page. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs open /teaching/`. The heading is Teaching. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id teaching --text "Teaching"`. The page body contains `CPSC 4200/6200 Computer Security Principles`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs text --id main-content`.
- **Service.** Open the page. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs open /service/`. The heading is Service. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id service --text "Service"`. The page body contains `AsiaCCS 2024 Volunteer`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs text --id main-content`.
- **Proof.** Run `screenshot --path pages/about.png` on About. The shot shows the heading About and the name Jin Ma.

## Gotchas

- Heading ids come from kramdown `auto_ids`: `about`, `teaching`, `service`. Those ids are on the headings, so `text --id teaching` is only the word Teaching. The courses and certificates are in `#main-content`.
