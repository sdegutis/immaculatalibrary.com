const booksList = document.getElementById('books-all');
const notFound = document.getElementById('no-books-found');
const searchBooksInput = document.getElementById('search-books-input');

let mode = 'both';

function inMode(li) {
  if (mode === 'both') return true;
  if (mode === 'none') return li.classList.contains('empty');
  if (mode === 'some') return !li.classList.contains('empty');
}

function searchBooks() {
  const searchString = searchBooksInput
    .value
    .trim()
    .toLowerCase();

  for (const li of booksList.querySelectorAll('li')) {
    li.hidden = (!inMode(li)) | (!li
      .innerText
      .toLowerCase()
      .includes(searchString));
  }

  notFound.hidden = (booksList.querySelectorAll('li:not([hidden])').length > 0);
}

for (const button of document.querySelectorAll('.random-book-button')) {
  button.onclick = (e) => {
    const ul = document.getElementById('books-all');
    const as = [...ul.querySelectorAll('a')];
    const i = Math.floor(Math.random() * as.length);
    const a = as[i];
    button.href = a.href;
  };
}

for (const radio of document.querySelectorAll('input[name=booksearch]')) {
  radio.addEventListener('change', (e) => {
    mode = e.target.value;
    searchBooks();
  });
}
