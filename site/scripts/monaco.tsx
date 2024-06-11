export type Monaco = typeof import('monaco-editor');

export function loadMonaco(): Promise<Monaco> {
  return new Promise<Monaco>(resolve => {
    function resolveMonacoEventually() {
      if (window.monaco) {
        resolve(window.monaco);
      }
      else {
        setTimeout(resolveMonacoEventually, 100);
      }
    }

    let count = 3;
    function loaded() {
      count--;
      if (count === 0) {
        resolveMonacoEventually();
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
