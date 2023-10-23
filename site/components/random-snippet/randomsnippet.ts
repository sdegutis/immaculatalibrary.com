const snippets = fetch('/components/random-snippet/snippets.json').then(res => res.json());

async function goToRandomSnippet(e: Event) {
  const slugs = await snippets;
  const i = Math.floor(Math.random() * slugs.length);
  const slug = slugs[i];
  (e.target as HTMLAnchorElement).href = `/book-snippets/${slug}.html`;
}
