import { SnippetSmallerJson } from "../dynamic/snippets/snippet.js";
import { SnippetItem } from "../shared/snippets.js";
import { jsxToElement } from "./jsx-nodes.js";

const data = fetch('/dynamic/snippets.json').then(res => res.json());
const snippetsJson = fetch('/dynamic/snippets-data.json').then(res => res.json()) as Promise<SnippetSmallerJson[]>;
const snippets = await snippetsJson;
const searchable = await data;

const input = document.getElementById('search-book-snippets-field') as HTMLInputElement;
const countEl = document.getElementById('showing-snippet-count') as HTMLSpanElement;
const host = document.getElementById('search-results') as HTMLDivElement;

host.innerHTML = '';
host.append(jsxToElement(<ul>
  {snippets.map(snippet => <SnippetItem snippet={snippet} />)}
</ul>));

updateCount();

input.addEventListener('input', async e => {
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

  updateCount();
});

function updateCount() {
  countEl.textContent = host.querySelectorAll('li:not([hidden])').length.toFixed();
}
