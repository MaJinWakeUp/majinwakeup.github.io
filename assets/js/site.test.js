const fs = require('fs');
const path = require('path');

const jsCode = fs.readFileSync(path.resolve(__dirname, './site.js'), 'utf8');

describe('Publication Search/Filter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="pubSearch" />
      <div data-pub-searchable>First publication about Machine Learning</div>
      <div data-pub-searchable>Second publication regarding Artificial Intelligence</div>
      <div data-pub-searchable>Third one is about Quantum Computing</div>
    `;

    // Execute the site.js code
    eval(jsCode);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show all entries when search is empty', () => {
    const searchInput = document.getElementById('pubSearch');
    const entries = document.querySelectorAll('[data-pub-searchable]');

    // Setup initial state (hide some to make sure they get shown)
    entries[0].style.display = 'none';

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));

    entries.forEach(entry => {
      expect(entry.style.display).toBe('');
    });
  });

  test('should hide entries that do not match the query', () => {
    const searchInput = document.getElementById('pubSearch');
    const entries = document.querySelectorAll('[data-pub-searchable]');

    searchInput.value = 'machine';
    searchInput.dispatchEvent(new Event('input'));

    expect(entries[0].style.display).toBe('');
    expect(entries[1].style.display).toBe('none');
    expect(entries[2].style.display).toBe('none');
  });

  test('should handle case-insensitive search', () => {
    const searchInput = document.getElementById('pubSearch');
    const entries = document.querySelectorAll('[data-pub-searchable]');

    searchInput.value = 'ARTIFICIAL';
    searchInput.dispatchEvent(new Event('input'));

    expect(entries[0].style.display).toBe('none');
    expect(entries[1].style.display).toBe('');
    expect(entries[2].style.display).toBe('none');
  });

  test('should handle leading/trailing spaces in search query', () => {
    const searchInput = document.getElementById('pubSearch');
    const entries = document.querySelectorAll('[data-pub-searchable]');

    searchInput.value = '   quantum   ';
    searchInput.dispatchEvent(new Event('input'));

    expect(entries[0].style.display).toBe('none');
    expect(entries[1].style.display).toBe('none');
    expect(entries[2].style.display).toBe('');
  });

  test('should do nothing if pubSearch element is missing', () => {
    // Override the dom
    document.body.innerHTML = `
      <div data-pub-searchable>First publication about Machine Learning</div>
    `;

    // Should not throw any errors when executing site.js without the element
    expect(() => eval(jsCode)).not.toThrow();
  });
});

describe('Site Search', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="searchToggle" aria-expanded="false"></button>
      <div id="searchOverlay" class=""></div>
      <input id="searchInput" />
      <div id="searchResults"></div>
      <button id="otherButton">Other</button>
    `;

    jest.useFakeTimers();

    // Execute the site.js code
    eval(jsCode);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  test('should update aria-expanded and manage focus on open/close', () => {
    const searchToggleBtn = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const otherButton = document.getElementById('otherButton');
    const searchInput = document.getElementById('searchInput');

    // Simulate focus on a button before opening search
    otherButton.focus();
    expect(document.activeElement).toBe(otherButton);

    // Open search
    searchToggleBtn.click();
    expect(searchOverlay.classList.contains('open')).toBe(true);
    expect(searchToggleBtn.getAttribute('aria-expanded')).toBe('true');

    // Run setTimeout for focus
    jest.runAllTimers();
    expect(document.activeElement).toBe(searchInput);

    // Close search by pressing Escape
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(searchOverlay.classList.contains('open')).toBe(false);
    expect(searchToggleBtn.getAttribute('aria-expanded')).toBe('false');

    // Focus should be restored to the previous active element
    expect(document.activeElement).toBe(otherButton);
  });
});
