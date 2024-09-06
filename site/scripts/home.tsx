import MarkdownIt from 'markdown-it';
import { HomeLoading, LoadingLine } from '../components/$loading.js';
import { mdOptions } from '../components/$markdown.js';
import { PrevNextLinks } from '../snippets/snippet-links.js';
import { formatDate } from "../util/format-date.js";
import { $ } from '../util/jsx-dom.js';
import { SnippetJson } from './data/snippets/[snippet].json.js';
import { randomElement, sleep } from './util.js';

const container = document.getElementById('random-book-snippet') as HTMLDivElement;

const snippetIds = fetch('/scripts/data/snippet-ids.json').then<string[]>(res => res.json());

const markdown = MarkdownIt(mdOptions);
const DURATIONS = { long: 1, short: .3 };

renderSnippet(getSnippetOfTheHour(await snippetIds), 'long');

function RelativeSnippetLink({ snippet }: { snippet: string | undefined }, children: any) {
  const span = $<HTMLSpanElement>(<span />);

  if (snippet) {
    span.replaceChildren($(<LoadingLine width='3em' />));

    (fetch(`/scripts/data/snippets/${snippet}.json`)
      .then<SnippetJson>(res => res.json())
      .then(other => {
        span.replaceChildren($(<>
          <a onclick={nextInBook(snippet)} href={other.route}>{children}</a><br />
          p.{other.archivePage}
        </>));
      }));
  }

  return span;
}

async function renderSnippet(slug: string, duration: keyof typeof DURATIONS) {
  container.replaceChildren(($(<HomeLoading />)));

  const fetching = fetch(`/scripts/data/snippets/${slug}.json`).then<SnippetJson>(res => res.json());

  await sleep(DURATIONS[duration]);

  const snippet = await fetching;

  const renderedBody = $(<>
    <div innerHTML={markdown.render(snippet.content)} />
    {snippet.nextSnippet && <p>
      <PrevNextLinks
        snippet={{
          book: {
            route: snippet.bookRoute,
            snippets: { length: snippet.bookSnippetsCount },
          },
          prevSnippet: snippet.prevSnippet,
          nextSnippet: snippet.nextSnippet,
        }}
        otherLink={RelativeSnippetLink}
      />
    </p>}
  </>);

  const PREVIEW_LINES = 15;
  const AVERAGE_LINE_LENGTH = 50;
  let previewMarkdown;
  const previewSplitSpot = snippet.content.indexOf(' ', PREVIEW_LINES * AVERAGE_LINE_LENGTH);
  if (previewSplitSpot !== -1) {
    previewMarkdown = snippet.content.slice(0, previewSplitSpot) + ' ...';
  }

  container.replaceChildren($(<>
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
  </>));
}

function getSnippetOfTheHour(slugs: string[]) {
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();
  const yearDuration = (1000 * 60 * 60 * 24 * 365);
  const now = Date.now();
  const percent = (now - yearStart) / yearDuration;
  return slugs[Math.floor(percent * slugs.length)]!;
}

async function showRandomBookSnippet(e: Event) {
  e.preventDefault();
  renderSnippet(randomElement(await snippetIds), 'short');
}

function nextInBook(next: string) {
  return (e: Event) => {
    e.preventDefault();

    const top = container.closest('.spaced')!;
    top.scrollIntoView({ behavior: 'smooth', block: 'start' });

    renderSnippet(next, 'long');
  };
}
