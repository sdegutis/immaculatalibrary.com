import { Typography } from "../components/typography.js";
import { RatingStar } from "../shared/rating.js";
import { BookJson } from "./data/books.json.js";
import { Reactive } from "./reactive.js";
import { createSearch, findWithinMarkdown, highlight } from "./searchlist.js";
import { randomElement, sleep } from "./util.js";

const booksFetch = fetch('/scripts/data/books.json').then<BookJson[]>(res => res.json());
await sleep(.1);
const books = await booksFetch;

const allCategories = [...new Set(books.flatMap(book => book.categories))].sort();

const snippetsFilterSource = new Reactive('both');
const starsFilterSource = new Reactive('any');
const searchTerm = new Reactive('');

const currentCategory = new Reactive('_any');

const { results, matchingItems } = createSearch({
  data: books,
  searchTerm,
  filters: [
    {
      source: currentCategory,
      matches: (book: BookJson) => {
        if (currentCategory.val === '_any') return true;
        return book.categories.includes(currentCategory.val);
      },
    },
    {
      source: snippetsFilterSource,
      matches: (book: BookJson) => {
        if (snippetsFilterSource.val === 'none') return book.empty;
        if (snippetsFilterSource.val === 'some') return !book.empty;
        return true;
      },
    },
    {
      source: starsFilterSource,
      matches: (book: BookJson) => {
        if (starsFilterSource.val === 'any') return true;
        return book.stars === +starsFilterSource.val;
      },
    },
    {
      source: searchTerm,
      matches: (book: BookJson) => (
        book.author.toLowerCase().includes(searchTerm.val) ||
        book.title.toLowerCase().includes(searchTerm.val) ||
        book.description.toLowerCase().includes(searchTerm.val)
      ),
    },
  ],
  viewForItem: (book, search) => {
    const matchedBody = findWithinMarkdown(book.description, search);
    return (
      <li>
        <p>
          <a href={book.route}>{highlight(book.title, search)}</a><br />
          {highlight(book.author, search)}
        </p>
        {matchedBody &&
          <Typography style='font-size:smaller' deindent>
            <blockquote innerHTML={matchedBody} />
          </Typography>
        }
      </li>
    );
  },
});

document.querySelector('.search-results')!.replaceChildren(results);

matchingItems.onChange(() => {
  document.querySelector('.search-count')!.textContent = matchingItems.val.length.toFixed();
});

const randomBookLink = <a href='#' onclick={function (this: HTMLAnchorElement, e: Event) {
  if (matchingItems.val.length === 0) {
    e.preventDefault();
    return;
  }

  this.href = randomElement(matchingItems.val).route;
}}>Random Book</a> as HTMLAnchorElement;

matchingItems.onChange(() => {
  randomBookLink.toggleAttribute('disabled', matchingItems.val.length === 0);
});

document.querySelector('.filters-container')!.replaceChildren(<>
  <p>
    <input autofocus style='width: 100%' placeholder='Search' type="text" oninput={function (this: HTMLInputElement) {
      searchTerm.set(this.value.trim().toLowerCase());
    }} />
  </p>
  <div class='books-filters'>
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
        const star = (<RatingStar /> as DocumentFragment).querySelector('svg')!;
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

    <span class='label'>category</span>
    <select onchange={function (this: HTMLSelectElement) { currentCategory.set(this.value) }}>
      <option value='_any' selected={currentCategory.val === '_any'}>Any</option>
      {allCategories.map(cat =>
        <option value={cat} selected={currentCategory.val === cat}>{cat}</option>
      )}
    </select>

  </div>
  <hr />
  <p>
    Not sure what to read?<br />
    Try a {randomBookLink} from these.
  </p>
</>);
