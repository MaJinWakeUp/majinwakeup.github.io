# Modern Academic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the academic website template with modern visuals (Inter font, dark mode, 1100px layout, CSS Grid), consolidated configuration, and improved user experience.

**Architecture:** Jekyll 4.3.3 + Jekyll Scholar + Bootstrap 5.3.3 (selective imports). Custom SASS modules replace monolithic SHB_css.scss. A single site.js handles dark mode, publication filtering, and scroll effects. Configuration consolidated into `_config.yml` with numbered setup steps.

**Tech Stack:** Jekyll 4.3.3, Bootstrap 5.3.3, esbuild, SCSS, vanilla JS

---

## File Structure

### New Files
```
_sass/base/_variables.scss          — CSS custom properties, color tokens, spacing
_sass/base/_typography.scss         — Google Fonts import, heading/body styles
_sass/base/_reset.scss              — Minimal reset on top of Bootstrap
_sass/components/_card.scss         — Reusable .card-academic component
_sass/components/_navbar.scss       — Navbar overrides, scroll shadow class
_sass/components/_publication.scss  — Publication entry, expand/collapse transitions
_sass/components/_profile.scss      — Profile card (home sidebar)
_sass/components/_footer.scss       — Footer grid and styling
_sass/components/_buttons.scss      — Pill buttons, icon buttons
_sass/layouts/_home.scss            — Home page CSS Grid
_sass/layouts/_team.scss            — Team page CSS Grid
_sass/layouts/_grid.scss            — Generic responsive grid utility
_sass/layouts/_research.scss        — Research card grid
_sass/utilities/_dark-mode.scss     — Bootstrap color-mode overrides
_sass/utilities/_animations.scss    — Fade-in, transitions
assets/js/site.js                   — Dark mode, pub filter, toggles, scroll
assets/js/site.min.js               — Pre-built minified version
images/team/.gitkeep                — Team photos directory
images/research/.gitkeep            — Research thumbnails directory
images/banner/.gitkeep              — Banner images directory
setup.sh                            — Interactive setup script
UPGRADING.md                        — Migration guide for existing users
```

### Modified Files
```
_config.yml                         — Consolidated config with numbered steps
package.json                        — Pin Bootstrap 5.3.3, add esbuild + scripts
assets/main.scss                    — New import structure (was assets/main.scss)
_includes/head.html                 — Google Fonts, updated CSS/JS refs, Font Awesome 6
_includes/header.html               — Dark mode toggle, updated navbar classes
_includes/footer.html               — Semantic footer, use config fields directly
_includes/sidebar.html              — Profile card using site.* config values
_includes/analytics.html            — Simplified to GA4-only
_layouts/default.html               — data-bs-theme attribute, wider container
_layouts/homelay.html               — CSS Grid two-column layout
_layouts/bibtemplate.html           — Remove inline JS, use data attributes
_layouts/gridlay.html               — Updated container class
_layouts/textlay.html               — Updated container class
_layouts/publications.html          — Updated container class
_layouts/research.html              — Updated container class
_layouts/team.html                  — Updated container class
_layouts/page.html                  — Updated wrapper class
_layouts/post.html                  — Updated wrapper class
_layouts/piclay.html                — Updated wrapper class
_pages/home.md                      — Rewritten for new homelay
_pages/team.md                      — CSS Grid cards, remove modulo logic
_pages/about.md                     — Timeline layout, use site.* config
_pages/publications.md              — Add search bar, remove inline styles
_pages/research.md                  — Card grid, remove inline styles
_pages/software.md                  — Card styling, remove inline styles
_pages/talks.md                     — Remove inline styles
_pages/teaching.md                  — Card styling
_pages/allnews.md                   — Timeline styling
_pages/blogs.md                     — Card list styling
_data/pi.yml                        — Reduced to optional education/bio detail
_data/team_members.yml              — Better comments, example markers
_data/alumni.yml                    — Better comments, example markers
_data/news.yml                      — Better comments, example markers
_data/awards.yml                    — Better comments
_data/grants.yml                    — Better comments
_data/funders.yml                   — Better comments
_data/people.yml                    — Better comments
```

### Removed Files
```
_sass/SHB_css.scss                  — Replaced by modular SASS
_sass/bootstrap-4-jekyll/           — No longer needed
switch_theme.sh                     — Dark mode replaces theme switching
update_bootstrap.sh                 — npm handles Bootstrap updates
```

---

## Task 1: Bootstrap & Build Pipeline Setup

**Files:**
- Modify: `package.json`
- Modify: `Gemfile` (no changes needed, just verify)

- [ ] **Step 1: Update package.json with Bootstrap 5.3.3 and esbuild**

Replace the contents of `package.json`:

```json
{
  "private": true,
  "scripts": {
    "build:js": "esbuild assets/js/site.js --bundle --minify --outfile=assets/js/site.min.js",
    "build": "npm run build:js"
  },
  "dependencies": {
    "bootstrap": "5.3.3"
  },
  "devDependencies": {
    "esbuild": "^0.25.0"
  }
}
```

- [ ] **Step 2: Install npm dependencies**

Run: `cd /Users/spencer/Downloads/academic-website-template && npm install`
Expected: `node_modules/` created with bootstrap 5.3.3 and esbuild

- [ ] **Step 3: Verify Bootstrap 5.3.3 is installed**

Run: `cat node_modules/bootstrap/package.json | grep version | head -1`
Expected: `"version": "5.3.3",`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: pin Bootstrap 5.3.3 and add esbuild build pipeline"
```

---

## Task 2: SASS Foundation — Variables, Reset, Typography

**Files:**
- Create: `_sass/base/_variables.scss`
- Create: `_sass/base/_reset.scss`
- Create: `_sass/base/_typography.scss`

- [ ] **Step 1: Create _sass/base/_variables.scss**

```scss
// =============================================================
// Design Tokens
// =============================================================

// These CSS custom properties are the single source of truth for
// colors, spacing, and layout values across the site.

:root {
  // Accent color — overridden at build time from _config.yml via
  // an inline <style> block in head.html
  --accent: #2563eb;
  --accent-hover: #1d4ed8;

  // Light mode (default)
  --bg-primary: #fafaf9;
  --bg-secondary: #f5f5f4;
  --bg-card: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #525252;
  --text-muted: #737373;
  --border-color: #e5e5e5;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-navbar: 0 1px 3px rgba(0, 0, 0, 0.12);

  // Layout
  --container-max: 1100px;
  --container-padding: 1.5rem;

  // Spacing scale (0.25rem base)
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  // Border radius
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  // Transitions
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}

