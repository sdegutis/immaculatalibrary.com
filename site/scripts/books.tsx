import { RatingStar } from "../shared/rating.js";
import { BookJson } from "./data/books.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";
import { SearchFilter, createSearch } from "./searchlist.js";

const books = await fetch('/scripts/data/books.json').then<BookJson[]>(res => res.json());

const filtersContainer = document.getElementById('books-filters') as HTMLDivElement;

document.getElementById('random-book-button')!.onclick = (e) => {
  const i = Math.floor(Math.random() * books.length);
  const a = books[i]!;
  (e.target as HTMLAnchorElement).href = a.route;
};



const snippetsFilterSource = new Reactive('both');

filtersContainer.append(jsxToElement(<>
  <span class='label'>snippets</span>
  <span>
    <label><input type='radio' name='has-snippets' onclick={() => snippetsFilterSource.set('both')} checked />Any</label>
    <label><input type='radio' name='has-snippets' onclick={() => snippetsFilterSource.set('some')} />Some</label>
    <label><input type='radio' name='has-snippets' onclick={() => snippetsFilterSource.set('none')} />None</label>
  </span>
</>));

const snippetsFilter: SearchFilter<BookJson> = {
  source: snippetsFilterSource,
  matches: (book: BookJson) => {
    if (snippetsFilterSource.val === 'none') return book.empty;
    if (snippetsFilterSource.val === 'some') return !book.empty;
    return true;
  },
};



const starsFilterSource = new Reactive('any');

const starInputs = Array(5).fill('').map((_, i) => {
  const star = jsxToElement(<RatingStar />) as SVGElement;
  const num = i + 1;

  starsFilterSource.onChange(() => {
    star.classList.toggle('lit', +starsFilterSource.val >= num);
  });

  return { star, num };
});

filtersContainer.append(jsxToElement(<>
  <span class='label'>stars</span>
  <span class='radios'>
    <label><input type='radio' name='stars' onclick={() => starsFilterSource.set('any')} checked />Any</label>
    <label><input type='radio' name='stars' onclick={() => starsFilterSource.set('0')} />Unrated</label>
    {starInputs.map(star => <>
      <label>
        <input type='radio' name='stars' onclick={() => starsFilterSource.set(star.num.toFixed())} />
        {star.star}
      </label>
    </>)}
  </span>
</>));

const starsFilter: SearchFilter<BookJson> = {
  source: starsFilterSource,
  matches: (book: BookJson) => {
    if (starsFilterSource.val === 'any') return true;
    return book.stars === +starsFilterSource.val;
  },
};



const searchTerm = new Reactive('');

document.getElementById('search-books-input')!.oninput = (e) => {
  searchTerm.set((e.target as HTMLInputElement).value.trim().toLowerCase());
};

const textFilter: SearchFilter<BookJson> = {
  source: searchTerm,
  matches: (book: BookJson) => (
    book.author.toLowerCase().includes(searchTerm.val) ||
    book.title.toLowerCase().includes(searchTerm.val)
  ),
};



const { results, visibleCount } = createSearch({
  data: books,
  filters: [snippetsFilter, starsFilter, textFilter],
  Item: ({ item: book }) => (
    <li>
      <p><a href={book.route}>{book.title}</a><br /> {book.author}</p>
    </li>
  ),
});

document.getElementById('search-results')!.replaceChildren(results);

visibleCount.onChange(() => {
  document.getElementById('search-count')!.textContent = visibleCount.val.toFixed();
});
