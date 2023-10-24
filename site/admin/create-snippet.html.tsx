import { EmptyPage } from "../components/page.js";
import { Typography } from "../components/typography.js";
import { calculateReadingMins } from "../core/helpers.js";
import { handlers } from "../core/main.js";
import { Snippet } from '../model/snippets.js';

handlers.set('/create-snippet', body => {
  const params = new URLSearchParams(body);

  const date = new Date().toLocaleDateString('sv');
  const slug = `${date}-${params.get('slug')!}`;

  const snippet = new Snippet(slug, params.get('markdownContent')!, {
    published: true,
    title: params.get('title')!,
    archivePage: params.get('archivePage')!,
    archiveSlug: params.get('archiveSlug')!,
    bookSlug: params.get('bookSlug')!,
    tags: params.getAll('tags').filter(t => t),
  });

  snippet.save();

  return `/book-snippets/${slug}.html`;
});

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='/admin/new-book-snippet.css' />
    <MarkdownClientSide />
    <MonacoClientSide />
    <script>{calculateReadingMins.toString()}</script>
    <script src='/admin/new-book-snippet.js' defer></script>
    <script src='/scripts/darkmode.js' defer></script>

    <main>
      <div id='left-panel'>
        <form method='POST' action='/create-snippet'>
          <span>Page</span>  <input autocomplete='off' name='archivePage' autofocus />
          <span>Link</span>  <input autocomplete='off' name='archiveSlug' />
          <span>Book</span>  <input autocomplete='off' name='bookSlug' />
          <span>Title</span> <input autocomplete='off' name='title' />
          <span>Slug</span>  <input autocomplete='off' name='slug' />
          <span>Text</span>  <textarea name='markdownContent' />
          <span>Tags</span>  <ul id='tags'><li><button id='addtag'>Add</button></li></ul>

          <span id='readingmins' />
          <span style='display:grid; gap:0.25em; grid-template-columns: 1fr 1fr'>
            <button>Create</button>
            <button id='fixup-button'>Fixup</button>
          </span>
        </form>
        <Typography>
          <div id='old-body'></div>
        </Typography>
      </div>
      <div id='editorarea'></div>
      <div style='padding-right:1em'>
        <Typography>
          <div id='previewarea'></div>
        </Typography>
      </div>
      <div style='overflow:hidden'>
        <iframe />
      </div>
    </main>

  </EmptyPage>

</>;

function MarkdownClientSide() {
  return <script
    src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.2/markdown-it.min.js"
    integrity="sha512-ohlWmsCxOu0bph1om5eDL0jm/83eH09fvqLDhiEdiqfDeJbEvz4FSbeY0gLJSVJwQAp0laRhTXbUQG+ZUuifUQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />;
}

function MonacoClientSide() {
  return <>
    <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.min.css" />
    <script>{`var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } }`}</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/loader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.nls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.js"></script>
  </>;
}
