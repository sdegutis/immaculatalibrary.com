const booksList = document.getElementById('books-all');
const notFound = document.getElementById('no-books-found');
const searchBooksInput = document.getElementById('search-books-input');

class Reactive {
  static link(fn, deps) { for (const dep of deps) dep.onChange(fn); }
  fns = [];
  constructor(init) { this.val = init; }
  onChange(fn) { this.fns.push(fn); }
  set(val) {
    this.val = val;
    for (const fn of this.fns) fn();
  }
}

const snippetsMode = new Reactive('both');
const starsMode = new Reactive('any');
const searchTerm = new Reactive('');

Reactive.link(searchBooks, [searchTerm, snippetsMode, starsMode]);
Reactive.link(updateStars, [starsMode]);

searchBooks();

searchBooksInput.oninput = (e) => { searchTerm.set(e.target.value); };

function meetsSnippetsFilter(li) {
  if (snippetsMode.val === 'both') return true;
  if (snippetsMode.val === 'none') return li.classList.contains('empty');
  if (snippetsMode.val === 'some') return !li.classList.contains('empty');
}

function meetsStarsFilter(li) {
  if (starsMode.val === 'any') return true;
  return li.classList.contains(`stars-${starsMode.val}`);
}

function updateStars() {
  for (const radio of document.querySelectorAll('input[name=bookstars]')) {
    radio.nextElementSibling?.classList.toggle('lit', +starsMode.val >= radio.value);
  }
}

function searchBooks() {
  const searchString = searchTerm.val
    .trim()
    .toLowerCase();

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
    snippetsMode.set(e.target.value);
  });
}

for (const radio of document.querySelectorAll('input[name=bookstars]')) {
  radio.addEventListener('change', (e) => {
    starsMode.set(e.target.value);
  });
}
