---
title: "Publications"
layout: gridlay
sitemap: false
permalink: /publications/
---

## Publications

<input type="text" class="pub-search" id="pubSearch" placeholder="Filter by title, author, or year...">

<div class="section-card" id="pubList">
<h3>Preprints</h3>

{% bibliography --query @unpublished %}

<!-- No journal articles yet. Uncomment once you add @article entries to assets/ref.bib.
<h3>Refereed Journal Articles</h3>

{% bibliography --query @article %}
-->

<h3>Refereed Conference Proceedings</h3>

{% bibliography --query @inproceedings %}
</div>
