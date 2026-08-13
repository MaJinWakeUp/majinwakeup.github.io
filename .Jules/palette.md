
## 2024-05-24 - Improve navigation accessibility and search discoverability
**Learning:** Purely visual active states (like the `.active` CSS class) do not communicate to screen readers which page the user is currently on. Also, keyboard shortcuts that are undocumented (like `Cmd+K` for search) go undiscovered and thus unused.
**Action:** Pair active visual states with `aria-current="page"` and expose hidden keyboard shortcuts by using the `title` attribute on the corresponding trigger element.
