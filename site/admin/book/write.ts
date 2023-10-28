let content = localStorage.getItem('text') ?? '';

const words = new Map<string, number>();

function processTextChange() {
  const [first, second] = content.split(/\n---\n/);

  words.clear();

  const lowerCaseWords = first!.toLowerCase().split(/[\t\n]/);
  const uniqueWords = [...new Set(lowerCaseWords)];
  for (const word of uniqueWords.sort()) {

    console.log(word, [...second!.matchAll(new RegExp(word, 'gi'))].length);

    words.set(word, 1);
  }
  console.log(words);
}

var monaco = (window as any).monaco;
const editor = monaco.editor.create(document.getElementById('editorarea'), {
  value: content,
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'off',
  tabSize: 2,
});

const saveSoon = debounce(1000, () => {
  console.log('saving');
  localStorage.setItem('text', content);
});

processTextChange();
const processTextChangeSoon = debounce(1000, processTextChange);

editor.getModel().onDidChangeContent(() => {
  content = editor.getModel().getValue();
  content = content.replace(/\r\n/g, '\n');
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

function debounce(ms: number, fn: () => void) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
