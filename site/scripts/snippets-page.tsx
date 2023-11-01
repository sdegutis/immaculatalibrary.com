import { SnippetItem } from "../shared/snippets.js";
import { SnippetSmallerJson } from "./data/snippets.json.js";
import { jsxToElement } from "./jsx-nodes.js";

const snippets = await (fetch('/scripts/data/snippets.json').then(res => res.json()) as Promise<SnippetSmallerJson[]>);
const snippetItems = snippets.map(snippet => ({
  snippet,
  element: jsxToElement(<SnippetItem snippet={snippet} />) as HTMLLIElement
}));

const host = document.getElementById('search-results') as HTMLDivElement;
const input = document.getElementById('search-book-snippets-field') as HTMLInputElement;
const countEl = document.getElementById('showing-snippet-count') as HTMLSpanElement;

host.innerHTML = '';
host.append(jsxToElement(<ul>{snippetItems.map(s => s.element)}</ul>));

const noResults = jsxToElement(
  <p hidden id="no-results" style="font-style: italic">
    No results
  </p>
) as HTMLParagraphElement;

host.append(noResults);

updateCount();

input.addEventListener('input', async e => {
  const searchTerm = input.value.trim();

  for (const snippet of snippetItems) {
    snippet.element.hidden = !termInSnippet(searchTerm, snippet.snippet);
  }

  const count = updateCount();
  noResults.hidden = count > 0;
});

function updateCount() {
  const count = snippetItems.filter(item => !item.element.hidden).length;
  countEl.textContent = count.toFixed();
  return count;
}

function termInSnippet(term: string, snippet: SnippetSmallerJson) {
  if (!term) return true;

  term = term.toLowerCase();
  return (
    snippet.title.toLowerCase().includes(term) ||
    snippet.markdown.toLowerCase().includes(term) ||
    snippet.bookAuthor.toLowerCase().includes(term) ||
    snippet.bookTitle.toLowerCase().includes(term)
  );
}
