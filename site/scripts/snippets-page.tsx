import { SnippetItem } from "../shared/snippets.js";
import { SnippetJson } from "./data/snippets.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";
import { SearchFilter, createSearch } from "./searchlist.js";

const snippets = await fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());

const filtersContainer = document.getElementById('snippets-filters') as HTMLDivElement;


const tagsFilterSource = new Reactive('both');

filtersContainer.append(jsxToElement(<>
  <span class='label'>tags</span>
  <span>
    <label><input type='radio' name='has-tags' onclick={() => tagsFilterSource.set('both')} checked />Any</label>
    <label><input type='radio' name='has-tags' onclick={() => tagsFilterSource.set('some')} />Some</label>
    <label><input type='radio' name='has-tags' onclick={() => tagsFilterSource.set('none')} />None</label>
  </span>
</>));

const tagsFilter: SearchFilter<SnippetJson> = {
  source: tagsFilterSource,
  matches: (snippet: SnippetJson) => {
    if (tagsFilterSource.val === 'none') return snippet.tags.length === 0;
    if (tagsFilterSource.val === 'some') return snippet.tags.length !== 0;
    return true;
  },
};



const searchTerm = new Reactive('');

document.getElementById('search-book-snippets-field')!.oninput = (e) => {
  searchTerm.set((e.target as HTMLInputElement).value.trim().toLowerCase());
};

const textFilter: SearchFilter<SnippetJson> = {
  source: searchTerm,
  matches: (snippet: SnippetJson) => (
    snippet.title.toLowerCase().includes(searchTerm.val) ||
    snippet.markdown.toLowerCase().includes(searchTerm.val) ||
    snippet.bookAuthor.toLowerCase().includes(searchTerm.val) ||
    snippet.bookTitle.toLowerCase().includes(searchTerm.val)
  ),
};

const { results, visibleCount } = createSearch({
  data: snippets,
  Item: ({ item: snippet }) => <SnippetItem snippet={snippet} />,
  filters: [
    tagsFilter,
    textFilter,
  ],
});

document.getElementById('search-results')!.replaceChildren(results);

visibleCount.onChange(() => {
  document.getElementById('search-count')!.textContent = visibleCount.val.toFixed();
});