// Dark mode overrides — activated by Bootstrap's data-bs-theme="dark"
[data-bs-theme="dark"] {
  --bg-primary: #18181b;
  --bg-secondary: #27272a;
  --bg-card: #1f1f23;
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --border-color: #3f3f46;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-navbar: 0 1px 3px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 2: Create _sass/base/_reset.scss**

```scss
// =============================================================
// Minimal reset on top of Bootstrap's reboot
// =============================================================

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--accent-hover);
  }
}

::selection {
  background-color: var(--accent);
  color: #fff;
}
```

- [ ] **Step 3: Create _sass/base/_typography.scss**

```scss
// =============================================================
// Typography — Inter + JetBrains Mono via Google Fonts
// =============================================================
// Font import is in head.html via <link> tag for performance.

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

h1 { font-size: 2.441rem; }
h2 { font-size: 1.953rem; }
h3 { font-size: 1.563rem; }
h4 { font-size: 1.25rem; }

p {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

pre {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

ul, ol {
  color: var(--text-secondary);
}

.text-muted {
  color: var(--text-muted) !important;
}
```

- [ ] **Step 4: Commit**

```bash
git add _sass/base/
git commit -m "feat: add SASS foundation — variables, reset, typography"
```

---

## Task 3: SASS Components — Card, Navbar, Buttons, Footer, Profile

**Files:**
- Create: `_sass/components/_card.scss`
- Create: `_sass/components/_navbar.scss`
- Create: `_sass/components/_buttons.scss`
- Create: `_sass/components/_footer.scss`
- Create: `_sass/components/_profile.scss`

- [ ] **Step 1: Create _sass/components/_card.scss**

```scss
// =============================================================
// Card component — used for publications, team, research, news
// =============================================================

.card-academic {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  h3, h4 {
    margin-top: 0;
  }
}

// Section card — replaces .jumbotron for content sections
.section-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  margin-top: var(--space-6);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 2: Create _sass/components/_navbar.scss**

```scss
// =============================================================
// Navbar — clean, modern, with scroll shadow
// =============================================================

.navbar {
  background-color: var(--bg-card) !important;
  border-bottom: 1px solid var(--border-color);
  padding: var(--space-3) var(--space-4);
  transition: box-shadow var(--transition-base);

  &.scrolled {
    box-shadow: var(--shadow-navbar);
  }
}

.navbar-brand {
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary) !important;
  font-size: 1.125rem;

  img {
    border-radius: 0;
  }
}

.nav-link {
  color: var(--text-secondary) !important;
  font-weight: 500;
  font-size: 0.9375rem;
  padding: var(--space-2) var(--space-3) !important;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background-color var(--transition-fast);

  &:hover,
  &.active {
    color: var(--accent) !important;
    background-color: var(--bg-secondary);
  }
}

// Dark mode toggle button
.dark-mode-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-2);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.125rem;
  line-height: 1;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  display: flex;
  align-items: center;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
}
```

- [ ] **Step 3: Create _sass/components/_buttons.scss**

```scss
// =============================================================
// Pill buttons — for publication actions, software links
// =============================================================

.btn-pill {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  line-height: 1.5;

  &.btn-pdf {
    background-color: #16a34a;
    color: #fff;
    &:hover { background-color: #15803d; color: #fff; }
  }

  &.btn-doi {
    background-color: var(--accent);
    color: #fff;
    &:hover { background-color: var(--accent-hover); color: #fff; }
  }

  &.btn-arxiv {
    background-color: var(--accent);
    color: #fff;
    &:hover { background-color: var(--accent-hover); color: #fff; }
  }

  &.btn-bib,
  &.btn-abstract {
    background-color: transparent;
    color: var(--text-secondary);
    border-color: var(--border-color);
    &:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
  }

  &.btn-website {
    background-color: #16a34a;
    color: #fff;
    &:hover { background-color: #15803d; color: #fff; }
  }

  &.btn-git {
    background-color: #6366f1;
    color: #fff;
    &:hover { background-color: #4f46e5; color: #fff; }
  }

  &.btn-paper {
    background-color: #dc2626;
    color: #fff;
    &:hover { background-color: #b91c1c; color: #fff; }
  }
}

// Icon buttons — for social links
.icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  font-size: 1.25rem;

  &:hover {
    color: var(--accent);
    background-color: var(--bg-secondary);
  }
}
```

- [ ] **Step 4: Create _sass/components/_footer.scss**

```scss
// =============================================================
// Footer
// =============================================================

.site-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: var(--space-12) 0 var(--space-8);
  margin-top: var(--space-16);

  h5 {
    font-size: 0.9375rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
    margin-top: 0;
  }

  p, a {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  a:hover {
    color: var(--accent);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--container-padding);

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
  }

  .footer-copyright {
    text-align: center;
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--border-color);
    color: var(--text-muted);
    font-size: 0.8125rem;
  }
}
```

- [ ] **Step 5: Create _sass/components/_profile.scss**

```scss
// =============================================================
// Profile card — home page sidebar
// =============================================================

.profile-card {
  text-align: center;
  position: sticky;
  top: calc(var(--space-16) + 1rem); // below navbar

  .profile-photo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: var(--space-4);
    border: 3px solid var(--border-color);
  }

  .profile-name {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: var(--space-1);
    margin-top: 0;
  }

  .profile-title,
  .profile-institution {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin-bottom: var(--space-1);
  }

  .profile-links {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
    flex-wrap: wrap;
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add _sass/components/
git commit -m "feat: add SASS components — card, navbar, buttons, footer, profile"
```

---

## Task 4: SASS Components — Publication, Layouts, Utilities

**Files:**
- Create: `_sass/components/_publication.scss`
- Create: `_sass/layouts/_home.scss`
- Create: `_sass/layouts/_team.scss`
- Create: `_sass/layouts/_grid.scss`
- Create: `_sass/layouts/_research.scss`
- Create: `_sass/utilities/_dark-mode.scss`
- Create: `_sass/utilities/_animations.scss`

- [ ] **Step 1: Create _sass/components/_publication.scss**

```scss
// =============================================================
// Publication entry — card with collapsible abstract/bibtex
// =============================================================

.pub-entry {
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  .pub-title {
    font-weight: 600;
    color: var(--text-primary);
  }

  .pub-authors {
    font-size: 0.9375rem;
    color: var(--text-secondary);
  }

  .pub-venue {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-style: italic;
  }

  .pub-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }
}

// Collapsible content for bibtex/abstract
.pub-collapse {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow), padding var(--transition-slow);
  padding: 0;

  &.show {
    max-height: 1000px;
    padding: var(--space-4) 0;
  }

  pre {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--space-4);
    margin: var(--space-3) 0 0;
    font-size: 0.8125rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: var(--text-primary);
  }
}

// Publication search/filter
.pub-search {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.9375rem;
  margin-bottom: var(--space-6);
  transition: border-color var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &::placeholder {
    color: var(--text-muted);
  }
}
```

- [ ] **Step 2: Create _sass/layouts/_home.scss**

```scss
// =============================================================
// Home page — two-column grid layout
// =============================================================

.home-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-8);
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.home-content {
  min-width: 0; // prevent grid blowout

  h3:first-child {
    margin-top: 0;
  }
}

// News timeline
.news-timeline {
  margin-top: var(--space-8);

  .news-item {
    padding: var(--space-4) 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }
  }

  .news-date {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .news-headline {
    margin-top: var(--space-1);
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }
}
```

- [ ] **Step 3: Create _sass/layouts/_team.scss**

```scss
// =============================================================
// Team page — CSS Grid card layout
// =============================================================

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-6);
}

.team-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  transition: box-shadow var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  .team-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: var(--space-4);
    border: 2px solid var(--border-color);
  }

  .team-name {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: var(--space-1);
    margin-top: 0;
  }

  .team-info {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-style: italic;
    margin-bottom: var(--space-3);
  }

  .team-links {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
  }
}

// PI card — larger, horizontal layout
.pi-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-6);
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .pi-photo {
    width: 180px;
    height: 180px;
    border-radius: var(--radius-lg);
    object-fit: cover;
    border: 2px solid var(--border-color);

    @media (max-width: 640px) {
      margin: 0 auto;
    }
  }

  .pi-name {
    margin-top: 0;
  }

  .pi-links {
    display: flex;
    gap: var(--space-2);
    margin-top: var(--space-3);
    flex-wrap: wrap;

    @media (max-width: 640px) {
      justify-content: center;
    }
  }
}

