import { allSnippets } from '../model/snippets';

export default <>
  {JSON.stringify({
    snippets: allSnippets.map(snippet => ({
      slug: snippet.slug,
      book: snippet.data.bookSlug,
      route: snippet.route,
      tags: snippet.data.tags,
      date: snippet.date,
      searchable: snippet.content.toLowerCase()
        + snippet.data.title.toLowerCase()
        + snippet.book.data.title.toLowerCase()
        + snippet.book.data.author.toLowerCase(),
      title: snippet.renderedTitle,
      bookTitle: snippet.book.data.title,
      url: snippet.route,
      readingMins: snippet.mins,
    }))
  })}
</>;
