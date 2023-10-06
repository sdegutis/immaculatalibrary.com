import * as Common from "../components/common";
import { allBooks } from "../model/models";

export default <>
  <Common.TypicalPage image='/img/categories/reference-big.jpg'>

    <Common.Column spaced split>

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

    </Common.Column>

  </Common.TypicalPage>
</>;
