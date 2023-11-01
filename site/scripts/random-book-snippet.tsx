import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { formatDate } from "../shared/format-date.js";
import { mdOptions } from '../shared/markdown.js';
import { SnippetJson } from './data/snippets/snippet.json.js';
import { jsxToElement } from './jsx-nodes.js';
import { snippetIds } from "./snippet-ids.js";

const markdown = MarkdownIt(mdOptions);

document.getElementById('refresh-random-book-snippet')!.addEventListener('click', (e) => {
  e.preventDefault();
  doRandomBookSnippet(slugs => Math.floor(Math.random() * slugs.length));
});

window.addEventListener('popstate', e => {
  reflectUrl();
});

if (window.location.hash) {
  reflectUrl();
}
else {
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();
  const yearDuration = (1000 * 60 * 60 * 24 * 365);
  const now = Date.now();
  const percent = (now - yearStart) / yearDuration;
  doRandomBookSnippet(slugs => Math.floor(percent * slugs.length));
}

async function reflectUrl() {
  const slug = window.location.hash.slice(1);
  if (!slug) return;

  const snippet = await fetch(`/scripts/data/snippets/${slug}.json`).then(res => res.json()) as SnippetJson;
  const container = document.getElementById('random-book-snippet') as HTMLDivElement;
  container.innerHTML = '';
  container.append(jsxToElement(<>
    <h4><a href={snippet.route}>{snippet.renderedTitle}</a></h4>
    <p><small>{snippet.mins} min &bull; Digitized on {formatDate(snippet.date)}</small></p>
    <p>
      From <a href={snippet.bookRoute}>{snippet.bookTitle}</a>
      , page <a rel="noopener" target='_blank' href={snippet.archiveLink}>{snippet.archivePage}</a>
      <br />
      <small>By {snippet.bookAuthor}</small>
    </p>
    <div className='rendered-preview'>
      {snippet.previewMarkdown
        ? <>
          <div innerHTML={markdown.render(snippet.previewMarkdown)} />
          <p><a href='#' onclick={(function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            this.parentElement!.parentElement!.innerHTML = snippet.renderedBody;
          }) as any}><i>Continue reading...</i></a></p>
        </>
        : <div innerHTML={snippet.renderedBody} />}
    </div>
  </>));
}

async function doRandomBookSnippet(fn: (slugs: string[]) => number) {
  const slugs = await snippetIds;
  const i = fn(slugs);
  const slug = slugs[i];

  history.pushState('', '', '#' + slug);
  reflectUrl();
}
