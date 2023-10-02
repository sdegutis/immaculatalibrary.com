window.addEventListener('beforeunload', (e) => {
  e.returnValue = 'Abandon all changes!?';
});

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

const createButton = document.getElementById('create-button');
const fixupButton = document.getElementById('fixup-button');

createButton.onclick = (e) => {
  e.preventDefault();

  const date = new Date().toLocaleDateString('sv');
  const filename = `${date}-${slugInput.value}.md`;

  const markdown = contentInput.value;
  const content = `
---
published: true
title: ${JSON.stringify(titleInput.value)}
archiveSlug: ${JSON.stringify(document.querySelector('input[name=archiveSlug]').value)}
archivePage: ${JSON.stringify(document.querySelector('input[name=archivePage]').value)}
bookSlug: ${JSON.stringify(document.querySelector('input[name=bookSlug]').value)}
---

${markdown}
  `.trim() + '\n';

  const file = new Blob([content], { type: 'plain/text' });
  const a = document.createElement('a');
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

fixupButton.onclick = (e) => {
  e.preventDefault();

  editor.getModel().pushStackElement();

  const content = editor.getModel().getValue();
  const fixedContent = (content
    .trim()
    .replace(/ {2,}/g, ' ')
    .replace(/ ;/g, ';')
    .replace(/ :/g, ';')
    .replace(/- /g, '')
    .replace(/ !/g, '!')
    .replace(/ \?/g, '?')
    .replace(/(\r?\n)+/gm, '\n\n')
    .replace(/^/gm, '> ')
    .replace(/ aud /g, " and ")
    + '\n');

  editor.executeEdits('admin', [{
    range: editor.getModel().getFullModelRange(),
    text: fixedContent,
  }]);
}

/** @type {import('../../../util/helpers').calculateReadingMins} */
var calculateReadingMins;

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
  readingMinsEl.innerHTML = calculateReadingMins(content) + ' min';
});
