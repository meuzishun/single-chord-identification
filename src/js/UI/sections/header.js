export const header = (function () {
  const header = document.createElement('header');
  header.classList.add('header');

  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'Single Chord Identification';

  header.appendChild(title);

  return {
    HTML: header,
  };
})();
