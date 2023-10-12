window.addEventListener('beforeunload', (e) => {
  e.returnValue = 'Abandon all changes!?';
});

const md = markdownit({
  typographer: true,
  html: true,
  linkify: true,
  breaks: true
});

const params = new URLSearchParams(window.location.search);
document.querySelector('input[name=archivePage]').value = params.get('archivePage');
document.querySelector('input[name=archiveSlug]').value = params.get('archiveSlug');
document.querySelector('input[name=bookSlug]').value = params.get('bookSlug');
document.querySelector('iframe').src = params.get('archiveLink');
document.getElementById('old-body').innerHTML = params.get('renderedBody');

const addTagButton = document.getElementById('addtag');
const tagsList = document.getElementById('tags');

const tags = JSON.parse(params.get('tags'));
for (const tag of tags) {
  const li = document.createElement('li');
  li.innerHTML = `<label><input type='checkbox' name='tags' value=${JSON.stringify(tag)}> ${tag}</label>`;
  addTagButton.parentElement.insertAdjacentElement('beforebegin', li);
}

addTagButton.onclick = (e) => {
  e.preventDefault();

  const li = document.createElement('li');
  li.innerHTML = `<label><input type='input' name='tags'></label>`;
  addTagButton.parentElement.insertAdjacentElement('beforebegin', li);
  li.querySelector('input').focus();
};

const titleInput = document.querySelector('input[name=title]');
const slugInput = document.querySelector('input[name=slug]');
const contentInput = document.querySelector('textarea[name=markdownContent]');
const previewArea = document.getElementById('previewarea');
const readingMinsEl = document.getElementById('readingmins');

const fixupButton = document.getElementById('fixup-button');

fixupButton.onclick = (e) => {
  e.preventDefault();

  editor.getModel().pushStackElement();

  let sels = editor.getSelections();
  if (sels.every(sel => sel.isEmpty())) {
    sels = [editor.getModel().getFullModelRange()];
  }

  editor.executeEdits('admin', sels.map(sel => {
    const content = editor.getModel().getValueInRange(sel);
    const fixedContent = (content
      .trimEnd()
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

    return {
      range: sel,
      text: fixedContent,
    };
  }));
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
