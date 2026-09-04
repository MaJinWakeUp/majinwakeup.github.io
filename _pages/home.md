---
title: "Home"
layout: homelay
permalink: /
---

<h2 class="home-hero">{{ site.name }}</h2>
<p class="home-hero-sub">{{ site.title }}, {{ site.institution }}</p>

<div class="chip-container" markdown="0">
<a href="{{ site.baseurl }}/publications" class="chip">Trustworthy AI</a>
<a href="{{ site.baseurl }}/publications" class="chip">AI for Security</a>
<a href="{{ site.baseurl }}/publications" class="chip">Adversarial Attacks &amp; Defenses</a>
<a href="{{ site.baseurl }}/publications" class="chip">LLMs for Cyber Harassment Detection</a>
<a href="{{ site.baseurl }}/publications" class="chip">Biometric Authentication</a>
</div>

Can we truly trust the AI systems we increasingly rely on? The gap between what AI can do and how easily it can be fooled or misused is what inspires my work toward intelligent systems that are **secure, reliable, and worthy of trust**.

<div class="callout callout-success" markdown="0">
<div class="callout-title"><i class="fa-solid fa-briefcase callout-icon"></i> Seeking Faculty and Research Opportunities &mdash; Fall 2027</div>
<p>I am exploring faculty and research-oriented career opportunities beginning in Fall 2027. Please contact me via <a href="mailto:{{ site.email }}">email</a> or review my <a href="{{ site.baseurl }}/{{ site.links.cv }}">CV</a> for additional information.</p>
</div>

<blockquote class="hawking-quote" markdown="0">
  <p class="quote-text">“Things were going fairly well. I had become engaged to a very nice girl, Jane Wilde. But in order to get married, I needed a job, and in order to get a job, I needed a PhD.”</p>
  <cite class="quote-author">— Stephen Hawking, <span class="book-title">My Brief History</span></cite>
</blockquote>

{% comment %} Dynamic Badge Gallery Banner — Two-Line Marquee {% endcomment %}
<div class="badge-banner-container banner-dynamic" markdown="0">
  <!-- Row 1: Universities (XJTU, CSU, Clemson, SUTD) -->
  <div class="marquee-row">
    <div class="marquee-track">
      <div class="marquee-group">
        {% for badge in site.data.badges.row1 %}
          <div class="badge-card {{ badge.class }}" style="--badge-color: {{ badge.color }}; animation-delay: {{ forloop.index | times: 0.5 }}s;" title="{{ badge.name }}">
            {% if badge.image %}
              <img src="{{ site.baseurl }}/{{ badge.image }}" alt="{{ badge.name }}" class="badge-logo" loading="lazy">
            {% else %}
              <i class="{{ badge.icon }} badge-fa-icon"></i>
            {% endif %}
          </div>
        {% endfor %}
      </div>
      <!-- Duplicate for seamless loop -->
      <div class="marquee-group" aria-hidden="true">
        {% for badge in site.data.badges.row1 %}
          <div class="badge-card {{ badge.class }}" style="--badge-color: {{ badge.color }}; animation-delay: {{ forloop.index | times: 0.5 }}s;" title="{{ badge.name }}">
            {% if badge.image %}
              <img src="{{ site.baseurl }}/{{ badge.image }}" alt="{{ badge.name }}" class="badge-logo" loading="lazy">
            {% else %}
              <i class="{{ badge.icon }} badge-fa-icon"></i>
            {% endif %}
          </div>
        {% endfor %}
      </div>
    </div>
  </div>

  <!-- Row 2: Icons (AI Security, Bio Auth, CV, China Unicom) -->
  <div class="marquee-row" style="margin-top: var(--space-4);">
    <div class="marquee-track">
      <div class="marquee-group">
        {% for badge in site.data.badges.row2 %}
          <div class="badge-card {{ badge.class }}" style="--badge-color: {{ badge.color }}; animation-delay: {{ forloop.index | times: 0.5 }}s;" title="{{ badge.name }}">
            {% if badge.image %}
              <img src="{{ site.baseurl }}/{{ badge.image }}" alt="{{ badge.name }}" class="badge-logo" loading="lazy">
            {% else %}
              <i class="{{ badge.icon }} badge-fa-icon"></i>
            {% endif %}
          </div>
        {% endfor %}
      </div>
      <!-- Duplicate for seamless loop -->
      <div class="marquee-group" aria-hidden="true">
        {% for badge in site.data.badges.row2 %}
          <div class="badge-card {{ badge.class }}" style="--badge-color: {{ badge.color }}; animation-delay: {{ forloop.index | times: 0.5 }}s;" title="{{ badge.name }}">
            {% if badge.image %}
              <img src="{{ site.baseurl }}/{{ badge.image }}" alt="{{ badge.name }}" class="badge-logo" loading="lazy">
            {% else %}
              <i class="{{ badge.icon }} badge-fa-icon"></i>
            {% endif %}
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
</div>

### About me

I am currently a Ph.D. candidate in the School of Computing at Clemson University.
My interests span adversarial attacks and defenses of perception systems, cyber harassment detection using large language models, and ML-enabled biometric authentication.
Before Clemson, I earned my M.S. in Software Engineering and B.S. in Information and Computing Science at Xi'an Jiaotong University, and worked as an engineer in industry.
