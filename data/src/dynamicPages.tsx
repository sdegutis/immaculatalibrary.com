
const randomBook = {
  '$id': '490d43d2-2301-4460-82f1-a52b15758340',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  path: '/random.html',
  title: 'Random Book',
  image: '/img/reference-big.jpg',
  pageContent: {
    '$eval': '() => {\r\n' +
      "  const books = $site.named('books').$items;\r\n" +
      '  const i = Math.floor(Math.random() * books.length);\r\n' +
      '  const book = books[i];\r\n' +
      '  return <>\r\n' +
      '    <p><i>Redirecting...</i></p>\r\n' +
      "    <script>{this.script.replace('URL', book.$route())}</script>\r\n" +
      '  </>;\r\n' +
      '}\r\n'
  },
  script: "document.addEventListener('DOMContentLoaded', () => {\r\n" +
    '  window.location.href = `URL`;\r\n' +
    '});\r\n'
};

const randomBookSnippet = {
  '$id': 'b49396c7-8bc5-45a6-bd21-8cf3a2657ce0',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  path: '/random-book-snippet.html',
  title: 'Random Book Snippet',
  image: '/img/reference-big.jpg',
  pageContent: {
    '$eval': '() => {\r\n' +
      "  const items = $site.named('snippets').publishedSnippets;\r\n" +
      '  const i = Math.floor(Math.random() * items.length);\r\n' +
      '  const item = items[i];\r\n' +
      '  return <>\r\n' +
      '    <p><i>Redirecting...</i></p>\r\n' +
      "    <script>{this.script.replace('URL', item.$route())}</script>\r\n" +
      '  </>;\r\n' +
      '}\r\n'
  },
  script: "document.addEventListener('DOMContentLoaded', () => {\r\n" +
    '  window.location.href = `URL`;\r\n' +
    '});\r\n'
}

const home = {
  '$id': 'be038978-1342-4304-b106-58ac107f158d',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  content: {
    '$eval': '() => {\r\n' +
      "  const { LatestBookSnippets } = $site.named('snippets');\r\n" +
      '\r\n' +
      '  return <>\r\n' +
      '\r\n' +
      '    <section id="home-hero">\r\n' +
      '      <div></div>\r\n' +
      '      <div>\r\n' +
      '        <div>\r\n' +
      '          <h1>Immaculata Library</h1>\r\n' +
      '          <p>Free Digital Catholic Books</p>\r\n' +
      '        </div>\r\n' +
      '      </div>\r\n' +
      '    </section>\r\n' +
      '\r\n' +
      '    <div class="container">\r\n' +
      '      <section class="spaced-main-content split-page">\r\n' +
      '        <div>\r\n' +
      '          <div class="home content">\r\n' +
      '\r\n' +
      '            <h3>Letters from Heaven</h3>\r\n' +
      '            <blockquote>\r\n' +
      '              <p>\r\n' +
      '                “Have always at hand some approved book of devotion, and read a little of them every day with as much devotion as if you\r\n' +
      '                were reading a letter which those saints had sent you from heaven to show you the way to it, and encourage you to come.”\r\n' +
      '              </p>\r\n' +
      '              <ul>\r\n' +
      '                <li>\r\n' +
      '                  <p>&mdash; St. Francis de Sales</p>\r\n' +
      '                  <p>\r\n' +
      `                    <a href="/books/introduction-to-the-devout-life.html">Introduction to the Devout Life</a>, page{' '}\r\n` +
      '                    <a href="https://archive.org/details/an-introduction-to-the-devout-life/page/77?view=theater">77</a>\r\n' +
      '                  </p>\r\n' +
      '                </li>\r\n' +
      '              </ul>\r\n' +
      '            </blockquote>\r\n' +
      '\r\n' +
      '          </div>\r\n' +
      '          <br />\r\n' +
      '          <LatestBookSnippets />\r\n' +
      '        </div>\r\n' +
      '        <div>\r\n' +
      '\r\n' +
      '          <div>\r\n' +
      "            <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>\r\n" +
      '            <noscript>Enable JavaScript to see a random book snippet</noscript>\r\n' +
      '            <div id="random-book-snippet" class="content"></div>\r\n' +
      '          </div>\r\n' +
      '          <script src="/js/home.js"></script>\r\n' +
      '\r\n' +
      '        </div>\r\n' +
      '      </section>\r\n' +
      '    </div>\r\n' +
      '\r\n' +
      '  </>;\r\n' +
      '}\r\n'
  },
  path: '/',
  description: 'Free Catholic Digital Resources',
  image: '/img/header.jpg',
  head: '<link rel="stylesheet" href="/css/layout/home.css"/>\r\n',
  '$name': 'Home'
};