// Alumni table
.alumni-table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-3) var(--space-4);
    border-bottom: 2px solid var(--border-color);
  }

  td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border-color);
    font-size: 0.9375rem;
    color: var(--text-secondary);
  }

  tr:last-child td {
    border-bottom: none;
  }
}
```

- [ ] **Step 4: Create _sass/layouts/_grid.scss**

```scss
// =============================================================
// Generic responsive grid utility
// =============================================================

.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

// Main content container — replaces .container-fluid max-width: 800px
.site-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

- [ ] **Step 5: Create _sass/layouts/_research.scss**

```scss
// =============================================================
// Research page — card grid
// =============================================================

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}

.research-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  .research-thumb {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0;
  }

  .research-body {
    padding: var(--space-6);
  }

  .research-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: var(--space-2);
  }

  .research-desc {
    font-size: 0.9375rem;
    color: var(--text-secondary);
  }
}
```

- [ ] **Step 6: Create _sass/utilities/_dark-mode.scss**

```scss
// =============================================================
// Dark mode — Bootstrap 5.3 color-mode overrides
// =============================================================
// Most dark mode is handled by CSS custom properties in _variables.scss.
// This file handles Bootstrap component overrides that don't respond
// to our custom properties.

[data-bs-theme="dark"] {
  .navbar-toggler-icon {
    filter: invert(1);
  }

  .pub-search {
    background-color: var(--bg-secondary);
  }

  img {
    opacity: 0.9;
  }
}
```

- [ ] **Step 7: Create _sass/utilities/_animations.scss**

```scss
// =============================================================
// Animations — restrained, academic
// =============================================================

// Fade in on scroll via IntersectionObserver
.fade-in-section {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Reduced motion: respect user preference
@media (prefers-reduced-motion: reduce) {
  .fade-in-section {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .pub-collapse {
    transition: none;
  }
}
```

- [ ] **Step 8: Commit**

```bash
git add _sass/components/_publication.scss _sass/layouts/ _sass/utilities/
git commit -m "feat: add publication, layout, and utility SASS modules"
```

---

## Task 5: Main SCSS Entry Point & Remove Old Styles

**Files:**
- Modify: `assets/main.scss`
- Remove: `_sass/SHB_css.scss`
- Remove: `_sass/bootstrap-4-jekyll/_bootstrap-4-jekyll.scss`
- Remove: `_sass/bootstrap-4-jekyll/` (directory)

- [ ] **Step 1: Replace assets/main.scss**

Replace the full contents of `assets/main.scss` with:

```scss
---
---

$baseurl: "{{ site.url }}{{ site.baseurl }}";

// Bootstrap 5.3.3 — selective imports
@import "bootstrap/functions";
@import "bootstrap/variables";
@import "bootstrap/variables-dark";
@import "bootstrap/maps";
@import "bootstrap/mixins";
@import "bootstrap/utilities";
@import "bootstrap/root";
@import "bootstrap/reboot";
@import "bootstrap/type";
@import "bootstrap/images";
@import "bootstrap/containers";
@import "bootstrap/grid";
@import "bootstrap/tables";
@import "bootstrap/buttons";
@import "bootstrap/transitions";
@import "bootstrap/dropdown";
@import "bootstrap/nav";
@import "bootstrap/navbar";
@import "bootstrap/card";
@import "bootstrap/collapse";
@import "bootstrap/close";
@import "bootstrap/utilities/api";

// Base
@import "base/variables";
@import "base/reset";
@import "base/typography";

// Components
@import "components/card";
@import "components/navbar";
@import "components/buttons";
@import "components/footer";
@import "components/profile";
@import "components/publication";

// Layouts
@import "layouts/grid";
@import "layouts/home";
@import "layouts/team";
@import "layouts/research";

// Utilities
@import "utilities/dark-mode";
@import "utilities/animations";
```

- [ ] **Step 2: Remove old style files**

Run:
```bash
rm _sass/SHB_css.scss
rm -rf _sass/bootstrap-4-jekyll/
```

- [ ] **Step 3: Verify SCSS compiles with Jekyll**

Run: `cd /Users/spencer/Downloads/academic-website-template && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds (there will be errors from layout changes not done yet — that's ok, we're checking SCSS compilation)

- [ ] **Step 4: Commit**

```bash
git add assets/main.scss
git rm _sass/SHB_css.scss
git rm -rf _sass/bootstrap-4-jekyll/
git commit -m "feat: replace monolithic CSS with modular SASS, selective Bootstrap imports"
```

---

## Task 6: Consolidated _config.yml

**Files:**
- Modify: `_config.yml`

- [ ] **Step 1: Replace _config.yml**

Replace the full contents of `_config.yml` with:

```yaml
# ============================================================
# STEP 1: Your Identity (required)
# ============================================================
name: "Richard Feynman"
title: "Professor of Physics"
institution: "California Institute of Technology"
email: richard@university.edu
photo: headshot.jpg  # place your photo in images/

# ============================================================
# STEP 2: Your Links (optional -- delete any you don't use)
# ============================================================
links:
  google_scholar: "https://scholar.google.com/citations?user=B7vSqZsAAAAJ"
  github: "https://github.com/"
  researchgate: "https://www.researchgate.net/"
  orcid: ""
  twitter: ""
  linkedin: ""
  cv: "cv/cv.pdf"

# ============================================================
# STEP 3: Site Settings
# ============================================================
accent_color: "#2563eb"      # theme color for links and buttons
dark_mode: true              # show dark mode toggle in navbar
description: "Academic webpage of Dr. Richard Feynman"
baseurl: ""
url: ""

# Google Analytics — paste your GA4 measurement ID, or leave blank
analytics:
  google_id: ""

# ============================================================
# STEP 4: Choose Your Pages (comment out any you don't need)
# ============================================================
nav_pages:
  - name: about
  - name: publications
  - name: talks
  - name: research
  - name: software
  - name: team
  - name: teaching
  - name: blogs

# ============================================================
# Advanced Settings (you probably don't need to change these)
# ============================================================
include:
  - .htaccess
  - _pages

markdown: kramdown
highlighter: rouge
lsi: false
excerpt_separator: "\n\n"
incremental: false

kramdown:
  input: GFM
  hard_wrap: false
  auto_ids: true
  footnote_nr: 1
  entity_output: as_char
  toc_levels: 1..6
  smart_quotes: lsquo,rsquo,ldquo,rdquo
  enable_coderay: false
  parse_block_html: true

plugins: ["jekyll/scholar"]

scholar:
  last_name: Doe
  first_name: [John]
  style: citesty
  locale: en
  source: /assets/
  bibliography: ref.bib
  bibliography_template: bibtemplate
  sort_by: year, month
  order: descending
  replace_strings: true
  join_strings: true
  details_dir: bibliography
  details_layout: bibtex.html
  details_link: Details
  query: "@*"
  bibliography_list_attributes:
    reversed: "reversed"

exclude:
  - Gemfile
  - Gemfile.lock
  - update_bootstrap.sh
  - switch_theme.sh
  - tags
  - Rakefile
  - node_modules
  - package.json
  - package-lock.json
  - docs
