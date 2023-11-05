import { SnippetItem } from "../shared/snippets.js";
import { SnippetJson } from "./data/snippets.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";
import { createSearch } from "./searchlist.js";
import { randomElement, sleep } from "./util.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(1);
const snippets = await snippetsFetch;


const tagsFilterSource = new Reactive('both');
const searchTerm = new Reactive('');

document.getElementById('filters-container')!.replaceChildren(jsxToElement(<>
  <p><input placeholder='Search' autofocus type="text" oninput={function (this: HTMLInputElement) {
    searchTerm.set(this.value.trim().toLowerCase());
  }} /></p>
  <div id='snippets-filters'>
    <span class='label'>tags</span>
    <span>
      <label><input type='radio' name='has-tags' onclick={() => tagsFilterSource.set('both')} checked />Any</label>
      <label><input type='radio' name='has-tags' onclick={() => tagsFilterSource.set('some')} />Some</label>
      <label><input type='radio' name='has-tags' onclick={() => tagsFilterSource.set('none')} />None</label>
    </span>
  </div>
  <hr />
  <p>
    Not sure what to read?<br />
    Try a <a href='#' onclick={function (this: HTMLAnchorElement) {
      this.href = randomElement(snippets).route;
    }}>Random Book Snippet</a>.
  </p>
</>));


const { results, matchingCount, search } = createSearch({
  data: snippets,
  filters: [
    {
      source: tagsFilterSource,
      matches: (snippet: SnippetJson) => {
        if (tagsFilterSource.val === 'none') return snippet.tags.length === 0;
        if (tagsFilterSource.val === 'some') return snippet.tags.length !== 0;
        return true;
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

search();
