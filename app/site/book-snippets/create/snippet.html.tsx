import { EmptyPage } from "../../../components/page";
import { Typography } from "../../../components/typography";
import { calculateReadingMins, markdown } from "../../../core/helpers";
import { allSnippets } from "../../../model/models";

export default allSnippets.map(snippet => [`${snippet.slug}.html`, <>
  <EmptyPage>
    <link rel='stylesheet' href='/admin/clone-style.css' />
    <link rel='stylesheet' href='/admin/admin-form.css' />
    <MarkdownClientSide />
    <MonacoClientSide />
    <script>{calculateReadingMins.toString()}</script>
    <script src='/admin/new-book-snippet.js' defer></script>
    <script src='/script/darkmode.js' defer></script>

    <main>
      <div id='left-panel'>
        <form>
          <span>Page</span>    <input autocomplete='off' name='archivePage' value={snippet.archivePage} autofocus />
          <span>Link</span>    <input autocomplete='off' name='archiveSlug' value={snippet.archiveSlug} />
          <span>Book</span>    <input autocomplete='off' name='bookSlug' value={snippet.bookSlug} />
          <span>Title</span>   <input autocomplete='off' name='title' />
          <span>Slug</span>    <input autocomplete='off' name='slug' />
          <span>Text</span> <textarea name='markdownContent' />

          <span id='readingmins'></span> <button>Create</button>
        </form>
        <Typography>
          {markdown.render(snippet.content)}
        </Typography>
      </div>
      <div id='editorarea'></div>
      <div style='padding-right:1em'>
        <Typography>
          <div id='previewarea'></div>
        </Typography>
      </div>
      <div style='overflow:hidden'>
        <iframe src={snippet.archiveLink}></iframe>
      </div>
    </main>

  </EmptyPage>

</>]);

function MarkdownClientSide() {
  return <script
    src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.2.0/markdown-it.min.js"
    integrity="sha512-cTQeM/op796Fp1ZUxfech8gSMLT/HvrXMkRGdGZGQnbwuq/obG0UtcL04eByVa99qJik7WlnlQOr5/Fw5B36aw=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />;
}

function MonacoClientSide() {
  return <>
    <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.min.css" />
    <script>{`var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs' } }`}</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/loader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.nls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.js"></script>
  </>;
}
