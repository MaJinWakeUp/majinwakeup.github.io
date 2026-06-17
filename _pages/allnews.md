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
<span class="news-date">{{ article.date }}</span>
{% if article.type %}<span class="news-tag {{ article.type }}">{{ article.tag | default: article.type }}</span>{% endif %}
<span class="news-headline">{{ article.headline }}</span>
</div>
{% endfor %}
</div>
</div>
