const md = markdownit({
  typographer: true,
  html: true,
  linkify: true,
  breaks: true
});

const titleInput = document.querySelector('input[name=title]');
const slugInput = document.querySelector('input[name=slug]');
const contentInput = document.querySelector('textarea[name=markdownContent]');
const previewArea = document.getElementById('previewarea');
const readingMinsEl = document.getElementById('readingmins');

/** @type {import('../../../util/helpers').reading_mins} */
var reading_mins;

const slugify = str => str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

titleInput.addEventListener('input', (e) => {
  slugInput.value = slugify(titleInput.value);
});

let wordWrap = true;

const editor = monaco.editor.create(document.getElementById('editorarea'), {
  value: '',
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'on',
  tabSize: 2,
});

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

editor.getModel().onDidChangeContent(() => {
  const content = editor.getModel().getValue();
  contentInput.value = content;
  previewArea.innerHTML = md.render(content);
  readingMinsEl.innerHTML = reading_mins(content) + ' min';
});
