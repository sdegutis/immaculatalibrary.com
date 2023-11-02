import { SnippetItem } from "../shared/snippets.js";
import { SnippetJson } from "./data/snippets.json.js";
import { Reactive } from "./reactive.js";
import { SearchFilter, createSearch } from "./searchlist.js";

const snippets = await fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());

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

createSearch({
  data: snippets,
  container: document.getElementById('search-results')!,
  counter: document.getElementById('search-count')!,
  makeUi: snippet => <SnippetItem snippet={snippet} />,
  filters: [
    textFilter,
  ],
});
