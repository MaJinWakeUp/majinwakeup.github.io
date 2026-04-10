---
title: "Talks"
layout: gridlay
sitemap: false
permalink: /talks/
---

## Talks

<div class="section-card" id="pubList">

### Invited Talks
{% bibliography --query @incollection[keywords ^= invited] %}

### Regular Talks
{% bibliography --query @incollection[keywords != invited] %}

</div>
