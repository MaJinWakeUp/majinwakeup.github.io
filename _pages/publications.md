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