```

- [ ] **Step 2: Commit**

```bash
git add _config.yml
git commit -m "feat: consolidate config into numbered setup steps"
```

---

## Task 7: Update Data Files with Better Comments

**Files:**
- Modify: `_data/pi.yml`
- Modify: `_data/team_members.yml`
- Modify: `_data/alumni.yml`
- Modify: `_data/news.yml`
- Modify: `_data/awards.yml`
- Modify: `_data/grants.yml`
- Modify: `_data/funders.yml`
- Modify: `_data/people.yml`

- [ ] **Step 1: Replace _data/pi.yml**

```yaml
# Optional: detailed education and bio for the About page.
# Basic info (name, photo, links) now lives in _config.yml.
# Delete this file if you only need the basics.

# EXAMPLE -- replace or delete
- education:
    - "(1942) Ph.D. Physics, Princeton University"
    - "(1939) B.S. Physics, Massachusetts Institute of Technology"
  educationshort:
    - "(1942) Ph.D. Physics, Princeton"
    - "(1939) B.S. Physics, MIT"
```

- [ ] **Step 2: Replace _data/team_members.yml**

```yaml
# Current students and postdocs.
# Each entry needs: name, photo, info
# Optional: email, website, scholar, github, researchgate, cv
# Photos go in images/team/

# EXAMPLE -- replace or delete
- name: Example Student Name
  photo: rock.jpg           # file in images/ or images/team/
  info: Postdoc, started Oct 2040
  email: example@gmail.com  # optional
  website: https://example.com  # optional

- name: "This could be you!"
  photo: rock.jpg
  info: See openings for more info
```

- [ ] **Step 3: Replace _data/alumni.yml**

```yaml
# Former lab members.
# Each entry needs: name, duration, info
# Optional: photo, email

# EXAMPLE -- replace or delete
- name: Example Alumni Name
  photo: rock.jpg            # optional — file in images/ or images/team/
  duration: In the lab 2015-18
  info: Now at University of X
  email: example@gmail.com   # optional
```

- [ ] **Step 4: Replace _data/news.yml**

```yaml
# News items shown on the home page sidebar.
# The 3 most recent are shown; all appear on /allnews.
# Each entry needs: date, headline

# EXAMPLE -- replace or delete
- date: 1 January, 1941
  headline: "Example news here"

- date: 1 January, 1940
  headline: "Example news here"
```

- [ ] **Step 5: Replace _data/awards.yml**

```yaml
# Awards and honors, shown on the About page.
# Each entry needs: name

# EXAMPLE -- replace or delete
- name: Example award here (2021)
- name: Example award here (2020)
```

- [ ] **Step 6: Replace _data/grants.yml**

```yaml
# Grants and funding, shown on the About page.
# Each entry needs: name

# EXAMPLE -- replace or delete
- name: Example Grant Here
- name: Example Grant Here
```

- [ ] **Step 7: Replace _data/funders.yml**

```yaml
# Funding agency logos, shown on the About page.
# Each entry needs: image (filename in images/), url
# Recommended logo size: max-height 80px

# EXAMPLE -- replace or delete
- image: NSF.png
  url: https://www.nsf.gov/
- image: doe_logo.png
  url: https://www.energy.gov/
- image: onr_logo.png
  url: https://www.onr.navy.mil/
- image: NIH-logo.png
  url: https://www.nih.gov/
```

- [ ] **Step 8: Replace _data/people.yml**

```yaml
# Students and mentees, shown on the About page.
# Each entry needs: name, location, degree, year

# EXAMPLE -- replace or delete
- name: Student Here
  location: University Here
  degree: Ph.D.
  year: 2022

- name: Student Here
  location: University Here
  degree: M.S.
  year: 2020
```

- [ ] **Step 9: Commit**

```bash
git add _data/
git commit -m "docs: add inline comments and example markers to all data files"
```

---

## Task 8: Core Includes — head.html, header.html, footer.html

**Files:**
- Modify: `_includes/head.html`
- Modify: `_includes/header.html`
- Modify: `_includes/footer.html`
- Modify: `_includes/analytics.html`

- [ ] **Step 1: Replace _includes/head.html**

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{% if page.title %}{{ page.title | escape }} - {{ site.name | escape }}{% else %}{{ site.name | escape }}{% endif %}</title>
  <meta name="description" content="{{ site.description }}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">

  <!-- Styles -->
  <link rel="stylesheet" href="{{ "/assets/main.css" | relative_url }}">
  <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}">
  <link rel="shortcut icon" type="image/x-icon" href="{{ site.url }}{{ site.baseurl }}/favicon.ico">

  <!-- Accent color from config -->
  {% if site.accent_color %}
  <style>
    :root { --accent: {{ site.accent_color }}; --accent-hover: {{ site.accent_color }}; }
  </style>
  {% endif %}

  <!-- Dark mode: apply saved theme before paint to prevent flash -->
  <script>
    (function() {
      var darkMode = {{ site.dark_mode | default: true }};
      if (!darkMode) return;
      var saved = localStorage.getItem('theme');
      if (saved) {
        document.documentElement.setAttribute('data-bs-theme', saved);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      }
    })();
  </script>

  {% if jekyll.environment == 'production' %}
  {% include analytics.html %}
  {% endif %}

  {% include mathjax.html %}
</head>
```

- [ ] **Step 2: Replace _includes/header.html**

```html
<nav class="navbar sticky-top navbar-expand-md">
  <div class="container" style="max-width: var(--container-max);">
    <a class="navbar-brand" href="{{ site.url }}{{ site.baseurl }}/">
      <img src="{{ site.url }}{{ site.baseurl }}/favicon.ico" width="24" height="24" class="d-inline-block align-text-top" alt="">
      {{ site.name | escape }}
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="{{ site.url }}{{ site.baseurl }}/">Home</a>
        </li>
        {% for page in site.nav_pages %}
        <li class="nav-item">
          <a class="nav-link" href="{{ site.url }}{{ site.baseurl }}/{{ page.name }}">{{ page.name | capitalize }}</a>
        </li>
        {% endfor %}
      </ul>
      {% if site.dark_mode %}
      <button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">
        <i class="fa-solid fa-sun" id="themeIcon"></i>
      </button>
      {% endif %}
    </div>
  </div>
</nav>
```

- [ ] **Step 3: Replace _includes/footer.html**

```html
<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <h5>About</h5>
      <p>
        {{ site.name }}<br>
        {{ site.title }}<br>
        {{ site.institution }}
      </p>
    </div>
    <div>
      <h5>Contact</h5>
      <p>
        <a href="mailto:{{ site.email }}"><i class="fa-solid fa-envelope"></i> {{ site.email }}</a><br>
        {% if site.links.github %}<a href="{{ site.links.github }}"><i class="fa-brands fa-github"></i> GitHub</a><br>{% endif %}
      </p>
    </div>
    <div>
      <h5>Links</h5>
      <p>
        {% if site.links.google_scholar %}<a href="{{ site.links.google_scholar }}"><i class="ai ai-google-scholar"></i> Google Scholar</a><br>{% endif %}
        {% if site.links.researchgate %}<a href="{{ site.links.researchgate }}"><i class="ai ai-researchgate"></i> ResearchGate</a><br>{% endif %}
        <a href="https://github.com/sbryngelson/academic-website-template"><i class="fa-brands fa-github"></i> Use this template!</a>
      </p>
    </div>
  </div>
  <div class="footer-grid">
    <div class="footer-copyright" style="grid-column: 1 / -1;">
      &copy; {{ "now" | date: "%Y" }} {{ site.name | escape }}
    </div>
  </div>
</footer>

<script src="{{ "/assets/javascript/bootstrap/bootstrap.bundle.min.js" | relative_url }}"></script>
<script src="{{ "/assets/js/site.min.js" | relative_url }}"></script>
```

- [ ] **Step 4: Replace _includes/analytics.html**

