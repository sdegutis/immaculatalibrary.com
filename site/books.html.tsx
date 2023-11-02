import { Column, Spaced } from './components/column.js';
import { LoadingItem } from './components/loading.js';
import { TypicalPage } from './components/page.js';

export default <>
  <TypicalPage title='Books' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <script src='/scripts/books.js' type='module'></script>
          <link rel="stylesheet" href='/css/page/books.css' />

          <h2>Find Books</h2>
          <p><input autofocus placeholder='Search' type="text" id='search-books-input' /></p>
          <div id='books-filters' />
          <hr />
          <p>Not sure what to read?<br /> Try a <a href='#' id='random-book-button'>Random Book</a>.</p>

        </div>

        <div>

          <h2>Showing <span id='search-count' /> books</h2>
          <div id='search-results'>
            <ul>
              <li><LoadingItem lines={3} /></li>
              <li><LoadingItem lines={3} /></li>
              <li><LoadingItem lines={3} /></li>
              <li><LoadingItem lines={3} /></li>
              <li><LoadingItem lines={3} /></li>
              <li><LoadingItem lines={3} /></li>
              <li><LoadingItem lines={3} /></li>
            </ul>
          </div>

        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
