import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { mdOptions } from '../../components/$markdown.js';
import { SnippetJson } from "../../scripts/data/snippets.json.js";

const isDev = (window.location.hostname === 'localhost');

const markdown = MarkdownIt(mdOptions);

const bookSlug = document.querySelector<HTMLScriptElement>('script[data-book]')!.dataset['book']!;
const allSnippets = await fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
const snippetSlugsInBook = await fetch(`/scripts/data/snippets/in-book-${bookSlug}.json`).then<string[]>(res => res.json());

const linksDiv = document.getElementById('readonline-chapters') as HTMLDivElement;
const bodiesDiv = document.getElementById('chapter-bodies') as HTMLDivElement;

const snippetsInBook = snippetSlugsInBook.map(slug => allSnippets.find(s => s.slug === slug)!);

function render() {
  linksDiv.replaceChildren(<>
    {snippetsInBook.map((bookSnippet, i) => <span class='chapter-link'>
      <span>Ch.{i + 1}</span>
      <a href={`#snippet-${bookSnippet.slug}`}>
        {bookSnippet.title}
      </a>
    </span>)}
  </>);

  bodiesDiv.replaceChildren(<>
    {snippetsInBook.map((bookSnippet, i) => <>
      <div class='chapter' id={`snippet-${bookSnippet.slug}`}>
        <h3 class='chapter-header'>
          Chapter {i + 1} &mdash; { }
          <a href={bookSnippet.route}>
            {bookSnippet.title}
          </a>
        </h3>
        {isDev &&
          <span>
            <button style='margin-left:2px' onclick={() => moveSnippet(i, -1)}>Move up</button>
            <button style='margin-left:2px' onclick={() => moveSnippet(i, +1)}>Move down</button>
          </span>
        }
        <div innerHTML={markdown.render(bookSnippet.markdown)} />
        <hr />
      </div>
    </>)}
  </>);
}

render();

function moveSnippet(i: number, by: number) {
  const j = i + by;
  if (j < 0 || j > snippetsInBook.length) return;

  const s = snippetsInBook[i]!;
  snippetsInBook.splice(i, 1);
  snippetsInBook.splice(j, 0, s);
  render();
  bodiesDiv.children[j]?.scrollIntoView();
  saveOrder();
}

function saveOrder() {
  const json = snippetsInBook.map(({ slug }, i) => ({ slug, i }));
  fetch('/reorder-snippets-in-book', {
    method: 'POST',
    body: JSON.stringify(json),
  });
}
