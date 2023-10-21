const booksList = document.getElementById('books-all');
const notFound = document.getElementById('no-books-found');
const searchBooksInput = document.getElementById('search-books-input');

let snippetsMode = 'both';
let starsMode = 'any';
searchBooks();

function meetsSnippetsFilter(li) {
  if (snippetsMode === 'both') return true;
  if (snippetsMode === 'none') return li.classList.contains('empty');
  if (snippetsMode === 'some') return !li.classList.contains('empty');
}

function meetsStarsFilter(li) {
  if (starsMode === 'any') return true;
  return li.classList.contains(`stars-${starsMode}`);
}

function searchBooks() {
  const searchString = searchBooksInput
    .value
    .trim()
    .toLowerCase();

  console.log(starsMode)

  for (const li of booksList.querySelectorAll('li')) {
    li.hidden = (
      !meetsSnippetsFilter(li) |
      !meetsStarsFilter(li) |
      (!li
        .innerText
        .toLowerCase()
        .includes(searchString))
    );
  }

  const visibleBooks = booksList.querySelectorAll('li:not([hidden])').length;
  notFound.hidden = (visibleBooks > 0);
  document.getElementById('bookscount').textContent = visibleBooks;
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
    snippetsMode = e.target.value;
    searchBooks();
  });
}

for (const radio of document.querySelectorAll('input[name=bookstars]')) {
  radio.addEventListener('change', (e) => {
    starsMode = e.target.value;
    searchBooks();
  });
}
