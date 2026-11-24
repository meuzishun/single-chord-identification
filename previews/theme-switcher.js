// Preview-only theme switcher. Pick a theme with ?theme=studio|manuscript|keys
// or the floating picker in the bottom-right corner. Remove this file (and its
// <script> tag in index.html) once a theme has been chosen.
(function () {
  const THEMES = ['original', 'studio', 'manuscript', 'keys'];
  const base = document.querySelector('link[href$="src/css/style.css"]');

  const fromUrl = new URLSearchParams(location.search).get('theme');
  let current = THEMES.includes(fromUrl)
    ? fromUrl
    : localStorage.getItem('preview-theme') || 'original';

  const themeLink = document.createElement('link');
  themeLink.rel = 'stylesheet';
  document.head.appendChild(themeLink);

  const apply = (name) => {
    current = name;
    localStorage.setItem('preview-theme', name);
    const isOriginal = name === 'original';
    if (base) base.disabled = !isOriginal;
    themeLink.disabled = isOriginal;
    if (!isOriginal) themeLink.href = `./previews/themes/${name}.css`;
  };

  apply(current);

  window.addEventListener('DOMContentLoaded', () => {
    const picker = document.createElement('select');
    picker.setAttribute('aria-label', 'Preview theme');
    picker.style.cssText =
      'position:fixed;right:12px;bottom:12px;z-index:9999;width:auto;max-width:none;font:13px system-ui,sans-serif;' +
      'padding:6px 8px;border-radius:8px;border:1px solid #888;background:#fff;color:#111;' +
      'box-shadow:0 2px 10px rgba(0,0,0,.2)';
    THEMES.forEach((t) => picker.add(new Option(`Theme: ${t}`, t, false, t === current)));
    picker.addEventListener('change', (e) => apply(e.target.value));
    document.body.appendChild(picker);
  });
})();
