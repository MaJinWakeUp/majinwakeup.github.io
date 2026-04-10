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
