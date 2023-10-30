import { SnippetSmallerJson } from "../dynamic/snippets/snippet.js";
import { SnippetsList } from "../shared/snippets.js";
import { jsxToElement } from "./jsx-nodes.js";

const snippets = await (fetch('/dynamic/snippets-data.json').then(res => res.json()) as Promise<SnippetSmallerJson[]>);
const searchable = await fetch('/dynamic/snippets.json').then(res => res.json()) as Record<string, string>;

const host = document.getElementById('search-results') as HTMLDivElement;
const input = document.getElementById('search-book-snippets-field') as HTMLInputElement;
const countEl = document.getElementById('showing-snippet-count') as HTMLSpanElement;

const ul = jsxToElement(<SnippetsList snippets={snippets} />);
host.innerHTML = '';
host.append(ul);

updateCount();

input.addEventListener('input', async e => {
  const searchTerm = input.value.trim().toLowerCase();

  for (const li of host.querySelectorAll('li')) {
    if (searchTerm) {
      const slug = li.dataset['slug']!;
      li.hidden = !(searchable[slug]!.includes(searchTerm));
    }
    else {
      li.hidden = false;
    }
  }

  updateCount();
});

function updateCount() {
  countEl.textContent = host.querySelectorAll('li:not([hidden])').length.toFixed();
}
