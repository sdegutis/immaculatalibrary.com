import { SnippetSmallerJson } from "../dynamic/snippets/snippet.js";
import { jsxToString } from "../shared/jsx-stringify.js";

const snippetsJson = fetch('/dynamic/snippets-data.json').then(res => res.json()) as Promise<SnippetSmallerJson[]>;
const ul = document.getElementById('dynamic-snippets') as HTMLUListElement;
const loading = document.getElementById('dynamic-snippets-loading') as HTMLParagraphElement;

export async function showSnippets(filter: (snippet: SnippetSmallerJson, i: number) => boolean) {
  const snippets = (await snippetsJson).filter(filter);

  const html = snippets.map(snippet => jsxToString(<>
    <li data-slug={snippet.slug}>
      <p>
        <a href={snippet.route}>{snippet.renderedTitle}</a>
        <br />
        {snippet.mins} min &mdash; {snippet.bookTitle}
      </p>
    </li>
  </>)).join('');
  ul.innerHTML = html;

  ul.hidden = false;
  loading.remove();
}
