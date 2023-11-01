import { Column, Spaced } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import { RandomBookSnippet } from "../components/random-snippet.js";
import { Typography } from "../components/typography.js";
import { isDev } from "../core/helpers.js";
import { Snippet, allSnippets } from "../model/snippets.js";
import { sortedTags } from "../model/tag.js";
import { formatDate } from '../shared/format-date.js';
import { SnippetsList, snippetToViewable } from "../shared/snippets.js";

const CopyLink: JSX.Component<{}, [JSX.Element]> = (attrs, [child]) => {
  child.attrs ??= Object.create(null);
  child.attrs!["class"] ??= '';
  child.attrs!["class"] += ' copylink';
  return <>
    <script type='module' src='/scripts/copylink.js' />
    {child}
  </>;
};

export default allSnippets.map(snippet => {
  const singleFile = snippet.book.data.files.length === 1;
  const specificBookName = (!singleFile && snippet.book.data.files
    .find(file => file.archiveId === snippet.data.archiveSlug)
    ?.pdfFile
    .replace('.pdf', ''));


  return [`${snippet.slug}.html`, <>
    <TypicalPage title="Book Snippets" image={snippet.book.category.imageBig}>

      <link rel="stylesheet" href='/css/page/snippet.css' />

      <Spaced>
        <Column split>
          <Typography>

            <h2>{snippet.renderedTitle}</h2>
            <p>{snippet.mins} min &bull; Digitized on {formatDate(snippet.date)}</p>
            {/* <p><CopyLink><a href={`/_/${snippet.shortLink}.html`}>Copy link</a></CopyLink></p> */}

            {isDev && <>
              <div style="border: 1px solid var(--admin-border-color); background-color: var(--admin-bg-color); padding: 1em;">
                <ul>
                  <li><a href={`/admin/create-snippet.html?${new URLSearchParams({
                    'archivePage': snippet.data.archivePage,
                    'archiveSlug': snippet.data.archiveSlug,
                    'bookSlug': snippet.data.bookSlug,
                    'renderedBody': [
                      snippet.data.archivePage,
                      snippet.renderedBody,
                      snippet.nextSnippet?.data.archivePage,
                      snippet.nextSnippet?.renderedBody,
                    ].filter(s => s).join('<p>'),
                    'archiveLink': snippet.archiveLink,
                    'tags': JSON.stringify(sortedTags().map(tag => tag.name)),
                  })}`}>Make next snippet</a></li>
                </ul>
              </div>
            </>}

            <p>
              {[...snippet.tags].map(tag => <>
                <a href={tag.route}>#{tag.oneword}</a> { }
              </>)}
            </p>

            <p>
              From <a href={snippet.book.route}>{snippet.book.data.title}</a>, { }
              {specificBookName && <>in file "{specificBookName}", </>}
              page <a rel="noopener" target='_blank' href={snippet.archiveLink}>{snippet.data.archivePage}</a>
              <br />
              <small>By {snippet.book.data.author}</small>
            </p>

            {snippet.renderedBody}

            <PrevNextLinks snippet={snippet} open />

          </Typography>
          <div>
            <h3>Latest book snippets</h3>
            <p>
              <RandomBookSnippet>
                <a href='#'>Random</a>
              </RandomBookSnippet>
            </p>
            <SnippetsList snippets={allSnippets.slice(0, 7).map(snippetToViewable)} />
          </div>

        </Column>
      </Spaced>

    </TypicalPage>
  </>];
});

function PrevNextLinks({ snippet, open }: { snippet: Snippet, open?: boolean }) {
  return <>
    <div class='prevnextlinks' open={open ?? false}>
      <span class='header'>Other snippets in this book</span>
      <div>
        <RelativeSnippetLink snippet={snippet.prevSnippet}>Previous</RelativeSnippetLink>
        <span>
          <a href={snippet.book.route}>All</a>
          <br />
          {snippet.book.snippets.length} total
        </span>
        <RelativeSnippetLink snippet={snippet.nextSnippet}>Next</RelativeSnippetLink>
      </div>
    </div>
  </>;
}

function RelativeSnippetLink({ snippet }: { snippet: Snippet | undefined }, children: any) {
  return <>
    <span>
      {snippet && <>
        <a href={snippet.route}>{children}</a><br />
        p.{snippet.data.archivePage}
      </>}
    </span>
  </>;
}
