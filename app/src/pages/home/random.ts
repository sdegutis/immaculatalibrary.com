import { publishedSnippets } from "../../model/snippet";
import { addRouteable, Routeable } from "/src/core/router";
import { extract_page_number, format_date, md, randomElement, reading_mins } from "/src/util/helpers";

const bookSnippetRandom: Routeable = {
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

addRouteable(bookSnippetRandom);
