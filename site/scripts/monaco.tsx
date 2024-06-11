export async function loadMonaco() {
  await new Promise<void>(resolve => {
    let count = 3;
    function loaded() {
      count--;
      if (count === 0) {
        resolve();
      }
    }

    (window as any).require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } };
    document.body.append(<>
      <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.min.css" />
      <script onload={loaded} src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/loader.min.js" />
      <script onload={loaded} src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.nls.js" />
      <script onload={loaded} src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.js" />
    </>);
  });
}
