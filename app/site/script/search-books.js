const booksList = document.getElementById('books-all');
const notFound = document.getElementById('no-books-found');

function searchBooks(el) {
  const searchString = el
    .value
    .trim()
    .toLowerCase();

  for (const book of booksList.querySelectorAll('li')) {
    book.hidden = !book
      .innerText
      .toLowerCase()
      .includes(searchString);
  }

  notFound.hidden = (booksList.querySelectorAll('li:not([hidden])').length > 0);
}
