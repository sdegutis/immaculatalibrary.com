
const adminPanel = {
  '$route': { '$eval': '() => `/admin-panel`' },
  '$get': (input) => {
    const login = this.login(input);
    if (login) return login;

    return <>
      <this.Template>

        <form method="POST">
          <h3>New Book Snippet</h3>
          <span>Archive Link</span>
          <input required name="url" />
          <button name='action' value='new-book-snippet'>Setup</button>
        </form>

      </this.Template>
    </>;
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
  login: (input) => {
    const user = basicAuth.parse(input.headers().authorization);
    if (!user || user.name !== 'admin' || !bcrypt.compareSync(user.pass, "$2a$10$zgvCcDzgcXLFlLv3R8mTNeYeDoMmXM.rWnO/kOTlGqeE4XpCS8E0e")) {
      return {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Immaculata Library"',
        },
        text: 'Access denied',
      };
    }
    return null;
  },
  '$type': '68529a38-9711-4b38-957c-6030c0d8dd08'
};

const editBookSnippet = {
  '$type': '02e07010-86a0-40d4-9fc2-74d81a0e9d32',
  '$route': { '$eval': "() => this.$type.$route() + '/book-snippet'" },
  role: 'snippets',
  '$get': (input) => {
    const login = this.$type.login(input);
    if (login) return login;

    const id = input.query().get('id');
    const snippet = $site.items[id];
    const book = snippet.book;

    return <>
      <this.$type.Template>

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.2.0/markdown-it.min.js"
          integrity="sha512-cTQeM/op796Fp1ZUxfech8gSMLT/HvrXMkRGdGZGQnbwuq/obG0UtcL04eByVa99qJik7WlnlQOr5/Fw5B36aw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"></script>

        <div id="overall-area">

          <div>
            <h3>Create book snippet</h3>
            <form method="POST" class="admin-form">
              <input type="hidden" name="id" value={id} data-published={snippet.published} />

              <div class="admin-fields">
                <span class="admin-field-title">Book</span>
                <span>{book.title}</span>

                <label class="admin-field-title">
                  <input type="checkbox" name="publish" checked={snippet.published} />
                  {' '}
                  Published
                </label>

                <span class="admin-field-title">Mins</span>
                <span id='reading-mins'></span>

                <span class="admin-field-title">Archive Link</span>
                <input name="archiveLink" class="monospace" value={snippet.archiveLink} required />

                <span class="admin-field-title">Snippet Content</span>
                <textarea id='markdown-src' name="content" class="monospace" required>{snippet.content}</textarea>

                <span class="admin-field-title">Snippet Slug</span>
                <input name="slug" value={snippet.slug} required />

                <span class="admin-field-title">Snippet Title</span>
                <input name="title" value={snippet.title} required />

                <span>
                  <button type="submit">Update</button>
                </span>
              </div>
            </form>
          </div>

          <div id="preview-area">
            <h3>Content preview</h3>
            <div class='content' id="markdown-preview"></div>
          </div>

        </div>

        <script src="/js/new-book-snippet.js"></script>

      </this.$type.Template>
    </>;
  },
  '$post': (input) => {
    const login = this.$type.login(input);
    if (login) return login;

    const form = input.form();
    const id = form.get('id');
    const snippet = $site.items[id];

    const archiveLink = form.get('archiveLink');
    const content = form.get('content');
    const slug = form.get('slug');
    const title = form.get('title');
    const published = form.has('publish');

    $site.update(id, {
      ...snippet.$data,
      content,
      archiveLink,
      slug,
      title,
      published,
      date: new Date().toISOString(),
    });

    const newsite = $site.rebuild();
    const newsnippet = newsite.items[id];
    return { redirect: newsnippet.$route() };
  },
  '$put': (input) => {
    const login = this.$type.login(input);
    if (login) return login;

    const { reading_mins } = $site.named('helpers');

    const id = input.query().get('id');
    const content = input.text();

    $site.update(id, {
      ...$site.items[id].$data,
      content,
    });
    $site.rebuild();

    return { json: reading_mins(content) };
  }
};
