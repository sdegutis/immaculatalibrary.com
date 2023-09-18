import { calculateReadingMins } from "../../core/helpers";
import { allSnippets } from "../../model/models";

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export default <>
  {JSON.stringify({
    totalReadingTime,
    snippets: allSnippets.map(snippet => ({
      slug: snippet.slug,
      book: snippet.bookSlug,
      route: snippet.route,
      tags: snippet.tags,
      date: snippet.date,
      searchable: snippet.content.toLowerCase()
        + snippet.title.toLowerCase()
        + snippet.book.title.toLowerCase()
        + snippet.book.author.toLowerCase(),
      title: snippet.renderedTitle,
      bookTitle: snippet.book.title,
      url: snippet.route,
      formattedDate: snippet.formattedDate,
      readingMins: snippet.mins,
    }))
  })}
</>;
