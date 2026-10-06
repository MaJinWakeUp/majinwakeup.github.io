# Dark mode

The navbar toggle switches the site between light and dark and saves the choice in this browser. A fresh profile has no saved choice, so the first paint follows the operating system.

## Sub-features

- `theme-toggle` flips `data-bs-theme` and writes `localStorage` key `theme`.
- `theme-second` flips back to the other value.

## How to get to it (user POV)

- Choose the button labeled `Toggle dark mode` in the navbar. It is on every page.

## Driving it with verify-academic-site

Preconditions:

- `doctor` reports `listener: owned`.
- The Chrome profile has no `theme` key. A fresh `launch` profile satisfies this.
- Home is open: `open /`.

- **First click.** Toggle the theme. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs click --label "Toggle dark mode"`. The document theme and the stored value match. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs attr --selector "html" --name data-bs-theme` and `node .cursor/skills/verify-academic-site/scripts/verify.mjs storage --key theme`. Both print the same word, `light` or `dark`.
- **Proof.** Capture that first saved theme before toggling again. Run `node .cursor/skills/verify-academic-site/scripts/verify.mjs screenshot --path dark-mode/toggled.png`. The shot shows the navbar toggle and the page in the theme `storage` just reported.
- **Second click.** Toggle again. Run the click command a second time. Both commands now print the other word.

## Gotchas

- Before the first click, `storage --key theme` prints `null`. The page can still look dark when the OS prefers dark. Do not treat the first paint as a saved choice.
- The key is `theme`, not a namespaced key.
- The button's `aria-label` stays `Toggle dark mode` in both states. The proof is `data-bs-theme` and `localStorage`, not a changed label.
