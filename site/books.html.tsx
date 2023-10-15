import { Column, Spaced } from './components/column/column';
import { TypicalPage } from './components/page';
import { SnippetsGroups } from './components/snippet-groups';
import { allBooks } from './model/books';
import { allSnippets } from './model/snippets';

export default <>
  <TypicalPage image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <h1>All Books</h1>

          <script src='/script/random-book.js' defer />
          <p>Not sure what to read?<br /> Try a <a href='#' class='random-book-button' target="_blank">Random Book</a>.</p>
          <hr />

          <p>Search:<br /> <input type="text" oninput="searchBooks(this);" /></p>
          <hr />

          <ul id="books-all" style="padding-left: 20px">
            {allBooks.map(book => <>
              <li>
                <p><a class="link" href={book.route}>{book.data.title}</a><br /> {book.data.author}</p>
              </li>
            </>)}
          </ul>

          <span hidden id="no-books-found" style="font-style: italic">
            No results
          </span>

          <script src='/script/search-books.js' defer></script>

        </div>

        <div>
          <h3>Latest book snippets</h3>
          <SnippetsGroups snippets={allSnippets.slice(0, 10)} />
        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
