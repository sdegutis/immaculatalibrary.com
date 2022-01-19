const page500 = {
  '$id': '6de8cf1e-a786-4b4d-bc24-5304c01cd8db',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  path: '/500.html',
  title: 'Something went wrong',
  image: '/img/404-big.jpg',
  pageContent: {
    '$eval': '() => <p>Sorry, this page had an error. Try again later.</p>'
  }
};

const page404 = {
  '$id': 'c4e278c2-68d2-40dd-8a2a-0120df54c22a',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  path: '/404.html',
  title: 'Page not found',
  image: '/img/404-big.jpg',
  pageContent: { '$eval': "() =>   <p>Sorry, couldn't find this page.</p>" }
};

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
