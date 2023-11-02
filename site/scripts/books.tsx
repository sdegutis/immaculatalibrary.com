import { RatingStar } from "../shared/rating.js";
import { BookJson } from "./data/books.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./searching.js";

const booksData = await fetch('/scripts/data/books.json').then<BookJson[]>(res => res.json());

const container = document.getElementById('search-results') as HTMLDivElement;
const booksList = jsxToElement(<ul id="books-all" />) as HTMLUListElement;
const notFound = jsxToElement(<em>No results</em>) as HTMLElement;
const searchBooksInput = document.getElementById('search-books-input')!;

const visibleBooks = new Reactive<typeof books>([]);
const visibleBookCount = new Reactive(0);

visibleBooks.onChange(() => {
  visibleBookCount.set(visibleBooks.val.length);
});

visibleBookCount.onChange(() => {
  notFound.hidden = visibleBookCount.val !== 0;
  document.getElementById('bookscount')!.textContent = visibleBookCount.val.toFixed();
});



const starsMode = new Reactive('any');

const starInputs = Array(5).fill('').map((_, i) => {
  const star = jsxToElement(<RatingStar />) as SVGElement;
  const num = i + 1;

  starsMode.onChange(() => {
    star.classList.toggle('lit', +starsMode.val >= num);
  });

  return { star, num };
});

const starFilterUi = jsxToElement(<>
  <span class='label'>stars</span>
  <span class='radios'>
    <label><input type='radio' name='bookstars' onclick={() => starsMode.set('any')} checked />Any</label>
    <label><input type='radio' name='bookstars' onclick={() => starsMode.set('0')} />Unrated</label>
    {starInputs.map(star => <>
      <label>
        <input type='radio' name='bookstars' onclick={() => starsMode.set(star.num.toFixed())} />
        {star.star}
      </label>
    </>)}
  </span>
</>);

starsMode.onChange(searchBooks);

function meetsStarsFilter(book: BookJson) {
  if (starsMode.val === 'any') return true;
  return book.stars === +starsMode.val;
}





const snippetsMode = new Reactive('both');

const snippetsFilterUi = jsxToElement(<>
  <span class='label'>snippets</span>
  <span class='radios'>
    <label><input type='radio' name='booksearch' onclick={() => snippetsMode.set('both')} checked />Any</label>
    <label><input type='radio' name='booksearch' onclick={() => snippetsMode.set('some')} />Some</label>
    <label><input type='radio' name='booksearch' onclick={() => snippetsMode.set('none')} />None</label>
  </span>
</>);

snippetsMode.onChange(searchBooks);

function meetsSnippetsFilter(book: BookJson) {
  if (snippetsMode.val === 'none') return book.empty;
  if (snippetsMode.val === 'some') return !book.empty;
  return true;
}




const bookFiltersContainer = document.getElementById('books-filters') as HTMLDivElement;
bookFiltersContainer.append(snippetsFilterUi);
bookFiltersContainer.append(starFilterUi);


const books = booksData.map(data => {
  const element = jsxToElement(
    <li>
      <p><a href={data.route}>{data.title}</a><br /> {data.author}</p>
    </li>
  ) as HTMLLIElement;

  const book = { data, element };

  visibleBooks.onChange(() => {
    element.hidden = !visibleBooks.val.includes(book);
  });

  return book;
});

container.innerHTML = '';
container.append(booksList);
container.append(notFound);
for (const book of books) {
  booksList.append(book.element);
}



const searchTerm = new Reactive('');

searchBooksInput.oninput = (e) => {
  searchTerm.set((e.target as HTMLInputElement).value.trim().toLowerCase());
};

searchTerm.onChange(searchBooks);

function textInBook(book: BookJson) {
  return (
    book.author.toLowerCase().includes(searchTerm.val) ||
    book.title.toLowerCase().includes(searchTerm.val)
  );
}



searchBooks();

function searchBooks() {
  visibleBooks.set(books.filter(book => !(
    !meetsSnippetsFilter(book.data) ||
    !meetsStarsFilter(book.data) ||
    !textInBook(book.data)
  )));
}

document.getElementById('random-book-button')!.onclick = (e) => {
  const ul = document.getElementById('books-all')!;
  const as = [...ul.querySelectorAll('a')];
  const i = Math.floor(Math.random() * as.length);
  const a = as[i]!;
  (e.target as HTMLAnchorElement).href = a.href;
};
