const snippetsData = fetch('/data/snippets.json').then(res => res.json());

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
  snippetsData.then(snippets => {
    const i = Math.floor(Math.random() * snippets.length);
    const snippet = snippets[i];

    fetch(`/data/snippets/${snippet.slug}-preview.html`)
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
