import { EmptyPage } from "../../components/page.js";

export default <>
  <EmptyPage>
    <MonacoClientSide />
    <link rel='stylesheet' href='/admin/book/write.css' />
    <script src='/admin/book/write.js' type='module'></script>
    <script src='/scripts/darkmode.js' defer></script>

    <main>
      <div id='saved' hidden>Saved</div>
      <div id='words' />
      <div id='editorarea' />
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
