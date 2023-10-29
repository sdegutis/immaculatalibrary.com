const wordsArea = document.getElementById('words') as HTMLDivElement;

let content = localStorage.getItem('text') ?? '';

window.addEventListener('keydown', e => {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault();
    saveNow();
  }
});

const words: Record<string, number> = JSON.parse(localStorage.getItem('words') ?? '{}');

function sortBy<T>(fn: (o: T) => string | number) {
  return (l: T, r: T) => {
    const a = fn(l);
    const b = fn(r);
    return a < b ? -1 : a > b ? 1 : 0;
  };
}

function processTextChange() {
  const [first, second] = content.split(/\n---\n/);
  if (!second) return;

  wordsArea.innerHTML = '';

  const lowerCaseWords = first!.toLowerCase().split(/[\t\n]/);
  const uniqueWords = [...new Set(lowerCaseWords)].filter(s => s);
  for (const word of uniqueWords.sort(sortBy(s => s.length))) {

    // console.log(word, [...second!.matchAll(new RegExp(word, 'gi'))].length);

    // words[word] ??= 0;
    words[word] = [...second!.matchAll(new RegExp(word, 'gi'))].length;

    const el = document.createElement('span');
    el.textContent = word;
    wordsArea.append(el, ' ');

    // el.oncontextmenu = (e) => {
    //   e.preventDefault();
    //   words[word]--;
    //   if (words[word]! < 0) words[word] = 0;
    //   processTextChange();
    //   saveSoon();
    // };

    // el.onclick = (e) => {
    //   e.preventDefault();
    //   words[word]++;
    //   processTextChange();
    //   saveSoon();
    // };
    el.style.backgroundColor = `#139${words[word]?.toString(16)}`;
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

function saveNow() {
  showSave();
  localStorage.setItem('text', content);
  localStorage.setItem('words', JSON.stringify(words));
}

const saved = document.getElementById('saved') as HTMLDivElement;
function showSave() {
  saved.hidden = false;
  setTimeout(() => {
    saved.hidden = true;
  }, 1000);
}

const saveSoon = debounce(1000, saveNow);

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