Simplify to GA4 only:

```html
{% if site.analytics.google_id and site.analytics.google_id != "" %}
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.analytics.google_id }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.analytics.google_id }}');
</script>
{% endif %}
```

- [ ] **Step 5: Commit**

```bash
git add _includes/head.html _includes/header.html _includes/footer.html _includes/analytics.html
git commit -m "feat: modernize includes — Google Fonts, FA6, dark mode toggle, semantic footer"
```

---

## Task 9: Core Includes — sidebar.html (Profile Card)

**Files:**
- Modify: `_includes/sidebar.html`

- [ ] **Step 1: Replace _includes/sidebar.html**

```html
<div class="profile-card">
  <a href="{{ site.url }}{{ site.baseurl }}/about">
    <img src="{{ site.url }}{{ site.baseurl }}/images/{{ site.photo }}" class="profile-photo" alt="{{ site.name }}" loading="lazy">
  </a>
  <h4 class="profile-name">{{ site.name }}</h4>
  <p class="profile-title">{{ site.title }}</p>
  <p class="profile-institution">{{ site.institution }}</p>

  <div class="profile-links">
    {% if site.email %}<a href="mailto:{{ site.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
    {% if site.links.cv %}<a href="{{ site.url }}{{ site.baseurl }}/{{ site.links.cv }}" class="icon-link" title="CV"><i class="ai ai-cv"></i></a>{% endif %}
    {% if site.links.google_scholar %}<a href="{{ site.links.google_scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
    {% if site.links.github %}<a href="{{ site.links.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
    {% if site.links.researchgate %}<a href="{{ site.links.researchgate }}" class="icon-link" title="ResearchGate"><i class="ai ai-researchgate"></i></a>{% endif %}
    {% if site.links.orcid %}<a href="{{ site.links.orcid }}" class="icon-link" title="ORCID"><i class="ai ai-orcid"></i></a>{% endif %}
    {% if site.links.twitter %}<a href="{{ site.links.twitter }}" class="icon-link" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>{% endif %}
    {% if site.links.linkedin %}<a href="{{ site.links.linkedin }}" class="icon-link" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>{% endif %}
  </div>

  {% if site.data.pi[0].educationshort %}
  <ul style="text-align: left; margin-top: var(--space-4); list-style: none; padding-left: 0;">
    {% for education in site.data.pi[0].educationshort %}
    <li style="font-size: 0.875rem; color: var(--text-secondary); padding: var(--space-1) 0;">{{ education | replace: "-","&#8211;" }}</li>
    {% endfor %}
  </ul>
  {% endif %}
</div>

<div class="section-card" style="margin-top: var(--space-6);">
  <h4 style="margin-top: 0;">News</h4>

  <div class="news-timeline">
    {% for article in site.data.news limit:3 %}
    <div class="news-item">
      <div class="news-date">{{ article.date }}</div>
      <div class="news-headline">{{ article.headline }}</div>
    </div>
    {% endfor %}
  </div>

  <p style="margin-top: var(--space-4);"><a href="{{ site.url }}{{ site.baseurl }}/allnews.html">See all news &rarr;</a></p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add _includes/sidebar.html
git commit -m "feat: profile card sidebar using site config values"
```

---

## Task 10: Layouts — default, homelay, gridlay, and others

**Files:**
- Modify: `_layouts/default.html`
- Modify: `_layouts/homelay.html`
- Modify: `_layouts/gridlay.html`
- Modify: `_layouts/textlay.html`
- Modify: `_layouts/publications.html`
- Modify: `_layouts/research.html`
- Modify: `_layouts/team.html`
- Modify: `_layouts/page.html`
- Modify: `_layouts/post.html`
- Modify: `_layouts/piclay.html`

- [ ] **Step 1: Replace _layouts/default.html**

```html
<!DOCTYPE html>
<html lang="en">

  {% include head.html %}

  <body>

    {% include header.html %}

    <main class="site-container">
      {{ content }}
    </main>

    {% include footer.html %}

  </body>

</html>
```

- [ ] **Step 2: Replace _layouts/homelay.html**

```html
---
layout: default
---

<div class="home-grid">
  <div class="home-content">
    {{ content }}
  </div>

  <div>
    {% include sidebar.html %}
  </div>
</div>
```

- [ ] **Step 3: Replace _layouts/gridlay.html**

```html
---
layout: default
---

<div class="fade-in-section">
  {{ content }}
</div>
```

- [ ] **Step 4: Replace _layouts/textlay.html**

```html
---
layout: default
---

<div class="fade-in-section">
  {{ content }}
</div>
```

- [ ] **Step 5: Replace _layouts/publications.html**

```html
---
layout: default
---

<div class="fade-in-section">
  {{ content }}
</div>
```

- [ ] **Step 6: Replace _layouts/research.html**

```html
---
layout: default
---

<div class="fade-in-section">
  {{ content }}
</div>
```

- [ ] **Step 7: Replace _layouts/team.html**

```html
---
layout: default
---

<div class="fade-in-section">
  {{ content }}
</div>
```

- [ ] **Step 8: Replace _layouts/page.html**

```html
---
layout: default
---

<article>
  <h2>{{ page.title }}</h2>
  <div>
    {{ content }}
  </div>
</article>
```

- [ ] **Step 9: Replace _layouts/post.html**

```html
---
layout: default
---

<article itemscope itemtype="http://schema.org/BlogPosting">
  <h2 itemprop="name headline">{{ page.title | escape }}</h2>
  <p class="text-muted" style="font-size: 0.875rem;">
    <time datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">{{ page.date | date: "%b %-d, %Y" }}</time>
    {% if page.author %} &middot; <span itemprop="author">{{ page.author }}</span>{% endif %}
  </p>
  <div itemprop="articleBody">
    {{ content }}
  </div>
</article>
```

- [ ] **Step 10: Replace _layouts/piclay.html**

```html
---
layout: default
---

<div class="fade-in-section">
  {{ content }}
</div>
```

- [ ] **Step 11: Commit**

```bash
git add _layouts/
git commit -m "feat: modernize all layouts — site-container, CSS Grid home, fade-in sections"
```

---

## Task 11: Page Redesigns — Home, Team, About

**Files:**
- Modify: `_pages/home.md`
- Modify: `_pages/team.md`
- Modify: `_pages/about.md`

- [ ] **Step 1: Replace _pages/home.md**

```markdown
---
title: "Home"
layout: homelay
sitemap: false
permalink: /
---

### Welcome!

Theoretical physics is a branch of physics that focuses on the development of mathematical models and theories to understand and explain natural phenomena.
It plays a crucial role in our understanding of the fundamental laws of the universe and the fundamental particles that make up all matter.
Research in theoretical physics helps us to make predictions about how the universe works and to test these predictions through experiments.

<img src="{{ site.url }}{{ site.baseurl }}/images/banner.jpg" alt="Feynman diagrams" loading="lazy" style="width: 100%; border-radius: var(--radius-lg); margin: var(--space-6) 0;">

*Examples of Feynman diagrams. Feynman R., The theory of positrons. Phys. Rev. (1949)*

### About me

I am a physicist working in the field of quantum mechanics and quantum electrodynamics.
I received my undergraduate degree in physics from the Massachusetts Institute of Technology (MIT) in 1939 and went on to earn my PhD from Princeton University in 1942.
After completing my doctoral studies, I worked on the Manhattan Project, where I helped develop the first atomic bombs.
After the war, I returned to academia, holding teaching and research positions at Cornell and now at the California Institute of Technology.
```

