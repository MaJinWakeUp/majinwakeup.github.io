// =============================================================
// site.js — Dark mode, publication filter, toggles, scroll effects,
//           copy bibtex, back-to-top, year badges
// =============================================================

(function () {
  'use strict';

  // ----- Dark Mode Toggle -----

  const toggle = document.getElementById('darkModeToggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-bs-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
    });

    // Follow the OS theme live, unless the visitor has made a manual choice.
    // Inside the toggle guard so it never runs when dark mode is disabled
    // (no toggle, and head.html applies no theme).
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onSchemeChange = function (e) {
        if (localStorage.getItem('theme')) return; // manual choice wins
        document.documentElement.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
      };
      if (mq.addEventListener) mq.addEventListener('change', onSchemeChange);
      else if (mq.addListener) mq.addListener(onSchemeChange); // older browsers
    }
  }

  // ----- Publication Expand/Collapse -----

  document.addEventListener('click', function (e) {
    const button = e.target.closest('[data-toggle-target]');
    if (!button) return;

    const targetId = button.getAttribute('data-toggle-target');
    const target = document.getElementById(targetId);
    if (!target) return;

    target.classList.toggle('show');
    const isExpanded = target.classList.contains('show');
    button.setAttribute('aria-expanded', isExpanded);
  });

  // ----- Publication Search/Filter -----

  const searchInput = document.getElementById('pubSearch');
  if (searchInput) {
    const entriesArr = Array.from(document.querySelectorAll('[data-pub-searchable]'));
    const entriesData = entriesArr.map(function (entry) {
      return {
        element: entry,
        text: entry.textContent.toLowerCase()
      };
    });

    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();

      entriesData.forEach(function (data) {
        if (!query) {
          data.element.style.display = '';
          return;
        }
        data.element.style.display = data.text.includes(query) ? '' : 'none';
      });
    });
  }

  // ----- Copy BibTeX Button -----
  // Optimization: Use event delegation instead of a querySelectorAll loop on DOM ready.
  // This reduces main thread blocking during page load by not creating N event listeners
  // and eliminates the layout thrashing caused by creating/appending DOM elements in JS.
  // The static markup is now rendered server-side in _layouts/bibtemplate.html.

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const wrapper = btn.closest('.copy-wrapper');
    if (!wrapper) return;

    const pre = wrapper.querySelector('pre');
    if (!pre) return;

    navigator.clipboard.writeText(pre.textContent.trim()).then(function () {
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.setAttribute('aria-label', 'Copied to clipboard');
      btn.classList.add('copied');
      setTimeout(function () {
        btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        btn.setAttribute('aria-label', 'Copy to clipboard');
        btn.classList.remove('copied');
      }, 2000);
    });
  });

  // ----- Back to Top Button -----

  const topBtn = document.getElementById('backToTop');

  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Scroll Effects (Back to Top & Navbar) -----
  // Optimization: Consolidate scroll events and throttle using requestAnimationFrame
  // to prevent excessive main thread blocking and layout thrashing during scroll.

  const navbar = document.querySelector('.navbar');
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollY = window.scrollY;

        // Back to top button
        if (topBtn) {
          if (scrollY > 400) {
            topBtn.classList.add('visible');
          } else {
            topBtn.classList.remove('visible');
          }
        }

        // Navbar scroll shadow
        if (navbar) {
          if (scrollY > 10) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ----- Fade-in on Scroll -----

  const fadeElements = document.querySelectorAll('.fade-in-section');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ----- Site Search -----

  const searchToggleBtn = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInputEl = document.getElementById('searchInput');
  const searchResultsEl = document.getElementById('searchResults');
  let searchData = null;

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    setTimeout(function () { searchInputEl.focus(); }, 100);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    searchInputEl.value = '';
    searchResultsEl.innerHTML = '';
  }

  if (searchToggleBtn) {
    searchToggleBtn.addEventListener('click', openSearch);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) {
      closeSearch();
    }
    // Cmd/Ctrl + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchOverlay && searchOverlay.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  function loadSearchData(callback) {
    if (searchData) { callback(searchData); return; }
    fetch('/assets/search.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        // Pre-compute lowercase strings for faster search filtering
        data.forEach(function (item) {
          item.titleLower = item.title.toLowerCase();
          item.contentLower = item.content.toLowerCase();
        });
        searchData = data;
        callback(data);
      })
      .catch(function () {
        searchResultsEl.innerHTML = '<div class="search-no-results">Could not load search index.</div>';
      });
  }

  function renderResults(query, data) {
    if (!query) {
      searchResultsEl.innerHTML = '';
      return;
    }
    const q = query.toLowerCase();
    const matches = data.filter(function (item) {
      return item.titleLower.includes(q) ||
             item.contentLower.includes(q);
    });

    if (matches.length === 0) {
      searchResultsEl.innerHTML = '';
      var noResultsEl = document.createElement('div');
      noResultsEl.className = 'search-no-results';
      noResultsEl.textContent = 'No results for "' + query + '"';
      searchResultsEl.appendChild(noResultsEl);
      return;
    }

    searchResultsEl.innerHTML = matches.map(function (item) {
      const snippet = item.content.substring(0, 150).trim() + '...';
      return '<a href="' + item.url + '" class="search-result-item">' +
        '<div class="search-result-title">' + item.title + '</div>' +
        '<div class="search-result-snippet">' + snippet + '</div>' +
        '</a>';
    }).join('');
  }

  if (searchInputEl) {
    let debounceTimer;
    searchInputEl.addEventListener('input', function () {
      const query = this.value.trim();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        loadSearchData(function (data) {
          renderResults(query, data);
        });
      }, 150);
    });
  }

})();
