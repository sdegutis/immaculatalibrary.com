import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { SnippetJson } from '../../scripts/data/snippets/snippet.json.js';
import { mdOptions } from '../../shared/markdown.js';

const md = MarkdownIt(mdOptions);

const params = new URLSearchParams(window.location.search);
const slug = params.get('snippet')!;
const snippet = await fetch(`/scripts/data/snippets/${slug}.json`).then<SnippetJson>(res => res.json());

document.querySelector('iframe')!.src = snippet.archiveLink;

const contentInput = document.querySelector<HTMLTextAreaElement>('textarea[name=markdownContent]')!;
const previewArea = document.getElementById('previewarea') as HTMLDivElement;

var monaco = (window as any).monaco;
const editor = monaco.editor.create(document.getElementById('editorarea'), {
  value: snippet.content,
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'on',
  tabSize: 2,
});

editor.getModel().onDidChangeContent(() => {
  processInput();
});

processInput();

function processInput() {
  const content = editor.getModel().getValue();
  contentInput.value = content;
  previewArea.innerHTML = md.render(content);
}
