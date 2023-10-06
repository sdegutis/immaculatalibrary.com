import { calculateReadingMins } from "../../core/helpers";
import { allSnippets } from '../../model/snippets';

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export default <>
  {JSON.stringify({
    totalReadingTime,
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
