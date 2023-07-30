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
  fetch('/book-snippets/random')
    .then(res => res.text())
    .then(insertRandomBookSnippet);
}

function insertRandomBookSnippet(text) {
  const container = document.getElementById('random-book-snippet');
  container.innerHTML = text;
  makeContinueReadingLinkWork();
}

doRandomBookSnippet();
