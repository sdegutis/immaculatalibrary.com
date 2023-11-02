import { RatingStar } from "../shared/rating.js";
import { BookJson } from "./data/books.json.js";
import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./searching.js";

const booksData = await fetch('/scripts/data/books.json').then<BookJson[]>(res => res.json());

const bookFiltersContainer = document.getElementById('books-filters') as HTMLDivElement;


document.getElementById('random-book-button')!.onclick = (e) => {
  const i = Math.floor(Math.random() * booksData.length);
  const a = booksData[i]!;
  (e.target as HTMLAnchorElement).href = a.route;
};





const snippetsFilterSource = new Reactive('both');

bookFiltersContainer.append(jsxToElement(<>
  <span class='label'>snippets</span>
  <span class='radios'>
    <label><input type='radio' name='booksearch' onclick={() => snippetsFilterSource.set('both')} checked />Any</label>
    <label><input type='radio' name='booksearch' onclick={() => snippetsFilterSource.set('some')} />Some</label>
    <label><input type='radio' name='booksearch' onclick={() => snippetsFilterSource.set('none')} />None</label>
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

bookFiltersContainer.append(jsxToElement(<>
  <span class='label'>stars</span>
  <span class='radios'>
    <label><input type='radio' name='bookstars' onclick={() => starsFilterSource.set('any')} checked />Any</label>
    <label><input type='radio' name='bookstars' onclick={() => starsFilterSource.set('0')} />Unrated</label>
    {starInputs.map(star => <>
      <label>
        <input type='radio' name='bookstars' onclick={() => starsFilterSource.set(star.num.toFixed())} />
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



interface SearchFilter<T> {
  source: Reactive<any>;
  matches: (data: T) => boolean,
}

createSearch({
  data: booksData,
  container: document.getElementById('search-results')!,
  makeUi: book => (
    <li>
      <p><a href={book.route}>{book.title}</a><br /> {book.author}</p>
    </li>
  ),
  filters: [
    snippetsFilter,
    starsFilter,
    textFilter,
  ],
});



function createSearch<T>({ data, makeUi, filters, container }: {
  data: T[];
  makeUi: (item: T) => JSX.Element;
  filters: SearchFilter<T>[];
  container: HTMLElement,
}) {
  const visibleItems = new Reactive<typeof items>([]);
  const visibleCount = new Reactive(0);

  container.innerHTML = '';

  const ul = jsxToElement(<ul id="books-all" />) as HTMLUListElement;
  container.append(ul);

  const notFound = jsxToElement(<em>No results</em>) as HTMLElement;
  container.append(notFound);

  visibleCount.onChange(() => {
    notFound.hidden = visibleCount.val !== 0;
    document.getElementById('bookscount')!.textContent = visibleCount.val.toFixed();
  });

  visibleItems.onChange(() => {
    visibleCount.set(visibleItems.val.length);
  });

  const items = data.map(data => {
    const element = jsxToElement(makeUi(data)) as HTMLLIElement;
    const item = { data, element };
    visibleItems.onChange(() => {
      element.hidden = !visibleItems.val.includes(item);
    });
    return item;
  });

  for (const item of items) {
    ul.append(item.element);
  }

  for (const filter of filters) {
    filter.source.onChange(search);
  }

  function search() {
    visibleItems.set(items.filter(item => {
      for (const filter of filters) {
        if (!filter.matches(item.data)) {
          return false;
        }
      }
      return true;
    }));
  }

  search();
}
