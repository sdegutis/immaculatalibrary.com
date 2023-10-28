const data = fetch('/dynamic/snippets.json').then(res => res.json());

const input = document.getElementById('search-book-snippets-field') as HTMLInputElement;
// const countEl = document.getElementById('showing-snippet-count') as HTMLSpanElement;

/**
 * TODO: show count
 * 
 * The problem is that showSnippets() runs async,
 * so there's no way to ensure it runs first.
 * Obviously we could create an explicit dependency,
 * but that's the overall wrong solution,
 * as the snippets.tsx file is completely wrong,
 * and needs to be rethought from the ground up.
 */

input.addEventListener('input', e => searchBookSnippets());

// setTimeout(() => {
//   searchBookSnippets();
// }, 0);

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

  // countEl.textContent = host.querySelectorAll('li:not([hidden])').length.toFixed();
}
