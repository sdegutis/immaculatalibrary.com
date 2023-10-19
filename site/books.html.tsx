import { Column, Spaced } from './components/column/column';
import { TypicalPage } from './components/page';
import { SnippetsGroups } from './components/snippet-groups';
import { allBooks } from './model/books';
import { allSnippets } from './model/snippets';
import script from './script/books.js';

export default <>
  <TypicalPage title='Books' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <h2>All Books</h2>

          <script src={script.path} defer></script>
          <p>Not sure what to read?<br /> Try a <a href='#' class='random-book-button'>Random Book</a>.</p>
          <hr />

          <p>Search:<br /> <input type="text" id='search-books-input' oninput="searchBooks();" /></p>
          <p>
            <label><input type='radio' name='booksearch' value='both' checked /> All</label> { }
            <label><input type='radio' name='booksearch' value='some' /> Has snippets</label> { }
            <label><input type='radio' name='booksearch' value='none' /> No snippets</label> { }
          </p>
          <hr />

          <p>Showing <span id='bookscount'>0</span> books</p>

          <ul id="books-all" style="padding-left: 20px">
            {allBooks.map(book => <>
              <li class={book.snippets.length === 0 ? 'empty' : ''}>
                <p><a class="link" href={book.route}>{book.data.title}</a><br /> {book.data.author}</p>
              </li>
            </>)}
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
