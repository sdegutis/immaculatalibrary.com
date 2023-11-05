import { RatingStar } from "../shared/rating.js";
import { BookJson } from "./data/books.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";
import { SearchFilter, createSearch } from "./searchlist.js";
import { randomElement, sleep } from "./util.js";

const booksFetch = fetch('/scripts/data/books.json').then<BookJson[]>(res => res.json());
await sleep(1);
const books = await booksFetch;

const snippetsFilterSource = new Reactive('both');
const starsFilterSource = new Reactive('any');
const searchTerm = new Reactive('');

document.getElementById('random-book-button')!.onclick = (e) => {
  (e.target as HTMLAnchorElement).href = randomElement(books).route;
};

document.getElementById('filters-container')!.replaceChildren(jsxToElement(<>
  <p>
    <input autofocus placeholder='Search' type="text" oninput={(e: Event) => {
      searchTerm.set((e.target as HTMLInputElement).value.trim().toLowerCase());
    }} />
  </p>
  <div id='books-filters'>
    <span class='label'>snippets</span>
    <span>
      <label><input type='radio' name='has-snippets' onclick={() => snippetsFilterSource.set('both')} checked />Any</label>
      <label><input type='radio' name='has-snippets' onclick={() => snippetsFilterSource.set('some')} />Some</label>
      <label><input type='radio' name='has-snippets' onclick={() => snippetsFilterSource.set('none')} />None</label>
    </span>

    <span class='label'>stars</span>
    <span class='radios'>
      <label><input type='radio' name='stars' onclick={() => starsFilterSource.set('any')} checked />Any</label>
      <label><input type='radio' name='stars' onclick={() => starsFilterSource.set('0')} />Unrated</label>
      {Array(5).fill(0).map((_, i) => {
        const star = jsxToElement(<RatingStar />) as SVGElement;
        const num = i + 1;

        starsFilterSource.onChange(() => {
          star.classList.toggle('lit', +starsFilterSource.val >= num);
        });

        return <>
          <label>
            <input type='radio' name='stars' onclick={() => starsFilterSource.set(num.toFixed())} />
            {star}
          </label>
        </>;
      })}
    </span>
  </div>
</>));


const snippetsFilter: SearchFilter<BookJson> = {
  source: snippetsFilterSource,
  matches: (book: BookJson) => {
    if (snippetsFilterSource.val === 'none') return book.empty;
    if (snippetsFilterSource.val === 'some') return !book.empty;
    return true;
  },
};




const starsFilter: SearchFilter<BookJson> = {
  source: starsFilterSource,
  matches: (book: BookJson) => {
    if (starsFilterSource.val === 'any') return true;
    return book.stars === +starsFilterSource.val;
  },
};



const textFilter: SearchFilter<BookJson> = {
  source: searchTerm,
  matches: (book: BookJson) => (
    book.author.toLowerCase().includes(searchTerm.val) ||
    book.title.toLowerCase().includes(searchTerm.val)
  ),
};



const { results, visibleCount, search } = createSearch({
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

search();
