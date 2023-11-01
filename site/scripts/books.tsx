import { RatingStar } from "../shared/rating.js";
import { BookJson } from "./data/books.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./searching.js";

const booksData = await fetch('/scripts/data/books.json').then<BookJson[]>(res => res.json());

const container = document.getElementById('search-results') as HTMLDivElement;
const booksList = jsxToElement(<ul id="books-all" />) as HTMLUListElement;
const notFound = document.getElementById('no-books-found')!;
const searchBooksInput = document.getElementById('search-books-input')!;

const snippetsMode = new Reactive('both');
const starsMode = new Reactive('any');
const searchTerm = new Reactive('');

const bookFiltersContainer = document.getElementById('books-filters') as HTMLDivElement;

function changeSnippetsFilter(this: HTMLInputElement) {
  snippetsMode.set(this.value);
}

function changeStarsFilter(this: HTMLInputElement) {
  starsMode.set(this.value);
}



bookFiltersContainer.append(jsxToElement(<>

  <span class='label'>snippets</span>
  <span class='radios'>
    <label><input type='radio' name='booksearch' onclick={changeSnippetsFilter} value='both' checked />Any</label>
    <label><input type='radio' name='booksearch' onclick={changeSnippetsFilter} value='some' />Some</label>
    <label><input type='radio' name='booksearch' onclick={changeSnippetsFilter} value='none' />None</label>
  </span>

  <span class='label'>stars</span>
  <span class='radios'>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='any' checked />Any</label>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='0' />Unrated</label>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='1' /><RatingStar /></label>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='2' /><RatingStar /></label>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='3' /><RatingStar /></label>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='4' /><RatingStar /></label>
    <label><input type='radio' name='bookstars' onclick={changeStarsFilter} value='5' /><RatingStar /></label>
  </span>

</>));




const books = booksData.map(data => ({
  data: data,
  element: jsxToElement(
    <li>
      <p><a href={data.route}>{data.title}</a><br /> {data.author}</p>
    </li>
  ) as HTMLLIElement,
}));

container.innerHTML = '';
container.append(booksList);
for (const book of books) {
  booksList.append(book.element);
}

Reactive.link(searchBooks, [searchTerm, snippetsMode, starsMode]);
Reactive.link(updateStars, [starsMode]);

searchBooks();

searchBooksInput.oninput = (e) => { searchTerm.set((e.target as HTMLInputElement).value); };

function meetsSnippetsFilter(book: BookJson) {
  if (snippetsMode.val === 'none') return book.empty;
  if (snippetsMode.val === 'some') return !book.empty;
  return true;
}

function meetsStarsFilter(book: BookJson) {
  if (starsMode.val === 'any') return true;
  return book.stars === +starsMode.val;
}

function updateStars() {
  for (const radio of document.querySelectorAll<HTMLInputElement>('input[name=bookstars]')) {
    radio.nextElementSibling?.classList.toggle('lit', +starsMode.val >= +radio.value);
  }
}

function textInBook(book: BookJson, term: string) {
  return (
    book.author.toLowerCase().includes(term) ||
    book.title.toLowerCase().includes(term)
  );
}

function searchBooks() {
  const searchString = searchTerm.val
    .trim()
    .toLowerCase();

  for (const book of books) {
    book.element.hidden = (
      !meetsSnippetsFilter(book.data) ||
      !meetsStarsFilter(book.data) ||
      !textInBook(book.data, searchString)
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
