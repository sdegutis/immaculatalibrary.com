import * as Common from "../../components/common";
import { LatestBookSnippets } from "../../components/latest-snippets";
import { calculateReadingMins, formatDate } from "../../core/helpers";
import { allSnippets } from "../../model/models";
import { Snippet } from "../../model/snippets";

export default allSnippets.map(snippet => {
  const singleFile = snippet.book.files.length === 1;
  const specificBookName = (!singleFile && snippet.book.files
    .find(file => file.archiveId === snippet.archiveSlug)
    ?.pdfFile
    .replace('.pdf', ''));

  return [`${snippet.slug}.html`, <>
    <Common.TypicalPage image={snippet.book.category.imageBig}>

      <link rel="stylesheet" href='/css/snippet.css' />

      <Common.Column spaced split>
        <Common.Typography>

          <h1>{snippet.renderedTitle}</h1>

          <p>{formatDate(snippet.date)} &bull; {calculateReadingMins(snippet.content)} min</p>

          <p>
            {[...snippet.tagsForSnippet].map(tag => <>
              <a href={tag.route}>#{tag.oneword}</a> { }
            </>)}
          </p>

          <p>
            From <a href={snippet.book.route}>{snippet.book.title}</a>, { }
            {specificBookName && <>in file "{specificBookName}", </>}
            page <a rel="noopener" href={snippet.archiveLink}>{snippet.archivePage}</a>
            <br />
            <small>By {snippet.book.author}</small>
          </p>

          {snippet.renderedBody}

          <PrevNextLinks snippet={snippet} open />

        </Common.Typography>
        <div>
          <LatestBookSnippets />
        </div>
      </Common.Column>


    </Common.TypicalPage>
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
        p.{snippet.archivePage}
      </>}
    </span>
  </>;
}
