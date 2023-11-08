import { SnippetsList } from "../shared/snippets.js";
import { SnippetJson } from "./data/snippets.json.js";
import { randomElement, sleep } from "./util.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(.3);
const allSnippets = await snippetsFetch;
const latestSnippets = allSnippets.slice(0, 7);

document.getElementById('latest-book-snippets-area')!.replaceChildren(<>
  <p>
    <a href='#' onclick={function (this: HTMLAnchorElement) {
      this.href = randomElement(allSnippets).route;
    }}>Random</a>
  </p>
  <SnippetsList snippets={latestSnippets} />
</>);
