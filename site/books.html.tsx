import { Column, Spaced } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { LoadingLine, LoadingParagraph } from './shared/loading.js';

export default <>
  <TypicalPage title='Books' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <script src='/scripts/books.js' type='module'></script>
          <link rel="stylesheet" href='/css/page/books.css' />

          <h2>Find Books</h2>
          <div id='filters-container'>
            <LoadingLine size="100%" />
            <div id='books-filters'>
              <LoadingLine size="2em" />
              <LoadingLine size="7em" />
            </div>
          </div>
          <hr />
          <p>Not sure what to read?<br /> Try a <a href='#' id='random-book-button'>Random Book</a>.</p>

        </div>

        <div>

          <h2>Showing <span id='search-count' /> books</h2>
          <div id='search-results'>
            <ul>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
            </ul>
          </div>

        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