- [ ] **Step 2: Replace _pages/team.md**

```markdown
---
title: "Team"
layout: gridlay
sitemap: false
permalink: /team/
---

## Team

**We are looking for new team members** [(see openings)]({{ site.url }}{{ site.baseurl }}/vacancies) **!**

## PI

<div class="section-card">
<div class="pi-card">
  <img src="{{ site.url }}{{ site.baseurl }}/images/{{ site.photo }}" class="pi-photo" alt="{{ site.name }}" loading="lazy">
  <div>
    <h3 class="pi-name">{{ site.name }}</h3>
    <p style="font-style: italic; color: var(--text-secondary);">{{ site.title }}, {{ site.institution }}</p>
    <div class="pi-links">
      {% if site.email %}<a href="mailto:{{ site.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
      {% if site.links.google_scholar %}<a href="{{ site.links.google_scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
      {% if site.links.cv %}<a href="{{ site.url }}{{ site.baseurl }}/{{ site.links.cv }}" class="icon-link" title="CV"><i class="ai ai-cv"></i></a>{% endif %}
      {% if site.links.github %}<a href="{{ site.links.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
      {% if site.links.researchgate %}<a href="{{ site.links.researchgate }}" class="icon-link" title="ResearchGate"><i class="ai ai-researchgate"></i></a>{% endif %}
    </div>
    {% if site.data.pi[0].education %}
    <ul style="margin-top: var(--space-4);">
      {% for education in site.data.pi[0].education %}
      <li>{{ education | replace: "-","&#8211;" }}</li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>
</div>
</div>

{% if site.data.team_members.size > 0 %}
## Current Students and Postdocs

<div class="team-grid">
{% for member in site.data.team_members %}
<div class="team-card">
  <img src="{{ site.url }}{{ site.baseurl }}/images/{{ member.photo }}" class="team-photo" alt="{{ member.name }}" loading="lazy">
  <h4 class="team-name">{{ member.name }}</h4>
  <p class="team-info">{{ member.info }}</p>
  <div class="team-links">
    {% if member.email %}<a href="mailto:{{ member.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
    {% if member.website %}<a href="{{ member.website }}" class="icon-link" title="Website"><i class="fa-solid fa-house"></i></a>{% endif %}
    {% if member.scholar %}<a href="{{ member.scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
    {% if member.github %}<a href="{{ member.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
  </div>
</div>
{% endfor %}
</div>
{% endif %}

{% if site.data.alumni.size > 0 %}
## Alumni

<div class="section-card">
<table class="alumni-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Duration</th>
      <th>Current Position</th>
    </tr>
  </thead>
  <tbody>
    {% for member in site.data.alumni %}
    <tr>
      <td>{{ member.name }}</td>
      <td>{{ member.duration }}</td>
      <td>{{ member.info }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>
{% endif %}

## Administrative Support

<a href="mailto:exampleemail@gmail.com">Example staff</a> is helping us (and other groups) with administration.
```

- [ ] **Step 3: Replace _pages/about.md**

```markdown
---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
---

## About

<div class="section-card">
<div class="pi-card">
  <img src="{{ site.url }}{{ site.baseurl }}/images/{{ site.photo }}" class="pi-photo" alt="{{ site.name }}" loading="lazy">
  <div>
    <h3 class="pi-name">{{ site.name }}</h3>
    <p style="font-style: italic; color: var(--text-secondary);">{{ site.title }}, {{ site.institution }}</p>
    <div class="pi-links">
      {% if site.email %}<a href="mailto:{{ site.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
      {% if site.links.cv %}<a href="{{ site.url }}{{ site.baseurl }}/{{ site.links.cv }}" class="icon-link" title="CV"><i class="ai ai-cv"></i></a>{% endif %}
      {% if site.links.google_scholar %}<a href="{{ site.links.google_scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
      {% if site.links.github %}<a href="{{ site.links.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
      {% if site.links.researchgate %}<a href="{{ site.links.researchgate }}" class="icon-link" title="ResearchGate"><i class="ai ai-researchgate"></i></a>{% endif %}
    </div>
    {% if site.data.pi[0].education %}
    <ul style="margin-top: var(--space-4);">
      {% for education in site.data.pi[0].education %}
      <li>{{ education | replace: "-","&#8211;" }}</li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>
</div>
</div>

{% if site.data.grants %}
<div class="section-card">
  <h3>Grants</h3>
  <ul>
    {% for grant in site.data.grants %}
    <li>{{ grant.name }}</li>
    {% endfor %}
  </ul>
</div>
{% endif %}

{% if site.data.awards %}
<div class="section-card">
  <h3>Awards</h3>
  <ul>
    {% for award in site.data.awards %}
    <li>{{ award.name | replace: "-","&#8211;" }}</li>
    {% endfor %}
  </ul>
</div>
{% endif %}

{% if site.data.people %}
<div class="section-card">
  <h3>Students and Mentoring</h3>
  <ul>
    {% for student in site.data.people %}
    <li>{{ student.name }}, {{ student.location }} ({{ student.degree }}, {{ student.year }})</li>
    {% endfor %}
  </ul>
</div>
{% endif %}

{% if site.data.funders %}
<div class="section-card">
  <h4>Sponsors</h4>
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--space-6);">
    {% for funder in site.data.funders %}
    <a href="{{ funder.url }}" target="_blank">
      <img src="{{ site.url }}{{ site.baseurl }}/images/{{ funder.image }}" alt="Funder logo" style="max-height: 80px; max-width: 200px; border-radius: 0;" loading="lazy">
    </a>
    {% endfor %}
  </div>
</div>
{% endif %}
```

- [ ] **Step 4: Commit**

```bash
git add _pages/home.md _pages/team.md _pages/about.md
git commit -m "feat: redesign home, team, and about pages with CSS Grid and cards"
```

---

## Task 12: Page Redesigns — Publications, Research, Software, Talks

**Files:**
- Modify: `_pages/publications.md`
- Modify: `_pages/research.md`
- Modify: `_pages/software.md`
- Modify: `_pages/talks.md`
- Modify: `_layouts/bibtemplate.html`

- [ ] **Step 1: Replace _pages/publications.md**

```markdown
---
title: "Publications"
layout: gridlay
sitemap: false
permalink: /publications/
---

## Publications

<input type="text" class="pub-search" id="pubSearch" placeholder="Filter by title, author, or year...">

<div class="section-card" id="pubList">

### Preprints
{% bibliography --query @unpublished %}

### Refereed Journal Articles
{% bibliography --query @article %}

### Refereed Conference Proceedings
{% bibliography --query @inproceedings %}

</div>
```

- [ ] **Step 2: Replace _layouts/bibtemplate.html**

