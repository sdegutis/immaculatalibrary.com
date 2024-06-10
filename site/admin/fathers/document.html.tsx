import { EmptyPage } from "../../components/page.js";
import { Typography } from "../../components/typography.js";

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./document.css' />
    <MonacoClientSide />
    <script src='./document-client.js' type='module'></script>

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

function MonacoClientSide() {
  return <>
    <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.min.css" />
    <script>{`var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } }`}</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/loader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.nls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.js"></script>
  </>;
}
