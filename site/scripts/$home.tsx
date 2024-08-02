import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { HomeLoading } from '../components/$loading.js';
import { mdOptions } from '../components/$markdown.js';
import { formatDate } from "../util/$format-date.js";
import { randomElement, sleep } from './$util.js';
import { SnippetJson } from './data/snippets/[snippet].json.js';

const container = document.getElementById('random-book-snippet') as HTMLDivElement;

const snippetIds = fetch('/scripts/data/snippet-ids.json').then<string[]>(res => res.json());

const markdown = MarkdownIt(mdOptions);
let alreadyLoaded = false;

showBookSnippet(slugs => getSnippetOfTheHour(slugs));

async function renderSnippet(slug: string) {
  container.replaceChildren((<HomeLoading />));

  const fetching = fetch(`/scripts/data/snippets/${slug}.json`).then<SnippetJson>(res => res.json());

  await sleep(alreadyLoaded ? .3 : 1);
  alreadyLoaded = true;

  const snippet = await fetching;

  const renderedBody = <>
    <div innerHTML={markdown.render(snippet.content)} />
    {snippet.nextSnippet && <p>
      <a
        href='#'
        style='font-style:italic'
        onclick={nextInBook(snippet.nextSnippet)}
      >Read next snippet in book.</a>
    </p>}
  </> as DocumentFragment;

  const PREVIEW_LINES = 15;
  const AVERAGE_LINE_LENGTH = 50;
  let previewMarkdown;
  const previewSplitSpot = snippet.content.indexOf(' ', PREVIEW_LINES * AVERAGE_LINE_LENGTH);
  if (previewSplitSpot !== -1) {
    previewMarkdown = snippet.content.slice(0, previewSplitSpot) + ' ...';
  }

  container.replaceChildren(<>
    <p>(Read <a href='#' onclick={showRandomBookSnippet}>another</a>)</p>

    <h3><a href={snippet.route}>{snippet.renderedTitle}</a></h3>
    <p><small>{snippet.mins} min &bull; Digitized on {formatDate(snippet.date)}</small></p>
    <p>
      From <a href={snippet.bookRoute}>{snippet.bookTitle}</a>
      , page <a rel="noopener" target='_blank' href={snippet.archiveLink}>{snippet.archivePage}</a>
      <br />
      <small>By {snippet.bookAuthor}</small>
    </p>
    <div>
      {previewMarkdown
        ? <>
          <div innerHTML={markdown.render(previewMarkdown)} />
          <p><a href='#' onclick={(function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            this.parentElement!.parentElement!.replaceChildren(renderedBody);
          }) as any}><i>Continue reading...</i></a></p>
        </>
        : <div>{renderedBody}</div>}
    </div>
  </>);
}

async function showBookSnippet(fn: (slugs: string[]) => string) {
  const slug = fn(await snippetIds);
  renderSnippet(slug);
}

function getSnippetOfTheHour(slugs: string[]) {
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();
  const yearDuration = (1000 * 60 * 60 * 24 * 365);
  const now = Date.now();
  const percent = (now - yearStart) / yearDuration;
  return slugs[Math.floor(percent * slugs.length)]!;
}

function showRandomBookSnippet(e: Event) {
  e.preventDefault();
  showBookSnippet(randomElement);
}

function nextInBook(next: string) {
  return (e: Event) => {
    const top = container.closest('.spaced')!;
    top.scrollIntoView({ behavior: 'instant', block: 'start' });
    e.preventDefault();
    renderSnippet(next);
  };
}
