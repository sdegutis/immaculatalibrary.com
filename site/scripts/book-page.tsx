import { SnippetJson } from "./data/snippets.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";
import { createSearch } from "./searchlist.js";
import { randomElement, sleep } from "./util.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(1);
const allSnippets = await snippetsFetch;

const container = document.getElementById('snippets-in-book') as HTMLDivElement;
const bookSlug = container.dataset['book'];
const snippetsInBook = allSnippets.filter(s => s.book === bookSlug);

const searchTerm = new Reactive('');

const { results } = createSearch({
  data: snippetsInBook,
  filters: [{
    source: searchTerm,
    matches: (snippet: SnippetJson) => (
      snippet.title.toLowerCase().includes(searchTerm.val) ||
      snippet.markdown.toLowerCase().includes(searchTerm.val) ||
      snippet.bookAuthor.toLowerCase().includes(searchTerm.val) ||
      snippet.bookTitle.toLowerCase().includes(searchTerm.val)
    )
  }],
  Item: ({ item }) => <>
    <p>
      p.{item.archivePage} { }
      <a href={item.route}>{item.title}</a>
    </p>
  </>,
  notFound: jsxToElement<HTMLElement>(<em>No snippets have been posted for this book yet.</em>)
});

container.replaceChildren(jsxToElement(<>
  <p>
    <a href='#' onclick={function (this: HTMLAnchorElement) {
      this.href = randomElement(snippetsInBook).route;
    }}>Random in book</a>
  </p>
  {results}
</>));
