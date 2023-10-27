let content = localStorage.getItem('text') ?? '';

function processTextChange() {

}

var monaco = (window as any).monaco;
const editor = monaco.editor.create(document.getElementById('editorarea'), {
  value: content,
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'off',
  tabSize: 2,
});

const saveSoon = throttle(1000, () => {
  console.log('saving');
  localStorage.setItem('text', content);
});

processTextChange();
const processTextChangeSoon = throttle(1000, processTextChange);

editor.getModel().onDidChangeContent(() => {
  content = editor.getModel().getValue();
  saveSoon();
  processTextChangeSoon();
});

let wordWrap = false;
editor.addAction({
  id: 'toggle-word-wrap',
  label: 'Toggle word wrap',
  keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyZ],
  precondition: null,
  keybindingContext: null,
  run: () => {
    wordWrap = !wordWrap;
    editor.updateOptions({
      wordWrap: wordWrap ? 'on' : 'off',
    });
  }
});

function throttle(ms: number, fn: () => void) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
