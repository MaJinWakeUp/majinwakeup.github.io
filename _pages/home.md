---
title: "Home"
layout: homelay
sitemap: false
permalink: /
---

<h2 class="home-hero">{{ site.name }}</h2>
<p class="home-hero-sub">{{ site.title }}, {{ site.institution }}</p>

<div class="chip-container" markdown="0">
<a href="{{ site.url }}{{ site.baseurl }}/publications" class="chip">Trustworthy AI</a>
<a href="{{ site.url }}{{ site.baseurl }}/publications" class="chip">AI for Security</a>
<a href="{{ site.url }}{{ site.baseurl }}/publications" class="chip">Adversarial Attacks &amp; Defenses</a>
<a href="{{ site.url }}{{ site.baseurl }}/publications" class="chip">LLMs for Cyber Harassment Detection</a>
<a href="{{ site.url }}{{ site.baseurl }}/publications" class="chip">Biometric Authentication</a>
</div>

Can we truly trust the AI systems we increasingly rely on? The gap between what AI can do and how easily it can be fooled or misused is what inspires my work toward intelligent systems that are **secure, reliable, and worthy of trust**.

<!-- Looking for an internship? Uncomment and update this callout when you are on the market.
<div class="callout callout-success" markdown="0">
<div class="callout-title"><i class="fa-solid fa-award callout-icon"></i> Looking for internship &mdash; Summer 2026</div>
<p>I am actively seeking internship opportunities for Summer 2026. Feel free to reach out via <a href="mailto:{{ site.email }}">email</a> or take a look at my <a href="{{ site.url }}{{ site.baseurl }}/{{ site.links.cv }}">CV</a>.</p>
</div>
-->

<!-- Banner image from the template demo — drop a banner.jpg in images/ to use this, otherwise leave commented.
<div class="banner-frame" markdown="0">
<img src="{{ site.url }}{{ site.baseurl }}/images/banner.jpg" alt="Banner" loading="lazy">
<div class="banner-caption">Caption goes here.</div>
</div>
-->

### About me

I am currently a third-year Ph.D. student in the School of Computing at Clemson University.
My interests span adversarial attacks and defenses of perception systems, cyber harassment detection using large language models, and ML-enabled biometric authentication.
Before Clemson, I earned my M.S. in Software Engineering and B.S. in Information and Computing Science at Xi'an Jiaotong University, and worked as an engineer in industry.

<div class="section-card" markdown="0">
<h3>Education</h3>
<ul>
{% for education in site.data.pi[0].education %}
<li>{{ education | replace: "-","&#8211;" }}</li>
{% endfor %}
</ul>
</div>

<div class="section-card" markdown="0">
<h3>Work Experience</h3>
<ul>
<li>Algorithm Engineer, Chengdu Hsintiao Medical and Technology Company (October 2020 &#8211; July 2021)</li>
<li>R&amp;D Engineer, Southeast Research Institute, China Unicom (August 2019 &#8211; September 2020)</li>
</ul>
</div>
