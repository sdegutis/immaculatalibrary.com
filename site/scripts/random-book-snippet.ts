const snippetIds = fetch('/dynamic/snippet-ids.json').then(res => res.json());

document.getElementById('refresh-random-book-snippet')!.addEventListener('click', (e) => {
  e.preventDefault();
  doRandomBookSnippet();
});

window.addEventListener('popstate', e => {
  reflectUrl();
});

if (window.location.hash) {
  reflectUrl();
}
else {
  doRandomBookSnippet();
}

async function reflectUrl() {
  const slug = window.location.hash.slice(1);
  if (!slug) return;

  const text = await fetch(`/dynamic/snippets/${slug}-preview.html`).then(res => res.text());
  const container = document.getElementById('random-book-snippet') as HTMLDivElement;
  container.innerHTML = text;

  const link = document.querySelector<HTMLAnchorElement>('.continue-reading-snippet-link');
  link?.addEventListener('click', e => {
    e.preventDefault();
    const prevLink = link.previousElementSibling as HTMLAnchorElement;
    prevLink.previousElementSibling!.remove();
    prevLink.hidden = false;
    link.remove();
  });
}

async function doRandomBookSnippet() {
  const slugs = await snippetIds;
  const i = Math.floor(Math.random() * slugs.length);
  const slug = slugs[i];

  history.pushState('', '', '#' + slug);
  reflectUrl();
}
