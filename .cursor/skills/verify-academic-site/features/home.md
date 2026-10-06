# Home

The home page introduces Jin Ma and links into the publications list. The header nav is on every page.

## Sub-features

- `home-hero` shows the name and role.
- `home-nav` reaches About, Publications, Teaching, and Service.

## How to get to it (user POV)

- Open `/`.
- Choose the brand `Jin Ma` or the `Home` nav link from another page.

## Driving it with verify-academic-site

Preconditions:

- `doctor` reports `listener: owned`.

- **Hero.** Open home. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs open /`. The hero text is `Jin Ma`. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs text --selector ".home-hero"`. The subline names Ph.D. Candidate at Clemson University.
- **Nav.** Choose Publications. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs click --role link --name "Publications"`. The URL path contains `/publications` and the heading is Publications. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs wait --id publications --text "Publications"`.
- **Proof.** On home, run `snapshot --path home/page.aria.txt` and `screenshot --path home/page.png`. The snapshot contains a heading `Jin Ma` and links named `About`, `Publications`, `Teaching`, and `Service`.

## Gotchas

- The hero is an `h2.home-hero`, not the document title. The title is `Home - Jin Ma`.
- Nav labels come from `_config.yml` `nav_pages` with Jekyll's `capitalize` filter, so the visible names are `About`, `Publications`, `Teaching`, and `Service`.
