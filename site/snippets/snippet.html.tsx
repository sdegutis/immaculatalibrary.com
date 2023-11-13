import { Spaced, SplitColumn } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import { Typography } from "../components/typography.js";
import { isDev } from "../core/helpers.js";
import { Snippet, allSnippets } from "../model/snippets.js";
import { allTags } from "../model/tag.js";
import { formatDate } from '../shared/format-date.js';
import { LoadingLine, LoadingParagraph } from "../shared/loading.js";

export default allSnippets.map(snippet => {
  const singleFile = snippet.book.data.files.length === 1;
  const specificBookName = (!singleFile && snippet.book.data.files
    .find(file => file.archiveId === snippet.data.archiveSlug)
    ?.pdfFile
    .replace('.pdf', ''));


  return [`${snippet.slug}.html`, <>
    <TypicalPage title="Book Snippets" image={snippet.book.imageBig}>

      <link rel="stylesheet" href='/css/page/snippet.css' />

      <Spaced>
        <SplitColumn>
          <Typography>

            <h2>{snippet.renderedTitle}</h2>
            <p>{snippet.mins} min &bull; Digitized on {formatDate(snippet.date)}</p>

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
                    'tags': JSON.stringify(allTags),
                  })}`}>Make next snippet</a></li>
                </ul>
              </div>
            </>}

            <p>
              {snippet.tags.map(tag => <>
                <a href={`/snippets.html?tag=${tag}`}>#{tag}</a> { }
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
            <div id='latest-book-snippets-area'>
              <LoadingLine width="4em" />
              <ul>
                <li><LoadingParagraph lines={3} /></li>
                <li><LoadingParagraph lines={3} /></li>
                <li><LoadingParagraph lines={3} /></li>
                <li><LoadingParagraph lines={3} /></li>
                <li><LoadingParagraph lines={3} /></li>
                <li><LoadingParagraph lines={3} /></li>
                <li><LoadingParagraph lines={3} /></li>
              </ul>
            </div>
            <script type='module' src='/scripts/latest-book-snippets.js' />
          </div>

        </SplitColumn>
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
