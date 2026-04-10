# Modern Academic Redesign

## Overview

Redesign the academic website template to look and feel like a 2026 site while making it dramatically easier for new users to set up. Keep Jekyll + Jekyll Scholar. Add dark mode, modern layouts, smooth transitions, and a consolidated configuration experience.

Target audience: academics who want easy defaults that "just work" but with room to customize deeper.

## Visual Design System

### Typography

- Body: Inter (Google Fonts, `font-display: swap`)
- Headings: Inter, tighter letter-spacing, heavier weights
- Code: JetBrains Mono
- Base size: 16px, scale ratio ~1.25 for headings

### Color Palette

Light mode:
- Background: `#fafaf9` (warm off-white)
- Text: `#1a1a1a` (near-black)
- Accent: configurable via `_config.yml`, default `#2563eb` (muted blue)

Dark mode (via Bootstrap 5.3 `data-bs-theme="dark"`):
- Background: `#18181b` (deep charcoal)
- Text: `#e4e4e7` (light gray)
- Accent: same value, auto-adjusted for contrast

All colors exposed as CSS custom properties. Users override by setting `accent_color` in `_config.yml`.

### Layout

- Max-width: 1100px (up from 800px)
- CSS Grid for page structure, flexbox for components
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Generous whitespace: consistent spacing scale based on 0.25rem increments

### Dark Mode

- Toggle in navbar (sun/moon icon)
- Uses Bootstrap 5.3's native `data-bs-theme` attribute
- Respects `prefers-color-scheme` on first visit
- Persists choice in `localStorage`
- Disabled entirely if `dark_mode: false` in `_config.yml`

### Animations

- CSS transitions on publication abstract/bibtex expand/collapse
- Subtle fade-in on page sections via IntersectionObserver
- Navbar gains slight shadow on scroll
- Restrained and academic — no flashy effects

## Configuration & User Experience

### Consolidated `_config.yml`

The config file becomes the single entry point for basic setup, organized into numbered steps with rich inline comments:

```yaml
# ============================================================
# STEP 1: Your Identity (required)
# ============================================================
name: "Your Name"
title: "Your Title"
institution: "Your University"
email: your@email.edu
photo: profile.jpg  # place in images/

# ============================================================
# STEP 2: Your Links (optional -- delete any you don't use)
# ============================================================
links:
  google_scholar: ""
  github: ""
  orcid: ""
  twitter: ""
  linkedin: ""
  cv: ""

# ============================================================
# STEP 3: Site Settings
# ============================================================
accent_color: "#2563eb"
dark_mode: true
analytics:
  google_id: ""

# ============================================================
# STEP 4: Choose Your Pages
# ============================================================
nav_pages:
  - name: about
  - name: publications
  - name: research
  - name: team
  - name: teaching
  - name: talks
  - name: software
  - name: blogs
```

Fields previously spread across `pi.yml` (name, photo, links) move into `_config.yml`. The `pi.yml` file remains optional for detailed CV data (education history, detailed bio).

### Data Files

Keep `_data/` files for complex data but improve them:
- Every field has an inline comment explaining what it does
- Example entries clearly marked with `# EXAMPLE -- replace or delete`
- Optional fields explicitly labeled as optional
- Field names unchanged from current template where possible (migration friendly)

Files retained: `team_members.yml`, `alumni.yml`, `people.yml`, `news.yml`, `awards.yml`, `grants.yml`, `funders.yml`.

File removed: `pi.yml` basic fields move to `_config.yml`. Detailed education/bio stays as optional `pi.yml`.

### Setup Script

A `setup.sh` bash script that:
1. Asks for name, title, institution, email interactively
2. Writes answers into `_config.yml` (sed replacements on the placeholder values)
3. Prints reminders: add profile photo to `images/`, edit `assets/ref.bib`, customize `_data/` files
4. Prints: "Run `bundle exec jekyll serve` to preview your site"

Not a full wizard. Just enough to get past the blank-slate problem.

## Page Redesigns

### Home Page

- Desktop: two-column layout via CSS Grid — main content (~65% left), profile card (~35% right)
- Profile card: photo (rounded), name, title, institution, social links as icon row — all pulled from `_config.yml`
- News section below main content as a clean vertical timeline
- Mobile: stacks vertically — profile card on top, content, then news

### Team Page

- CSS Grid (`auto-fill, minmax(250px, 1fr)`) replaces modulo-based row logic
- Each member: card with photo, name, role, one-liner, email/website icons
- Cards adapt fluidly to any screen width
- Alumni section as a clean table below the cards

### Publications Page

- Keep Jekyll Scholar, restyle the output
- Each publication as a card: title, authors (with PI name bolded), venue, year
- Action buttons (PDF, DOI, arXiv, BIB, Abstract) as pill-style row
- Abstract and BibTeX expand with CSS transitions
- One shared JS function replaces per-entry inline JS toggle functions
- Text filter/search bar at the top: filters by title, author, year (JS, client-side)

