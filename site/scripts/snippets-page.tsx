import { SnippetItem } from "../shared/snippets.js";
import { SnippetJson } from "./data/snippets.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";
import { createSearch } from "./searchlist.js";
import { randomElement, sleep } from "./util.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(1);
const snippets = await snippetsFetch;

const tags = [...new Set(snippets.flatMap(s => s.tags))].sort();

const currentTag = new Reactive(new URL(window.location.href).searchParams.get('tag') ?? '_any');
const searchTerm = new Reactive('');

document.getElementById('filters-container')!.replaceChildren(jsxToElement(<>
  <p><input placeholder='Search' autofocus type="text" oninput={function (this: HTMLInputElement) {
    searchTerm.set(this.value.trim().toLowerCase());
  }} /></p>
  <div id='snippets-filters'>
    <span class='label'>tag</span>
    <select onchange={function (this: HTMLSelectElement) { currentTag.set(this.value) }}>
      <option value='' selected={currentTag.val === '_any'}>Any</option>
      <option value='' selected={currentTag.val === '_none'}>None</option>
      <hr />
      {tags.map(tag =>
        <option value={tag} selected={currentTag.val === tag}>{tag}</option>
      )}
    </select>
  </div>
  <hr />
  <p>
    Not sure what to read?<br />
    Try a <a href='#' onclick={function (this: HTMLAnchorElement) {
      this.href = randomElement(snippets).route;
    }}>Random Book Snippet</a>.
  </p>
</>));


const { results, matchingCount } = createSearch({
  data: snippets,
  filters: [
    {
      source: currentTag,
      matches: (snippet: SnippetJson) => {
        if (currentTag.val === '_any') return true;
        if (currentTag.val === '_none') return snippet.tags.length === 0;
        return snippet.tags.includes(currentTag.val);
      },
    },
    {
      source: searchTerm,
      matches: (snippet: SnippetJson) => (
        snippet.title.toLowerCase().includes(searchTerm.val) ||
        snippet.markdown.toLowerCase().includes(searchTerm.val) ||
        snippet.bookAuthor.toLowerCase().includes(searchTerm.val) ||
        snippet.bookTitle.toLowerCase().includes(searchTerm.val)
      ),
    },
  ],
  Item: ({ item: snippet }) => <SnippetItem snippet={snippet} />,
});

document.getElementById('search-results')!.replaceChildren(results);

matchingCount.onChange(() => {
  document.getElementById('search-count')!.textContent = matchingCount.val.toFixed();
});
