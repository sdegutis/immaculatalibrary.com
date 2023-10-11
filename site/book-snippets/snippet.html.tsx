import { Column } from "../components/column/column";
import { formatDate } from "../components/format-date";
import { TypicalPage } from "../components/page";
import { SnippetsGroups } from "../components/snippet-groups";
import { Typography } from "../components/typography";
import { isDev } from "../core/helpers";
import { Snippet, allSnippets } from '../model/snippets';

export default allSnippets.map(snippet => {
  const singleFile = snippet.book.data.files.length === 1;
  const specificBookName = (!singleFile && snippet.book.data.files
    .find(file => file.archiveId === snippet.data.archiveSlug)
    ?.pdfFile
    .replace('.pdf', ''));

  return [`${snippet.slug}.html`, <>
    <TypicalPage image={snippet.book.category.imageBig}>

      <link rel="stylesheet" href='/css/snippet.css' />

      <Column spaced split>
        <Typography>

          <h1>{snippet.renderedTitle}</h1>

          <p>{formatDate(snippet.date)} &bull; {snippet.mins} min</p>

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
          <SnippetsGroups />
          <script type='module'>{`
            import { showSnippetGroups } from '/script/snippet-groups.js';
            showSnippetGroups((s, i) => i < 10);
          `}</script>
        </div>

        {isDev && <>
          <details open>
            <summary>Admin</summary>
            <ul>
              <li><a href={`/admin/create-snippet.html?${new URLSearchParams({
                'archivePage': snippet.data.archivePage,
                'archiveSlug': snippet.data.archiveSlug,
                'bookSlug': snippet.data.bookSlug,
                'renderedBody': snippet.renderedBody,
                'archiveLink': snippet.archiveLink,
              })}`}>Make next snippet</a></li>
            </ul>
          </details>
        </>}

      </Column>

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
