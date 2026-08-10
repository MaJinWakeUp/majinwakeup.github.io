## 2024-05-18 - [Optimized scroll listeners with requestAnimationFrame]
**Learning:** Consolidating unthrottled scroll listeners and wrapping DOM reads/writes in requestAnimationFrame is an effective way to fix layout thrashing on scroll in vanilla JS setups.
**Action:** Always check window.addEventListener('scroll'...) locations for potential requestAnimationFrame throttling.

## 2024-05-18 - [Server-Side Rendering of Year Badges]
**Learning:** Generating the year badges on the client side via iterating over DOM elements caused unnecessary layout thrashing and increased main thread time. Rendering the `year-badge` component server-side in the `_layouts/bibtemplate.html` using Jekyll's Liquid templates entirely eliminates this overhead.
**Action:** Prefer server-side rendering using Liquid template variables instead of client-side DOM mutation for static styling elements.

## 2024-05-18 - [Server-Side Rendering of Static Copy Buttons]
**Learning:** Similar to year badges, iterating over DOM elements client-side to inject static markup for copy buttons (`copy-wrapper`, `copy-btn`) causes unnecessary layout thrashing. Moving this to the server-side Jekyll template and replacing the loop with event delegation improves client-side performance.
**Action:** Prefer event delegation for interactive elements and server-side rendering for static UI components.
## 2024-08-11 - [Server-Side Rendering of Back-to-Top Button]
**Learning:** Similar to year badges and copy buttons, iterating over DOM elements or injecting static elements like the back-to-top button via JavaScript on page load causes unnecessary layout thrashing and negatively impacts main thread execution time. Moving these static elements to the server-side template and conditionalizing the JavaScript handlers improves page load performance.
**Action:** Always prefer server-side rendering using Jekyll templates for static UI components over client-side DOM mutation.