### Research Page

- Grid of research area cards: thumbnail image, title, short description
- Click to expand for full description or link to dedicated page
- CSS Grid layout matching team page card pattern

### About Page

- Bio section at top
- Education as a clean vertical timeline
- Awards and funding as styled lists with subtle separators
- Uses data from `_config.yml` (basic) + optional `_data/pi.yml` (detailed)

### Other Pages (talks, software, teaching, blogs)

- Consistent card/list styling matching the design system
- Same responsive grid approach
- No structural changes to content model, just visual upgrade

## Technical Architecture

### CSS/SASS Structure

Replace `SHB_css.scss` and the `bootstrap-4-jekyll` layer with:

```
_sass/
  base/
    _variables.scss      # CSS custom properties, color tokens, spacing scale
    _typography.scss     # font imports, heading styles, body text
    _reset.scss          # minimal reset/normalize
  components/
    _card.scss           # reusable card component
    _navbar.scss         # navbar overrides, scroll shadow
    _publication.scss    # publication entry, expand/collapse
    _profile.scss        # profile card (home sidebar)
    _footer.scss         # footer styling
    _buttons.scss        # pill buttons, icon buttons
  layouts/
    _home.scss           # home page grid
    _team.scss           # team page grid
    _grid.scss           # generic responsive grid
    _research.scss       # research cards
  utilities/
    _dark-mode.scss      # dark mode token overrides (Bootstrap 5.3 color-mode)
    _animations.scss     # fade-in, transitions
```

Entry point: `assets/css/main.scss` imports Bootstrap (selective modules: grid, utilities, navbar, collapse, transitions) then the above.

### Bootstrap 5.3.3

- Pin to `5.3.3` in `package.json`
- Import selectively (not the full bundle) to reduce CSS size
- Use Bootstrap's native color mode system (`data-bs-theme`) for dark mode
- Use Bootstrap's CSS custom properties for all design tokens
- Use Bootstrap's updated gap utilities and container features

### JavaScript

Single source file `assets/js/site.js` (~150-200 lines):

- Dark mode toggle: reads `localStorage` / `prefers-color-scheme`, sets `data-bs-theme` on `<html>`, persists choice
- Publication filter: text input filters publication cards by title/author/year (simple `includes()` match, hide non-matching)
- Expand/collapse: one function handles all abstract/bibtex toggles via data attributes (replaces N generated functions)
- Scroll effects: IntersectionObserver for fade-in, scroll listener for navbar shadow
- No framework dependencies

Build: esbuild minifies to `assets/js/site.min.js`. Pre-built file committed to repo so `bundle exec jekyll serve` works without npm.

Bootstrap JS bundle kept separately for navbar mobile collapse.

### Image Organization

```
images/
  team/        # team member photos
  research/    # research area thumbnails
  banner/      # banner images
  profile.jpg  # PI profile photo (or in team/)
```

Native lazy loading via `loading="lazy"` attribute on `<img>` tags. WebP recommended in docs but not enforced.

### Build Pipeline

`package.json` scripts:
- `build:js` — esbuild minification of `site.js`
- `build` — runs all build steps

Pre-built assets committed so the two-path experience works:
- **Simple path**: fork, edit config, `bundle exec jekyll serve` — no npm needed
- **Customization path**: edit JS/CSS source, `npm run build`, then Jekyll serve

### File Removals

- `SHB_css.scss` — replaced by modular SASS structure
- `_sass/bootstrap-4-jekyll/` — no longer needed
- `switch_theme.sh` — dark mode replaces theme switching
- `update_bootstrap.sh` — npm handles Bootstrap updates

## Migration & Backwards Compatibility

### For New Users

Fork, run `./setup.sh`, edit data files, serve. The README gets a rewrite focused on this flow.

### For Existing Users

`UPGRADING.md` with a migration checklist:
1. Move `pi.yml` basic fields (name, photo, links) into new `_config.yml` format
2. Reorganize images into subdirectories (optional but recommended)
3. Replace old layouts in page frontmatter if any custom pages reference old layout names
4. Data files (`team_members.yml`, `news.yml`, etc.) keep same field names — should work as-is
5. `ref.bib` format unchanged
6. Custom CSS in `SHB_css.scss` needs to be moved to appropriate `_sass/` module

### Setup Script Migration Detection

`setup.sh` checks for old-style `_config.yml` (presence of `affiliation:` key) and prints migration hints instead of running fresh setup.

### Data File Compatibility

Field names in `team_members.yml`, `alumni.yml`, `news.yml`, etc. stay the same where possible. New optional fields are additive only.

## Out of Scope

- CMS or admin UI
- Replacing Jekyll with another static site generator
- Replacing Jekyll Scholar or changing the BibTeX workflow
- Automated image optimization (just recommend WebP in docs)
- Service worker / offline support
- i18n / multi-language support
