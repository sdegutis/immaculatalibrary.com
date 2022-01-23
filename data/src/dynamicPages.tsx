

const bookSnippetRandom = {
  '$route': { '$eval': '() => `/book-snippets/random`' },
  '$get': () => {
    const { extract_page_number, format_date, reading_mins } = $site.named('helpers');
    const snippet = this.randomElement($site.named('snippets').publishedSnippets);
    const preview = this.derivePreview(2000, snippet.content);

    return {
      json: {
        title: markdown.renderInline(snippet.title),
        archiveLink: snippet.archiveLink,
        pageNumber: extract_page_number(snippet.archiveLink),
        book: {
          title: snippet.book.title,
          url: snippet.book.$route(),
        },
        url: snippet.$route(),
        formattedDate: format_date(snippet.date),
        readingMins: reading_mins(snippet.content),
        preview: markdown.render(preview.content),
        previewFull: markdown.render(preview.full),
        hasPreview: preview.has,
      }
    };
  },
  randomElement: (array) => {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
  },
};

const bookSnippetSearch = {
  '$route': { '$eval': '() => `/book-snippets/search`' },
  '$post': (input) => {
    const { format_date, reading_mins } = $site.named('helpers');
    const searchTerm = input.json().searchTerm.toLowerCase();

    const snippets = $site.named('snippets').publishedSnippets.filter(s => {
      if (s.content.toLowerCase().includes(searchTerm)) return true;
      if (s.title.toLowerCase().includes(searchTerm)) return true;
      if (s.book.title.toLowerCase().includes(searchTerm)) return true;
      if (s.book.author.toLowerCase().includes(searchTerm)) return true;
    });

    return {
      json: snippets.map(snippet => ({
        title: markdown.renderInline(snippet.title),
        bookTitle: snippet.book.title,
        url: snippet.$route(),
        formattedDate: format_date(snippet.date),
        readingMins: reading_mins(snippet.content),
      }))
    };
  },
};
