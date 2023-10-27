import { snippetIds } from "./snippet-ids.js";

document.getElementById('refresh-random-book-snippet')!.addEventListener('click', (e) => {
  e.preventDefault();
  doRandomBookSnippet(slugs => Math.floor(Math.random() * slugs.length));
});

window.addEventListener('popstate', e => {
  reflectUrl();
});

if (window.location.hash) {
  reflectUrl();
}
else {
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();
  const yearDuration = (1000 * 60 * 60 * 24 * 365);
  const now = Date.now();
  const percent = (now - yearStart) / yearDuration;
  doRandomBookSnippet(slugs => Math.floor(percent * slugs.length));
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

async function doRandomBookSnippet(fn: (slugs: string[]) => number) {
  const slugs = await snippetIds;
  const i = fn(slugs);
  const slug = slugs[i];

  history.pushState('', '', '#' + slug);
  reflectUrl();
}
