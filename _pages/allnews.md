---
title: "News"
layout: gridlay
sitemap: false
permalink: /allnews.html
---

## News

<div class="section-card" markdown="0">
<div class="news-timeline">
{% for article in site.data.news %}
<div class="news-item">
<div class="news-date">{{ article.date }}</div>
{% if article.type %}<span class="news-tag {{ article.type }}">{{ article.tag | default: article.type }}</span><br>{% endif %}
<div class="news-headline">{{ article.headline }}</div>
</div>
{% endfor %}
</div>
</div>
