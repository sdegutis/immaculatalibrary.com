doRandomBookSnippet();

document.getElementById('refresh-random-book-snippet').addEventListener('click', (e) => {
  e.preventDefault();
  doRandomBookSnippet();
  gtag('event', 'click_random_snippet', { 'event_category': 'Random Book Snippet', 'event_label': 'Homepage Random Book Snippet' });
});

function doRandomBookSnippet() {
  fetch('/book-snippets/random')
    .then(res => res.json())
    .then(insertRandomBookSnippet);
}

function insertRandomBookSnippet(json) {
  const container = document.getElementById('random-book-snippet');
  container.innerHTML = `
    <h4><a href="${json.url}">${json.title}</a></h4>
    <p>${json.formattedDate} &bull; ${json.readingMins} min</p>
    <p>From <a href="${json.book.url}">${json.book.title}</a>, page <a href=${json.archiveLink}>${json.pageNumber}</a></p>
    <div class='rendered-preview'>
    ${json.preview}
    ${json.hasPreview
      ? `<p><a href="${json.url}" class='render-preview-button'><i>Continue reading...</i></a></p>`
      : ''
    }
    </div>
  `.trim();

  const rendPrev = /** @type {HTMLDivElement} */(container.getElementsByClassName('rendered-preview')[0]);
  const button = /** @type {HTMLAnchorElement} */(container.getElementsByClassName('render-preview-button')[0]);
  if (button) {
    button.onclick = (e) => {
      e.preventDefault();
      rendPrev.innerHTML = json.previewFull;
    };
  }
}
