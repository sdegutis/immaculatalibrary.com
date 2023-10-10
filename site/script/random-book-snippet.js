import { snippetsData } from './modules/load-snippets.js';

makeContinueReadingLinkWork();

function makeContinueReadingLinkWork() {
  const link = document.querySelector('.continue-reading-snippet-link');
  link?.addEventListener('click', e => {
    e.preventDefault();
    link.previousElementSibling.previousElementSibling.remove();
    link.previousElementSibling.hidden = false;
    link.remove();
  });
}

document.getElementById('refresh-random-book-snippet').addEventListener('click', (e) => {
  e.preventDefault();
  doRandomBookSnippet();
});

function doRandomBookSnippet() {
  snippetsData.then(snippetInfo => {
    const snippets = snippetInfo.snippets;
    const i = Math.floor(Math.random() * snippets.length);
    const snippet = snippets[i];

    fetch(`/dynamic/snippets/${snippet.slug}-preview.html`)
      .then(res => res.text())
      .then(insertRandomBookSnippet);
  });
}

function insertRandomBookSnippet(text) {
  const container = document.getElementById('random-book-snippet');
  container.innerHTML = text;
  makeContinueReadingLinkWork();
}

doRandomBookSnippet();