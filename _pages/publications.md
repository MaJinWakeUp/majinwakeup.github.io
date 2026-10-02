---
title: "Publications"
layout: gridlay
permalink: /publications/
---

## Publications

<p>Citation summary (September 2026): 760+ citations, h-index 11, i10-index 11. See <a href="{{ site.links.google_scholar }}">Google Scholar</a> for current metrics.</p>

<input type="text" class="pub-search" id="pubSearch" placeholder="Filter by title, author, or year..." aria-label="Filter publications by title, author, or year">

<div class="section-card" id="pubList">
<h3>Journal Papers</h3>

{% bibliography --query @article %}

<h3>Conference and Workshop Papers</h3>

{% bibliography --query @inproceedings %}

<h3>Preprints</h3>

{% bibliography --query @unpublished %}
</div>