```html
---
---

<div class="pub-entry" data-pub-searchable>
  <div class="text-justify">{{ reference }}</div>

  <!-- You can use the below to make your name bold -->
  <!-- <div class="text-justify">{{ reference | replace_first: 'Bryngelson, S. H.', '<b>Bryngelson, S. H.</b>' }}</div> -->

  {% assign bibtest = false %}
  {% if entry.file %}
  {% assign bibfile = "/papers/" | append: entry.file %}
  {% for file in site.static_files %}
    {% if file.path contains bibfile %}
     {% assign bibtest = true %}
    {% endif %}
  {% endfor %}
  {% endif %}

  <div class="pub-actions">
    {% if bibtest %}
    <a href="{{ site.url }}{{ site.baseurl }}/papers/{{ entry.file }}" target="_blank" class="btn-pill btn-pdf">PDF</a>
    {% endif %}

    {% if entry.doi %}
      {% if entry.type == 'unpublished' %}
      <a href="{{ entry.doi | prepend: 'https://arxiv.org/abs/' }}" target="_blank" class="btn-pill btn-arxiv">arXiv</a>
      {% else %}
      <a href="{{ entry.doi | prepend: 'http://doi.org/' }}" target="_blank" class="btn-pill btn-doi">DOI</a>
      {% endif %}
    {% endif %}

    {% if entry.type == 'unpublished' or entry.type == 'article' or entry.type == 'thesis' or entry.type == 'inproceedings' or entry.type == 'report' %}
    <button class="btn-pill btn-bib" data-toggle-target="bib-{{ entry.key }}">BIB</button>
    {% endif %}

    {% if entry.abstract %}
    <button class="btn-pill btn-abstract" data-toggle-target="abs-{{ entry.key }}">Abstract</button>
    {% endif %}
  </div>

  {% if entry.abstract %}
  <div class="pub-collapse" id="bib-{{ entry.key }}">
    <pre>{{ entry.bibtex | remove: "entry.abstract" }}</pre>
  </div>
  {% else %}
  <div class="pub-collapse" id="bib-{{ entry.key }}">
    <pre>{{ entry.bibtex }}</pre>
  </div>
  {% endif %}

  {% if entry.abstract %}
  <div class="pub-collapse" id="abs-{{ entry.key }}">
    <pre>{{ entry.abstract }}</pre>
  </div>
  {% endif %}
</div>
```

- [ ] **Step 3: Replace _pages/research.md**

```markdown
---
title: "Research"
layout: gridlay
sitemap: false
permalink: /research/
---

## Research

<div class="research-grid">

<div class="research-card">
  <div class="research-body">
    <h4 class="research-title">Example Research</h4>
    <p class="research-desc">Example description of your research area. Replace this with a summary of your work.</p>
  </div>
</div>

</div>
```

- [ ] **Step 4: Replace _pages/software.md**

```markdown
---
title: "Software"
layout: gridlay
sitemap: false
permalink: /software/
---

## Software

<div class="section-card">
  <h4>Example Software</h4>
  <div class="pub-actions" style="margin-bottom: var(--space-3);">
    <a href="https://example.com" target="_blank" class="btn-pill btn-website">Website</a>
    <a href="https://github.com" target="_blank" class="btn-pill btn-git">Git</a>
    <a href="{{ site.url }}{{ site.baseurl }}/papers/example_proceeding.pdf" target="_blank" class="btn-pill btn-paper">Paper</a>
  </div>
  <p><strong>Authors:</strong> <em>Example authors</em></p>
  <p>Example software description.</p>
</div>
```

- [ ] **Step 5: Replace _pages/talks.md**

```markdown
---
title: "Talks"
layout: gridlay
sitemap: false
permalink: /talks/
---

## Talks

<div class="section-card" id="pubList">

### Invited Talks
{% bibliography --query @incollection[keywords ^= invited] %}

### Regular Talks
{% bibliography --query @incollection[keywords != invited] %}

</div>
```

- [ ] **Step 6: Commit**

```bash
git add _pages/publications.md _pages/research.md _pages/software.md _pages/talks.md _layouts/bibtemplate.html
git commit -m "feat: redesign publications, research, software, talks pages"
```

---

## Task 13: Page Redesigns — Teaching, News, Blogs, 404

**Files:**
- Modify: `_pages/teaching.md`
- Modify: `_pages/allnews.md`
- Modify: `_pages/blogs.md`
- Modify: `_pages/404.md`

- [ ] **Step 1: Replace _pages/teaching.md**

```markdown
---
title: "Teaching"
layout: gridlay
sitemap: false
permalink: /teaching/
---

## Teaching

<div class="section-card">
  <ul>
    <li>Introduction to Physics (1961&#8211;63) <a href="https://www.feynmanlectures.caltech.edu/">Textbook here!</a></li>
  </ul>
</div>
```

- [ ] **Step 2: Replace _pages/allnews.md**

```markdown
---
title: "News"
layout: gridlay
sitemap: false
permalink: /allnews.html
---

## News

<div class="section-card">
  <div class="news-timeline">
    {% for article in site.data.news %}
    <div class="news-item">
      <div class="news-date">{{ article.date }}</div>
      <div class="news-headline">{{ article.headline }}</div>
    </div>
    {% endfor %}
  </div>
</div>
```

- [ ] **Step 3: Replace _pages/blogs.md**

```markdown
---
title: "Blog"
layout: gridlay
sitemap: false
permalink: /blogs/
---

## Blog

{% if site.posts.size > 0 %}
<div class="section-card">
  {% for post in site.posts %}
  <div class="news-item" style="padding: var(--space-4) 0; {% unless forloop.last %}border-bottom: 1px solid var(--border-color);{% endunless %}">
    <div class="news-date">{{ post.date | date: "%b %-d, %Y" }}</div>
    <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" style="font-weight: 600;">{{ post.title }}</a>
  </div>
  {% endfor %}
</div>
{% else %}
<p class="text-muted">No blog posts yet.</p>
{% endif %}
```

- [ ] **Step 4: Replace _pages/404.md**

```markdown
---
title: "Page Not Found"
layout: gridlay
sitemap: false
permalink: /404.html
---

<div class="section-card" style="text-align: center; padding: var(--space-16);">
  <h1 style="font-size: 4rem; margin-bottom: var(--space-4);">404</h1>
  <p>The page you're looking for doesn't exist.</p>
  <a href="{{ site.url }}{{ site.baseurl }}/" class="btn-pill btn-doi" style="margin-top: var(--space-4); display: inline-block;">Go Home</a>
</div>
```

- [ ] **Step 5: Commit**

```bash
git add _pages/teaching.md _pages/allnews.md _pages/blogs.md _pages/404.md
git commit -m "feat: redesign teaching, news, blog, and 404 pages"
```

---

## Task 14: JavaScript — site.js

**Files:**
- Create: `assets/js/site.js`
- Create: `assets/js/site.min.js`

- [ ] **Step 1: Create assets/js/site.js**

```javascript
// =============================================================
// site.js — Dark mode, publication filter, toggles, scroll effects
// =============================================================

(function () {
  'use strict';

  // ----- Dark Mode Toggle -----

  var toggle = document.getElementById('darkModeToggle');
  var icon = document.getElementById('themeIcon');

  function updateIcon() {
    if (!icon) return;
    var theme = document.documentElement.getAttribute('data-bs-theme');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon';
    } else {
      icon.className = 'fa-solid fa-sun';
    }
  }

  if (toggle) {
    // Set initial icon state
    updateIcon();

    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-bs-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      updateIcon();
    });
  }

  // ----- Publication Expand/Collapse -----

  document.addEventListener('click', function (e) {
    var button = e.target.closest('[data-toggle-target]');
    if (!button) return;

    var targetId = button.getAttribute('data-toggle-target');
    var target = document.getElementById(targetId);
    if (!target) return;

    target.classList.toggle('show');
  });

  // ----- Publication Search/Filter -----

  var searchInput = document.getElementById('pubSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      var entries = document.querySelectorAll('[data-pub-searchable]');

      entries.forEach(function (entry) {
        if (!query) {
          entry.style.display = '';
          return;
        }
        var text = entry.textContent.toLowerCase();
        entry.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // ----- Navbar Scroll Shadow -----

  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var scrollThreshold = 10;
    window.addEventListener('scroll', function () {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ----- Fade-in on Scroll -----

  var fadeElements = document.querySelectorAll('.fade-in-section');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
```

