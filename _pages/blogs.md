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
<div class="news-item" style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
<div class="news-date">{{ post.date | date: "%b %-d, %Y" }}</div>
<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" style="font-weight: 600;">{{ post.title }}</a>
</div>
{% endfor %}
</div>
{% else %}
<p class="text-muted">No blog posts yet.</p>
{% endif %}
