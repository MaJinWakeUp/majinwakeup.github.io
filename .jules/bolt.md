## 2024-05-18 - [Optimized scroll listeners with requestAnimationFrame]
**Learning:** Consolidating unthrottled scroll listeners and wrapping DOM reads/writes in requestAnimationFrame is an effective way to fix layout thrashing on scroll in vanilla JS setups.
**Action:** Always check window.addEventListener('scroll'...) locations for potential requestAnimationFrame throttling.
