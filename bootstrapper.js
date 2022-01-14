const darkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
const theme = darkMode ? 'vs-dark' : 'vs';

setupEval();

fetch('/admin/items')
  .then(res => res.json())
  .then(json => {
    for (const [id, data] of json) {
      addItem(id, data);
    }
  });


function addItem(id, data) {
  const itemsRoot = document.getElementById('items');

  // const div = document.createElement('div');
  // div.innerHTML = `
  //   <b>${id}</b>
  // `;

  // itemsRoot.append(div);
}


function setupEval() {
  const evalRoot = document.getElementById('eval');

  const editor = monaco.editor.create(evalRoot, {
    language: 'typescript',
    tabSize: 2,
    theme,
  });

  editor.layout({
    width: 700,
    height: 300,
  });

  editor.addAction({
    id: 'eval',
    label: 'Eval',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
    run: function (ed) {
      const code = editor.getModel().getValue();
      fetch('/admin/eval', {
        method: 'POST',
        body: code,
      }).then(res => res.text()).then(text => {
        console.log(text);
      });
    }
  });
}





function replaceTextArea(language) {
  const textarea = document.currentScript.previousElementSibling;

  const div = document.createElement('div');
  div.style.border = '1px solid #aaa';
  div.style.width = textarea.clientWidth + 'px';
  div.style.height = textarea.clientHeight + 'px';
  textarea.insertAdjacentElement('afterend', div);
  textarea.hidden = true;

  const editor = monaco.editor.create(div, {
    value: textarea.value,
    language,
    tabSize: 2,
    theme,
  });
  editor.getModel().onDidChangeContent(() => {
    textarea.value = editor.getModel().getValue();
  });
  editor.focus();
}