- [ ] **Step 2: Build the minified version**

Run: `cd /Users/spencer/Downloads/academic-website-template && npx esbuild assets/js/site.js --bundle --minify --outfile=assets/js/site.min.js`
Expected: `assets/js/site.min.js` created

- [ ] **Step 3: Verify site.min.js exists and is smaller**

Run: `wc -c assets/js/site.js assets/js/site.min.js`
Expected: site.min.js is smaller than site.js

- [ ] **Step 4: Commit**

```bash
git add assets/js/
git commit -m "feat: add site.js — dark mode, pub filter, toggles, scroll effects"
```

---

## Task 15: Image Directory Structure

**Files:**
- Create: `images/team/.gitkeep`
- Create: `images/research/.gitkeep`
- Create: `images/banner/.gitkeep`

- [ ] **Step 1: Create image subdirectories**

```bash
mkdir -p images/team images/research images/banner
touch images/team/.gitkeep images/research/.gitkeep images/banner/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add images/team/.gitkeep images/research/.gitkeep images/banner/.gitkeep
git commit -m "chore: add image subdirectories for team, research, banner"
```

---

## Task 16: Setup Script

**Files:**
- Create: `setup.sh`

- [ ] **Step 1: Create setup.sh**

```bash
#!/usr/bin/env bash
set -e

# =============================================================
# Academic Website Template — Quick Setup
# =============================================================

echo ""
echo "============================================="
echo "  Academic Website Template — Quick Setup"
echo "============================================="
echo ""

# Check for old-style config (migration detection)
if grep -q "^affiliation:" _config.yml 2>/dev/null; then
  echo "It looks like you have an old-style _config.yml."
  echo "See UPGRADING.md for migration instructions."
  echo ""
  exit 1
fi

# Gather info
read -rp "Your full name: " NAME
read -rp "Your title (e.g., Professor of Physics): " TITLE
read -rp "Your institution: " INSTITUTION
read -rp "Your email: " EMAIL

echo ""
echo "Updating _config.yml..."

# Use sed to replace placeholder values
sed -i.bak "s/^name: .*/name: \"$NAME\"/" _config.yml
sed -i.bak "s/^title: .*/title: \"$TITLE\"/" _config.yml
sed -i.bak "s/^institution: .*/institution: \"$INSTITUTION\"/" _config.yml
sed -i.bak "s/^email: .*/email: $EMAIL/" _config.yml
rm -f _config.yml.bak

echo "Done!"
echo ""
echo "============================================="
echo "  Next steps:"
echo "============================================="
echo ""
echo "  1. Add your profile photo to images/"
echo "     (update 'photo' in _config.yml to match)"
echo ""
echo "  2. Add your links in _config.yml (Step 2)"
echo ""
echo "  3. Edit your publications in assets/ref.bib"
echo ""
echo "  4. Customize data files in _data/"
echo "     (team_members.yml, news.yml, etc.)"
echo ""
echo "  5. Preview your site:"
echo "     bundle exec jekyll serve"
echo ""
```

- [ ] **Step 2: Make setup.sh executable**

Run: `chmod +x setup.sh`

- [ ] **Step 3: Commit**

```bash
git add setup.sh
git commit -m "feat: add interactive setup script for new users"
```

---

## Task 17: Remove Old Files

**Files:**
- Remove: `switch_theme.sh`
- Remove: `update_bootstrap.sh`

- [ ] **Step 1: Remove old scripts**

```bash
git rm switch_theme.sh update_bootstrap.sh
```

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: remove switch_theme.sh and update_bootstrap.sh"
```

---

## Task 18: UPGRADING.md

**Files:**
- Create: `UPGRADING.md`

- [ ] **Step 1: Create UPGRADING.md**

```markdown
# Upgrading from the Previous Template

If you're already using the old version of this template, follow these steps to migrate.

## 1. Update _config.yml

The new config uses a simplified format. Move these fields:

**Old format (remove):**
```yaml
title: Richard Feynman
affiliation: >
  Richard Feynman<br/>
  Professor of Physics<br/>
  California Institute of Technology
location: >
  ...
contact: >
  ...
```

**New format (add):**
```yaml
name: "Richard Feynman"
title: "Professor of Physics"
institution: "California Institute of Technology"
email: richard@university.edu
photo: headshot.jpg
links:
  google_scholar: "..."
  github: "..."
accent_color: "#2563eb"
dark_mode: true
analytics:
  google_id: ""
```

## 2. Update _data/pi.yml

Basic PI info (name, photo, email, links) now lives in `_config.yml`. The `pi.yml` file only needs education data:

```yaml
- education:
    - "(1942) Ph.D. Physics, Princeton University"
  educationshort:
    - "(1942) Ph.D. Physics, Princeton"
```

## 3. Organize Images (Optional)

New subdirectories are available:
- `images/team/` — team member photos
- `images/research/` — research thumbnails
- `images/banner/` — banner images

Your existing flat `images/` structure still works.

## 4. Data Files

Field names in `team_members.yml`, `alumni.yml`, `news.yml`, etc. are unchanged. Your existing data files should work as-is.

## 5. Publications

`assets/ref.bib` format is unchanged. Jekyll Scholar config stays in `_config.yml`. Update the `scholar.last_name` and `scholar.first_name` fields.

## 6. Custom CSS

If you added custom CSS to `SHB_css.scss`, move it to a new file in `_sass/` and import it in `assets/main.scss`.

## 7. Install & Test

```bash
bundle install
npm install        # only if you want to modify JS
bundle exec jekyll serve
```
```

- [ ] **Step 2: Commit**

```bash
git add UPGRADING.md
git commit -m "docs: add migration guide for existing users"
```

---

## Task 19: Update README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Read current README**

Read the full `README.md` to understand the structure before modifying. The update should:
- Keep the list of example sites (social proof)
- Rewrite the setup instructions to reference the new `setup.sh` and numbered `_config.yml` steps
- Update the customization section to reference the new file structure
- Mention dark mode, the new design, and the build pipeline
- Keep the hosting and alternatives sections

- [ ] **Step 2: Edit README.md — update the quick start section**

Find the existing installation/setup section and replace it with instructions that reference:
1. Fork the repo
2. Run `./setup.sh` for quick config
3. Or manually edit `_config.yml` (Steps 1-4)
4. Edit data files in `_data/`
5. Add publications to `assets/ref.bib`
6. Run `bundle exec jekyll serve`

Also add a "Features" section mentioning: dark mode, responsive design, CSS Grid layouts, Inter font, publication search, setup script.

Add a "Customization" section explaining: `npm run build` for JS changes, SASS modules in `_sass/`, accent color in config.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README with new setup flow and features"
```

---

## Task 20: Final Build Verification

- [ ] **Step 1: Run full Jekyll build**

Run: `cd /Users/spencer/Downloads/academic-website-template && bundle exec jekyll build 2>&1`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run Jekyll serve and verify in browser**

Run: `cd /Users/spencer/Downloads/academic-website-template && bundle exec jekyll serve &`
Then verify: open `http://localhost:4000` in browser. Check:
- Home page loads with two-column layout
- Profile card shows on right side
- Dark mode toggle works
- Publications page has search bar
- Team page shows card grid
- All nav links work
- Footer shows correctly
- Mobile responsive (resize browser)

- [ ] **Step 3: Fix any build errors or visual issues**

Address any problems found during verification.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address build verification issues"
```