const bookSnippetRandom = {
  '$route': { '$eval': '() => `/book-snippets/random`' },
  '$get': {
    '$eval': '() => {\r\n' +
      "  const { extract_page_number, format_date, reading_mins } = $site.named('helpers');\r\n" +
      "  const snippet = this.randomElement($site.named('snippets').publishedSnippets);\r\n" +
      '  const preview = this.derivePreview(2000, snippet.content);\r\n' +
      '\r\n' +
      '  return {\r\n' +
      '    json: {\r\n' +
      '      title: markdown.renderInline(snippet.title),\r\n' +
      '      archiveLink: snippet.archiveLink,\r\n' +
      '      pageNumber: extract_page_number(snippet.archiveLink),\r\n' +
      '      book: {\r\n' +
      '        title: snippet.book.title,\r\n' +
      '        url: snippet.book.$route(),\r\n' +
      '      },\r\n' +
      '      url: snippet.$route(),\r\n' +
      '      formattedDate: format_date(snippet.date),\r\n' +
      '      readingMins: reading_mins(snippet.content),\r\n' +
      '      preview: markdown.render(preview.content),\r\n' +
      '      previewFull: markdown.render(preview.full),\r\n' +
      '      hasPreview: preview.has,\r\n' +
      '    }\r\n' +
      '  };\r\n' +
      '}'
  },
  randomElement: {
    '$eval': '(array) => {\r\n' +
      '  const i = Math.floor(Math.random() * array.length);\r\n' +
      '  return array[i];\r\n' +
      '}\r\n'
  },
  derivePreview: {
    '$eval': '(count, string) => {\r\n' +
      '  const paragraphs = string.trim().split(/(\\r?\\n>+ *\\r?\\n)/);\r\n' +
      '\r\n' +
      '  let running = 0;\r\n' +
      '  for (let i = 0; i < paragraphs.length; i++) {\r\n' +
      '    running += paragraphs[i].length\r\n' +
      '    if (running > count) break;\r\n' +
      '  }\r\n' +
      '\r\n' +
      '  return {\r\n' +
      '    has: running < string.length - 1,\r\n' +
      '    content: string.substring(0, running),\r\n' +
      '    full: string,\r\n' +
      '  };\r\n' +
      '}'
  },
  '$type': '68529a38-9711-4b38-957c-6030c0d8dd08'
};

const bookSnippetSearch = {
  '$route': { '$eval': '() => `/book-snippets/search`' },
  '$post': {
    '$eval': '(input) => {\r\n' +
      "  const { format_date, reading_mins } = $site.named('helpers');\r\n" +
      '  const searchTerm = input.json().searchTerm.toLowerCase();\r\n' +
      '\r\n' +
      "  const snippets = $site.named('snippets').publishedSnippets.filter(s => {\r\n" +
      '    if (s.content.toLowerCase().includes(searchTerm)) return true;\r\n' +
      '    if (s.title.toLowerCase().includes(searchTerm)) return true;\r\n' +
      '    if (s.book.title.toLowerCase().includes(searchTerm)) return true;\r\n' +
      '    if (s.book.author.toLowerCase().includes(searchTerm)) return true;\r\n' +
      '  });\r\n' +
      '\r\n' +
      '  return {\r\n' +
      '    json: snippets.map(snippet => ({\r\n' +
      '      title: markdown.renderInline(snippet.title),\r\n' +
      '      bookTitle: snippet.book.title,\r\n' +
      '      url: snippet.$route(),\r\n' +
      '      formattedDate: format_date(snippet.date),\r\n' +
      '      readingMins: reading_mins(snippet.content),\r\n' +
      '    }))\r\n' +
      '  };\r\n' +
      '}\r\n'
  },
  '$type': '68529a38-9711-4b38-957c-6030c0d8dd08'
};
