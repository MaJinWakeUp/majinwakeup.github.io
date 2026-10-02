---
title: "Teaching"
layout: gridlay
permalink: /teaching/
---

## Teaching

<div class="section-card">
<h3>Teaching Assistant, Clemson University</h3>
<ul>
<li>CPSC 4200/6200 Computer Security Principles &mdash; Fall 2026</li>
<li>CPSC 4240/6240 System Administration and Security &mdash; Fall 2026</li>
<li>CPSC 3120 Introduction to Design and Analysis of Algorithms &mdash; Spring 2026</li>
<li>CPSC 8430 Deep Learning &mdash; Fall 2024, Spring 2025, and Fall 2025</li>
<li>CPSC 4300/6300 Applied Data Science &mdash; Spring 2024</li>
<li>CPSC 4030/6030 Computer Data Visualization &mdash; Fall 2023</li>
</ul>
</div>

{% if site.data.people %}
<div class="section-card">
<h3>Students and Mentoring</h3>
<p>Research mentor at Clemson University, January 2025 &ndash; Present.</p>
<ul>
{% for student in site.data.people %}
<li><strong>{{ student.name }}</strong>, {{ student.location }} ({{ student.level }}, {{ student.year }}). {{ student.project }}</li>
{% endfor %}
</ul>
</div>
{% endif %}
