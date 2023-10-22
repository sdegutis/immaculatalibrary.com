import { Column, Spaced } from './components/column/column';
import { TypicalPage } from './components/page';
import { RatingStar } from './components/rating/rating';
import { SnippetsGroups } from './components/snippet-groups';
import css from './css/books.css';
import { allBooks } from './model/books';
import { allSnippets } from './model/snippets';
import script from './script/books.js';

export default <>
  <TypicalPage title='Books' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <link rel="stylesheet" href={css.path} />

          <h2>All Books</h2>

          <script src={script.path} defer></script>
          <p>Not sure what to read?<br /> Try a <a href='#' id='random-book-button'>Random Book</a>.</p>
          <hr />

          <p>
            <input autofocus placeholder='Search' type="text" id='search-books-input' />
          </p>

          <div id='books-filters'>

            <span class='label'>snippets</span>
            <span class='radios'>
              <label><input type='radio' name='booksearch' value='both' checked />Any</label>
              <label><input type='radio' name='booksearch' value='some' />Some</label>
              <label><input type='radio' name='booksearch' value='none' />None</label>
            </span>

            <span class='label'>stars</span>
            <span class='radios'>
              <label><input type='radio' name='bookstars' value='any' checked />Any</label>
              <label><input type='radio' name='bookstars' value='0' />Unrated</label>
              <label><input type='radio' name='bookstars' value='1' /><RatingStar /></label>
              <label><input type='radio' name='bookstars' value='2' /><RatingStar /></label>
              <label><input type='radio' name='bookstars' value='3' /><RatingStar /></label>
              <label><input type='radio' name='bookstars' value='4' /><RatingStar /></label>
              <label><input type='radio' name='bookstars' value='5' /><RatingStar /></label>
            </span>

          </div>

          <hr />

          <p>Showing <span id='bookscount'>0</span> books</p>

          <ul id="books-all" style="padding-left: 20px">
            {allBooks.map(book => {
              const classes = [];
              if (book.snippets.length === 0) classes.push('empty');
              classes.push(`stars-${book.data.rating}`);

              return <>
                <li class={classes.join(' ')}>
                  <p><a class="link" href={book.route}>{book.data.title}</a><br /> {book.data.author}</p>
                </li>
              </>;
            })}
          </ul>

          <span hidden id="no-books-found" style="font-style: italic">
            No results
          </span>


        </div>

        <div>
          <h3>Latest book snippets</h3>
          <SnippetsGroups snippets={allSnippets.slice(0, 10)} />
        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
