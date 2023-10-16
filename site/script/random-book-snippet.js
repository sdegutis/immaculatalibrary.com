const snippets = fetch('/components/random-snippet/snippets.json').then(res => res.json());

document.getElementById('refresh-random-book-snippet').addEventListener('click', (e) => {
  e.preventDefault();
  doRandomBookSnippet();
});

window.addEventListener('popstate', e => {
  reflectUrl();
});

if (!window.location.hash) {
  doRandomBookSnippet();
}

async function reflectUrl() {
  const slug = window.location.hash.slice(1);
  if (!slug) return;

  const text = await fetch(`/dynamic/snippets/${slug}-preview.html`).then(res => res.text());
  const container = document.getElementById('random-book-snippet');
  container.innerHTML = text;

  const link = document.querySelector('.continue-reading-snippet-link');
  link?.addEventListener('click', e => {
    e.preventDefault();
    link.previousElementSibling.previousElementSibling.remove();
    link.previousElementSibling.hidden = false;
    link.remove();
  });
}

async function doRandomBookSnippet() {
  const slugs = await snippets;
  const i = Math.floor(Math.random() * slugs.length);
  const slug = slugs[i];

  history.pushState('', '', '#' + slug);
  reflectUrl();
}
