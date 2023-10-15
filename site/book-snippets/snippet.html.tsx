import { Column, Spaced } from "../components/column/column";
import { formatDate } from "../components/format-date";
import { TypicalPage } from "../components/page";
import { SnippetsGroups } from "../components/snippet-groups";
import { Typography } from "../components/typography";
import { isDev } from "../core/helpers";
import { Snippet, allSnippets } from '../model/snippets';
import { sortedTags } from "../model/tag";

export default allSnippets.map(snippet => {
  const singleFile = snippet.book.data.files.length === 1;
  const specificBookName = (!singleFile && snippet.book.data.files
    .find(file => file.archiveId === snippet.data.archiveSlug)
    ?.pdfFile
    .replace('.pdf', ''));

  return [`${snippet.slug}.html`, <>
    <TypicalPage image={snippet.book.category.imageBig}>

      <link rel="stylesheet" href='/css/snippet.css' />

      <Spaced>
        <Column split>
          <Typography>

            <h1>{snippet.renderedTitle}</h1>

            <p>{formatDate(snippet.date)} &bull; {snippet.mins} min</p>

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
              page <a rel="noopener" href={snippet.archiveLink}>{snippet.data.archivePage}</a>
              <br />
              <small>By {snippet.book.data.author}</small>
            </p>

            {snippet.renderedBody}

            <PrevNextLinks snippet={snippet} open />

          </Typography>
          <div>
            <h3>Latest book snippets</h3>
            <SnippetsGroups snippets={allSnippets.slice(0, 10)} />
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
