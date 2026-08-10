## 2026-08-07 - Initial Look\n**Learning:** Just starting to analyze this Jekyll template.\n**Action:** Let's look for a small UX win.

## 2026-08-07 - Skip to Main Content Link
**Learning:** Found that this site was lacking a "Skip to Main Content" link, which is a standard accessibility practice to allow keyboard users and screen readers to bypass navigation and jump straight into content. I added it via `_layouts/default.html` using the existing `.visually-hidden-focusable` class from Bootstrap, paired with small stylistic polish.
**Action:** Always check if a skip-to-content link exists in the core layouts, especially on content-heavy templates. If it doesn't, add one that targets `id="main-content"`. Ensure styling is visible when focused.
## 2026-08-10 - Consistent Keyboard Navigation
**Learning:** Many custom interactive elements (like pill buttons and back-to-top links) in this project lacked consistent focus states, making keyboard navigation difficult. The project's existing SASS architecture handles these across several different component files (_buttons, _publication, _navbar).
**Action:** Always use `&:focus-visible` to apply accessibility focus outlines without impacting mouse users, ensuring a robust outline (e.g., `outline: 2px solid var(--accent); outline-offset: 2px;`) is added to all interactive elements missing it.
