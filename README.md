# A website template for academics

## Features

* **Modern design** — Inter font, responsive CSS Grid layouts, smooth animations
* **Dark mode** — toggle in navbar, respects system preference, persists across visits
* **Publication management** — auto-generated from BibTeX via Jekyll Scholar, with search/filter
* **Easy setup** — run `./setup.sh` or edit the numbered steps in `_config.yml`
* **Responsive** — works on desktop, tablet, and mobile
* **Fontawesome 6 + Academicons** — email, CV, Google Scholar, GitHub, ORCID, and more
* **Pill-style action buttons** — PDF, DOI, arXiv, BIB, Abstract with smooth expand/collapse

## Quick Start

1. **Fork** [this repository](https://github.com/sbryngelson/academic-website-template)
2. **Install** [Jekyll](https://jekyllrb.com/docs/installation/) and run `bundle install`
3. **Configure** your site — either:
   * Run `./setup.sh` for an interactive setup, or
   * Edit `_config.yml` directly (follow Steps 1–4 in the file)
4. **Add your publications** to `assets/ref.bib`
5. **Customize** data files in `_data/` (team members, news, awards, etc.)
6. **Preview** with `bundle exec jekyll serve` at `localhost:4000`

## Customization

### _config.yml

The config file is organized into 4 numbered steps:
1. **Your Identity** — name, title, institution, email, photo
2. **Your Links** — Google Scholar, GitHub, ORCID, Twitter, LinkedIn, CV
3. **Site Settings** — accent color, dark mode toggle, analytics
4. **Your Pages** — comment out any pages you don't need

### Data Files (_data/)

| File | Purpose |
|------|---------|
| `team_members.yml` | Current students and postdocs |
| `alumni.yml` | Former lab members |
| `news.yml` | News items (3 most recent shown on home) |
| `awards.yml` | Awards and honors |
| `grants.yml` | Grants and funding |
| `funders.yml` | Funder logos |
| `people.yml` | Students and mentees |
| `pi.yml` | Optional: detailed education for About page |

Each file has inline comments explaining every field.

### Pages

All pages are in `_pages/`. Edit the Markdown content directly. Pages use the `gridlay` layout by default — see `_layouts/` for other options.

### Accent Color & Dark Mode

Set `accent_color` in `_config.yml` to change the theme color (links, buttons, highlights). Set `dark_mode: false` to disable the dark mode toggle.

### Advanced: CSS & JS Customization

The site uses modular SASS in `_sass/` (base, components, layouts, utilities). To modify:

1. Edit files in `_sass/` — changes are picked up by Jekyll's SASS compiler
2. For JavaScript changes, edit `assets/js/site.js` then run `npm run build`
3. Pre-built JS is committed, so `npm` is only needed if you modify the JS source

## Publications

Publications are managed via [Jekyll Scholar](https://github.com/inukshuk/jekyll-scholar) using BibTeX. Edit `assets/ref.bib` with your references. The publications page includes a search bar for filtering by title, author, or year.

Update `scholar.last_name` and `scholar.first_name` in `_config.yml` to auto-bold your name.

## Hosting

### GitHub Pages

Fork this repo as `your_username.github.io` and push. GitHub Pages will build and host it automatically. Note: Jekyll Scholar requires building locally — use the `Rakefile` or a GitHub Action.

### Custom Domain

Purchase a domain, update the `CNAME` file, and configure DNS to point to GitHub Pages. See [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

### Self-Hosting

Build locally with `bundle exec jekyll serve`, then upload the `_site/` directory to your server. Set `url` and `baseurl` in `_config.yml` accordingly.

## Upgrading

If you're coming from the previous version of this template, see [UPGRADING.md](UPGRADING.md) for migration instructions.

## Users

Some users:
<a href="https://ilafly.github.io/" target="_blank">★</a>
<a href="https://i-vesseg.github.io/" target="_blank">★</a>
<a href="https://xfangsn.github.io/" target="_blank">★</a>
<a href="https://joshuagob.github.io" target="_blank">★</a>
<a href="https://bczheng.com/" target="_blank">★</a>
<a href="https://bazilinskyy.github.io/" target="_blank">★</a>
<a href="https://www.coreytcallaghan.com/" target="_blank">★</a>
<a href="https://minseoksong.github.io/" target="_blank">★</a>
<a href="https://acme-group-cmu.github.io/" target="_blank">★</a>
<a href="https://barrylee36.github.io/" target="_blank">★</a>
<a href="https://adisun94.github.io/" target="_blank">★</a>
<a href="https://comp-physics.group" target="_blank">★</a>
<a href="https://spike.doc.ic.ac.uk/" target="_blank">★</a>
<a href="http://www.msc.univ-paris-diderot.fr/~berhanu/" target="_blank">★</a>
<a href="https://mashadab.github.io/" target="_blank">★</a>
<a href="https://home.iitk.ac.in/~lalit/" target="_blank">★</a>
<a href="https://ethan-pickering.github.io/" target="_blank">★</a>
<a href="https://pedro-dm-gomes.github.io/" target="_blank">★</a>
<a href="https://3tbk.github.io/3tbk/" target="_blank">★</a>
<a href="https://felipesua.github.io/" target="_blank">★</a>
<a href="https://shivvrat.github.io/" target="_blank">★</a>
<a href="https://ritamraha.github.io/" target="_blank">★</a>
<a href="https://matsesseldeurs.github.io/" target="_blank">★</a>
<a href="https://michelleblom.github.io/" target="_blank">★</a>
<a href="https://jrd971000.github.io/" target="_blank">★</a>
<a href="https://melashri.net/" target="_blank">★</a>
<a href="https://sahatulika15.github.io" target="_blank">★</a>
<a href="https://mzhanglab.github.io" target="_blank">★</a>
<a href="https://soar-lab.github.io" target="_blank">★</a>
<a href="https://azharghafoor.github.io/" target="_blank">★</a>
<a href="https://hyunwoo.info/" target="_blank">★</a>
<a href="https://computervision0.github.io/" target="_blank">★</a>
<a href="https://adrashid.github.io/personal-webpage/index.html" target="_blank">★</a>
<a href="https://aleemkhan62.github.io/" target="_blank">★</a>
<a href="https://vaibhavb007.github.io/" target="_blank">★</a>
<a href="https://gabry993.github.io/" target="_blank">★</a>
<a href="https://shantnuu.github.io/" target="_blank">★</a>
<a href="https://wenbinluomath.github.io/" target="_blank">★</a>
<a href="https://aibio-lab.github.io/" target="_blank">★</a>
<a href="https://shantnuu.github.io/" target="_blank">★</a>
<a href="https://wenbinluomath.github.io/" target="_blank">★</a>
<a href="https://dartsushi.github.io/" target="_blank">★</a>
<a href="https://efstathia-soufleri.github.io/" target="_blank">★</a>
<a href="https://zchoffin.github.io/" target="_blank">★</a>
<a href="https://wangyb97.github.io/" target="_blank">★</a>
<a href="https://sgleem.github.io/" target="_blank">★</a>
<a href="https://has97.github.io/" target="_blank">★</a>
<a href="https://albertgassol1.github.io/" target="_blank">★</a>
<a href="https://seanpark05.github.io/" target="_blank">★</a>
<a href="https://miki998.github.io/" target="_blank">★</a>
<a href="https://wilfonba.github.io/" target="_blank">★</a>
<a href="https://saharnazb.github.io/" target="_blank">★</a>
<a href="https://mvmacfarlane.github.io/" target="_blank">★</a>
<a href="https://saharnaz.org/" target="_blank">★</a>
<a href="https://www.isnicholas.com/" target="_blank">★</a>
<a href="https://jojox666.github.io/" target="_blank">★</a>
<a href="https://wenbinluomath.github.io/" target="_blank">★</a>
<a href="https://dartsushi.github.io/" target="_blank">★</a>
<a href="https://zhiyu7.github.io/" target="_blank">★</a>
<a href="https://awen-li.github.io/" target="_blank">★</a>
<a href="https://yukiiwong.github.io/" target="_blank">★</a>
<a href="https://joeyleehk.github.io/" target="_blank">★</a>
<a href="https://fabayocbocjr.github.io/" target="_blank">★</a>
<a href="https://www.quantumcookie.xyz/" target="_blank">★</a>
<a href="https://adityanandy.github.io/" target="_blank">★</a>
<a href="https://jlastro.github.io/" target="_blank">★</a>
<a href="https://yunzhe-li.top/" target="_blank">★</a>
<a href="https://xia-hu.github.io/" target="_blank">★</a>
<a href="https://p-bajpai.github.io/" target="_blank">★</a>
<a href="https://zchoffin.github.io/" target="_blank">★</a>

__If you are using this template, feel free to share your site with me, and I'll add it here!__

## Alternatives

* [Minimal mistakes](https://mmistakes.github.io/minimal-mistakes/)
* [al-folio](https://github.com/alshedivat/al-folio)
* [academicpages](https://academicpages.github.io/)

## Acknowledgment

I credit the [Allen Lab](https://www.allanlab.org/) for creating a beautiful academic research group webpage. Many parts of this site were adopted or copied from their laboratory webpage.

## License

MIT
