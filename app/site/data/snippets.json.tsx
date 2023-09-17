import { calculateReadingMins, formatDate } from "../../core/helpers";
import { allSnippets } from "../../model/models";

export default <>
  {JSON.stringify(allSnippets.map(snippet => ({
    slug: snippet.slug,
    book: snippet.bookSlug,
    route: snippet.route,
    searchable: snippet.content.toLowerCase()
      + snippet.title.toLowerCase()
      + snippet.book.title.toLowerCase()
      + snippet.book.author.toLowerCase(),
    title: snippet.renderedTitle,
    bookTitle: snippet.book.title,
    url: snippet.route,
    formattedDate: formatDate(snippet.date),
    readingMins: calculateReadingMins(snippet.content),
  })))}
</>;
