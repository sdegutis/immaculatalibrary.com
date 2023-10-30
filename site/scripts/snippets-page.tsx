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

const noResults = jsxToElement(
  <p hidden id="no-results" style="font-style: italic">
    No results
  </p>
) as HTMLParagraphElement;

host.append(noResults);

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

  const count = updateCount();
  noResults.hidden = count > 0;
});

function updateCount() {
  const count = host.querySelectorAll('li:not([hidden])').length;
  countEl.textContent = count.toFixed();
  return count;
}
