const data = fetch('/dynamic/snippets.json').then(res => res.json());

const input = document.getElementById('search-book-snippets-field') as HTMLInputElement;

input.addEventListener('input', e => searchBookSnippets());

searchBookSnippets();

async function searchBookSnippets() {
  const host = document.getElementById('search-results') as HTMLDivElement;
  const searchable = await data;
  const searchTerm = input.value.trim().toLowerCase();

  for (const li of host.querySelectorAll('li')) {
    if (searchTerm) {
      const slug = li.dataset['slug']!;
      li.hidden = !(searchable[slug].includes(searchTerm));
    }
    else {
      li.hidden = false;
    }
  }
}
