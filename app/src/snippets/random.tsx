import { allSnippets, publishedSnippets } from ".";
import { Routeable } from "../core/router";
import { extract_page_number, format_date, md, randomElement, reading_mins } from "../util/helpers";

export const randomSnippetPage: Routeable = {
  route: '/random-book-snippet.html',
  method: 'GET',
  handle: (input) => {
    const snippet = randomElement(allSnippets);
    return {
      status: 302,
      headers: { 'Location': snippet.view.route },
    }
  },
}

export const bookSnippetRandom: Routeable = {
  route: '/book-snippets/random',
  method: 'GET',
  handle: (input) => {
    const snippet = randomElement(publishedSnippets);
    return {
      body: JSON.stringify({
        title: md.renderInline(snippet.title),
        archiveLink: snippet.archiveLink,
        pageNumber: extract_page_number(snippet.archiveLink),
        book: {
          title: snippet.book.title,
          url: snippet.book.route,
        },
        url: snippet.view.route,
        formattedDate: format_date(snippet.date),
        readingMins: reading_mins(snippet.markdownContent),
        preview: md.render(snippet.previewMarkdown ?? snippet.markdownContent),
        previewFull: md.render(snippet.markdownContent),
        hasPreview: !!snippet.previewMarkdown,
      })
    };
  }
};
