
const adminPanel = {
  '$route': { '$eval': '() => `/admin-panel`' },
  '$get': {
    '$eval': '(input) => {\r\n' +
      '  const login = this.login(input);\r\n' +
      '  if (login) return login;\r\n' +
      '\r\n' +
      '  return <>\r\n' +
      '    <this.Template>\r\n' +
      '\r\n' +
      '      <form method="POST">\r\n' +
      '        <h3>New Book Snippet</h3>\r\n' +
      '        <span>Archive Link</span>\r\n' +
      '        <input required name="url" />\r\n' +
      "        <button name='action' value='new-book-snippet'>Setup</button>\r\n" +
      '      </form>\r\n' +
      '\r\n' +
      '    </this.Template>\r\n' +
      '  </>;\r\n' +
      '}'
  },
  Template: (attrs, children) => {
    return <>

      {'<!DOCTYPE html>'}
      <html lang="en">

        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Admin - Immaculata Library</title>
          <script src="/js/dark-mode.js"></script>
          <link rel="stylesheet" href="/css/base/base.css" />
          <link rel="stylesheet" href="/css/base/fonts.css" />
          <link rel="stylesheet" href="/css/base/typography.css" />
          <link rel="stylesheet" href="/css/base/layout.css" />
          <link rel="stylesheet" href="/css/layout/admin.css" />
        </head>

        <body>

          <header id="admin-header">
            <nav>
              <ul>
                <li><a href="/">Site</a></li>
                <li><a href="/admin-panel">Admin</a></li>
                <li><a href="/admin-panel/logout">Logout</a></li>
                <li><a href="#" id="dark-mode-toggle" data-lightmode="Light mode" data-darkmode="Dark mode"></a></li>
              </ul>
            </nav>
          </header>

          <main>
            {children}
          </main>

        </body>
      </html>

    </>;
  },
  '$post': {
    '$eval': (input) => {
      const login = this.login(input);
      if (login) return login;

      const form = input.form();
      const action = form.get('action');
      if (action === 'new-book-snippet') {
        const url = form.get('url');
        const archiveLink = url.trim().replace(/\/mode\/(1|2)up/, '');
        const archiveId = archiveLink.match(/https:\/\/archive.org\/details\/(.+?)\/page\//)[1];

        const book = $site.named('books').$items.find(book => book.files.map(f => f.archiveId).includes(archiveId));
        // return !!book;

        const id = $site.create({
          $type: $site.named('snippets').$id,
          bookSlug: book.slug,
          archiveLink,
          slug: '',
          title: '',
          content: '',
          date: 'zzz',
        });
        $site.rebuild();

        return {
          redirect: this.$items.find(it => it.role === 'snippets').$route() + '?id=' + id,
        };
      }
      else {
        return 'Unknown action';
      }
    }
  },
  login: {
    '$eval': '(input) => {\r\n' +
      '  const user = basicAuth.parse(input.headers().authorization);\r\n' +
      `  if (!user || user.name !== 'admin' || !bcrypt.compareSync(user.pass, "$2a$10$zgvCcDzgcXLFlLv3R8mTNeYeDoMmXM.rWnO/kOTlGqeE4XpCS8E0e")) {\r\n` +
      '    return {\r\n' +
      '      status: 401,\r\n' +
      '      headers: {\r\n' +
      `        'WWW-Authenticate': 'Basic realm="Immaculata Library"',\r\n` +
      '      },\r\n' +
      "      text: 'Access denied',\r\n" +
      '    };\r\n' +
      '  }\r\n' +
      '  return null;\r\n' +
      '}'
  },
  '$type': '68529a38-9711-4b38-957c-6030c0d8dd08'
};

const editBookSnippet = {
  '$type': '02e07010-86a0-40d4-9fc2-74d81a0e9d32',
  '$route': { '$eval': "() => this.$type.$route() + '/book-snippet'" },
  role: 'snippets',
  '$get': {
    '$eval': '(input) => {\r\n' +
      '  const login = this.$type.login(input);\r\n' +
      '  if (login) return login;\r\n' +
      '\r\n' +
      "  const id = input.query().get('id');\r\n" +
      '  const snippet = $site.items[id];\r\n' +
      '  const book = snippet.book;\r\n' +
      '\r\n' +
      '  return <>\r\n' +
      '    <this.$type.Template>\r\n' +
      '\r\n' +
      '      <script\r\n' +
      '        src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.2.0/markdown-it.min.js"\r\n' +
      '        integrity="sha512-cTQeM/op796Fp1ZUxfech8gSMLT/HvrXMkRGdGZGQnbwuq/obG0UtcL04eByVa99qJik7WlnlQOr5/Fw5B36aw=="\r\n' +
      '        crossorigin="anonymous"\r\n' +
      '        referrerpolicy="no-referrer"></script>\r\n' +
      '\r\n' +
      '      <div id="overall-area">\r\n' +
      '\r\n' +
      '        <div>\r\n' +
      '          <h3>Create book snippet</h3>\r\n' +
      '          <form method="POST" class="admin-form">\r\n' +
      '            <input type="hidden" name="id" value={id} data-published={snippet.published} />\r\n' +
      '\r\n' +
      '            <div class="admin-fields">\r\n' +
      '              <span class="admin-field-title">Book</span>\r\n' +
      '              <span>{book.title}</span>\r\n' +
      '\r\n' +
      '              <label class="admin-field-title">\r\n' +
      '                <input type="checkbox" name="publish" checked={snippet.published} />\r\n' +
      "                {' '}\r\n" +
      '                Published\r\n' +
      '              </label>\r\n' +
      '\r\n' +
      '              <span class="admin-field-title">Mins</span>\r\n' +
      "              <span id='reading-mins'></span>\r\n" +
      '\r\n' +
      '              <span class="admin-field-title">Archive Link</span>\r\n' +
      '              <input name="archiveLink" class="monospace" value={snippet.archiveLink} required />\r\n' +
      '\r\n' +
      '              <span class="admin-field-title">Snippet Content</span>\r\n' +
      `              <textarea id='markdown-src' name="content" class="monospace" required>{snippet.content}</textarea>\r\n` +
      '\r\n' +
      '              <span class="admin-field-title">Snippet Slug</span>\r\n' +
      '              <input name="slug" value={snippet.slug} required />\r\n' +
      '\r\n' +
      '              <span class="admin-field-title">Snippet Title</span>\r\n' +
      '              <input name="title" value={snippet.title} required />\r\n' +
      '\r\n' +
      '              <span>\r\n' +
      '                <button type="submit">Update</button>\r\n' +
      '              </span>\r\n' +
      '            </div>\r\n' +
      '          </form>\r\n' +
      '        </div>\r\n' +
      '\r\n' +
      '        <div id="preview-area">\r\n' +
      '          <h3>Content preview</h3>\r\n' +
      `          <div class='content' id="markdown-preview"></div>\r\n` +
      '        </div>\r\n' +
      '\r\n' +
      '      </div>\r\n' +
      '\r\n' +
      '      <script src="/js/new-book-snippet.js"></script>\r\n' +
      '\r\n' +
      '    </this.$type.Template>\r\n' +
      '  </>;\r\n' +
      '}'
  },
  '$post': {
    '$eval': '(input) => {\r\n' +
      '  const login = this.$type.login(input);\r\n' +
      '  if (login) return login;\r\n' +
      '\r\n' +
      '  const form = input.form();\r\n' +
      "  const id = form.get('id');\r\n" +
      '  const snippet = $site.items[id];\r\n' +
      '\r\n' +
      "  const archiveLink = form.get('archiveLink');\r\n" +
      "  const content = form.get('content');\r\n" +
      "  const slug = form.get('slug');\r\n" +
      "  const title = form.get('title');\r\n" +
      "  const published = form.has('publish');\r\n" +
      '\r\n' +
      '  $site.update(id, {\r\n' +
      '    ...snippet.$data,\r\n' +
      '    content,\r\n' +
      '    archiveLink,\r\n' +
      '    slug,\r\n' +
      '    title,\r\n' +
      '    published,\r\n' +
      '    date: new Date().toISOString(),\r\n' +
      '  });\r\n' +
      '\r\n' +
      '  const newsite = $site.rebuild();\r\n' +
      '  const newsnippet = newsite.items[id];\r\n' +
      '  return { redirect: newsnippet.$route() };\r\n' +
      '}'
  },
  '$put': {
    '$eval': '(input) => {\r\n' +
      '  const login = this.$type.login(input);\r\n' +
      '  if (login) return login;\r\n' +
      '\r\n' +
      "  const { reading_mins } = $site.named('helpers');\r\n" +
      '\r\n' +
      "  const id = input.query().get('id');\r\n" +
      '  const content = input.text();\r\n' +
      '\r\n' +
      '  $site.update(id, {\r\n' +
      '    ...$site.items[id].$data,\r\n' +
      '    content,\r\n' +
      '  });\r\n' +
      '  $site.rebuild();\r\n' +
      '\r\n' +
      '  return { json: reading_mins(content) };\r\n' +
      '}\r\n'
  }
};
