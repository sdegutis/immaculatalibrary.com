interface SubSnippet {
  route: string,
  data: { archivePage: string },
}

interface Snippet {
  book: {
    route: string,
    snippets: { length: number },
  },
  prevSnippet?: SubSnippet,
  nextSnippet?: SubSnippet,
}

export function PrevNextLinks({ snippet }: { snippet: Snippet }) {
  return <>
    <div class='prevnextlinks'>
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

function RelativeSnippetLink({ snippet }: { snippet: SubSnippet | undefined }, children: any) {
  return <>
    <span>
      {snippet && <>
        <a href={snippet.route}>{children}</a><br />
        p.{snippet.data.archivePage}
      </>}
    </span>
  </>;
}
