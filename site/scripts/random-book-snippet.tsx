import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { SnippetJson } from '../dynamic/snippets/snippet.js';
import { formatDate } from "../shared/format-date.js";
import { jsxToString } from "../shared/jsx-stringify.js";
import { snippetIds } from "./snippet-ids.js";

const markdown = MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

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

  const snippet = await fetch(`/dynamic/snippets/${slug}-preview.json`).then(res => res.json()) as SnippetJson;
  const container = document.getElementById('random-book-snippet') as HTMLDivElement;
  container.innerHTML = jsxToString(<>
    <h4><a href={snippet.route}>{snippet.renderedTitle}</a></h4>
    <p>{formatDate(snippet.date)} &bull; {snippet.mins} min</p>
    <p>
      From <a href={snippet.bookRoute}>{snippet.bookTitle}</a>
      , page <a rel="noopener" target='_blank' href={snippet.archiveLink}>{snippet.archivePage}</a>
      <br />
      <small>By {snippet.bookAuthor}</small>
    </p>
    <div class='rendered-preview'>
      {snippet.previewMarkdown
        ? <>
          {markdown.render(snippet.previewMarkdown)}
          <p><a href='#' class='continue-reading-snippet-link'><i>Continue reading...</i></a></p>
        </>
        : snippet.renderedBody}
    </div>
  </>);

  const link = document.querySelector<HTMLAnchorElement>('.continue-reading-snippet-link');
  link?.addEventListener('click', e => {
    e.preventDefault();
    link.parentElement!.parentElement!.innerHTML = snippet.renderedBody;
  });
}

async function doRandomBookSnippet(fn: (slugs: string[]) => number) {
  const slugs = await snippetIds;
  const i = fn(slugs);
  const slug = slugs[i];

  history.pushState('', '', '#' + slug);
  reflectUrl();
}
