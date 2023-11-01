import { Reactive } from "./searching.js";

const booksList = document.getElementById('books-all')!;
const notFound = document.getElementById('no-books-found')!;
const searchBooksInput = document.getElementById('search-books-input')!;

const snippetsMode = new Reactive('both');
const starsMode = new Reactive('any');
const searchTerm = new Reactive('');

Reactive.link(searchBooks, [searchTerm, snippetsMode, starsMode]);
Reactive.link(updateStars, [starsMode]);

searchBooks();

searchBooksInput.oninput = (e) => { searchTerm.set((e.target as HTMLInputElement).value); };

function meetsSnippetsFilter(li: HTMLLIElement) {
  if (snippetsMode.val === 'none') return li.classList.contains('empty');
  if (snippetsMode.val === 'some') return !li.classList.contains('empty');
  return true;
}

function meetsStarsFilter(li: HTMLLIElement) {
  if (starsMode.val === 'any') return true;
  return li.classList.contains(`stars-${starsMode.val}`);
}

function updateStars() {
  for (const radio of document.querySelectorAll<HTMLInputElement>('input[name=bookstars]')) {
    radio.nextElementSibling?.classList.toggle('lit', +starsMode.val >= +radio.value);
  }
}

function searchBooks() {
  const searchString = searchTerm.val
    .trim()
    .toLowerCase();

  for (const li of booksList.querySelectorAll('li')) {
    li.hidden = (
      !meetsSnippetsFilter(li) ||
      !meetsStarsFilter(li) ||
      (!li
        .innerText
        .toLowerCase()
        .includes(searchString))
    );
  }

  const visibleBooks = booksList.querySelectorAll('li:not([hidden])').length;
  notFound.hidden = (visibleBooks > 0);
  document.getElementById('bookscount')!.textContent = visibleBooks.toFixed();
}

document.getElementById('random-book-button')!.onclick = (e) => {
  const ul = document.getElementById('books-all')!;
  const as = [...ul.querySelectorAll('a')];
  const i = Math.floor(Math.random() * as.length);
  const a = as[i]!;
  (e.target as HTMLAnchorElement).href = a.href;
};

for (const radio of document.querySelectorAll('input[name=booksearch]')) {
  radio.addEventListener('change', (e) => {
    snippetsMode.set((e.target as HTMLInputElement).value);
  });
}

for (const radio of document.querySelectorAll('input[name=bookstars]')) {
  radio.addEventListener('change', (e) => {
    starsMode.set((e.target as HTMLInputElement).value);
  });
}
