---
title: "About"
layout: gridlay
permalink: /about/
---

## About

<div class="section-card" markdown="0">
<div class="pi-card">
<img src="{{ site.baseurl }}/images/{{ site.photo }}" class="pi-photo" alt="{{ site.name }}" loading="lazy">
<div>
<h3 class="pi-name">{{ site.name }}</h3>
<p style="font-style: italic; color: var(--text-secondary);">{{ site.title }}, {{ site.institution }}</p>
<div class="pi-links">
{% if site.email %}<a href="mailto:{{ site.email }}" class="icon-link" title="Email" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
{% if site.links.cv and site.links.cv != "" %}<a href="{{ site.baseurl }}/{{ site.links.cv }}" class="icon-link" title="CV" aria-label="CV"><i class="ai ai-cv"></i></a>{% endif %}
{% if site.links.google_scholar and site.links.google_scholar != "" %}<a href="{{ site.links.google_scholar }}" class="icon-link" title="Google Scholar" aria-label="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
{% if site.links.github and site.links.github != "" %}<a href="{{ site.links.github }}" class="icon-link" title="GitHub" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
{% if site.links.linkedin and site.links.linkedin != "" %}<a href="{{ site.links.linkedin }}" class="icon-link" title="LinkedIn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>{% endif %}
{% if site.links.researchgate and site.links.researchgate != "" %}<a href="{{ site.links.researchgate }}" class="icon-link" title="ResearchGate" aria-label="ResearchGate"><i class="ai ai-researchgate"></i></a>{% endif %}
{% if site.links.orcid and site.links.orcid != "" %}<a href="{{ site.links.orcid }}" class="icon-link" title="ORCID" aria-label="ORCID"><i class="ai ai-orcid"></i></a>{% endif %}
</div>
</div>
</div>
</div>

<div class="section-card" style="border-left: 3px solid var(--accent); padding-left: var(--space-6); background-color: var(--bg-secondary);">
  <p style="font-style: italic; color: var(--text-primary); font-size: 1.05rem; line-height: 1.6; margin-bottom: 0;">
    "This is my personal 'long west journey.' Much like Xuanzang’s legendary pilgrimage to the West, my trek through academia has been filled with trials, unexpected hurdles (mostly paper rejections and dead-end ideas), and a persistent quest for the sacred scrolls of knowledge (or at least, a PhD)."
  </p>
</div>

<div class="section-card">
<h3>Education</h3>
<ul>
{% for education in site.data.pi[0].education %}
<li>{{ education | replace: "-","&#8211;" }}</li>
{% endfor %}
</ul>
</div>

<div class="section-card">
<h3>Work Experience</h3>
<ul>
<li>Algorithm Engineer, Chengdu Hsintiao Medical and Technology Company (October 2020 &#8211; July 2021)</li>
<li>R&amp;D Engineer, Southeast Research Institute, China Unicom (August 2019 &#8211; September 2020)</li>
</ul>
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
<div class="sponsor-logos" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--space-6);">
{% for funder in site.data.funders %}
<a href="{{ funder.url }}" target="_blank"><img src="{{ site.baseurl }}/images/{{ funder.image }}" alt="Funder logo" style="max-height: 80px; max-width: 200px; border-radius: 0;" loading="lazy"></a>
{% endfor %}
</div>
</div>
{% endif %}
