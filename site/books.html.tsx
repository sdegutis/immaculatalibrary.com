import { Spaced, SplitColumn } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { PaginatorLoading } from './components/paginator.js';
import { LoadingLine, LoadingParagraph } from './shared/loading.js';

export default <>
  <TypicalPage title='Books' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <SplitColumn>

        <div>

          <script src='/scripts/books.js' type='module'></script>
          <link rel="stylesheet" href='/css/page/books.css' />

          <h2>Find Books</h2>
          <div id='filters-container'>
            <LoadingLine width="100%" height='2.4em' />
            <div id='books-filters'>
              <LoadingLine width="4em" />
              <LoadingLine width="9em" />
              <LoadingLine width="4em" />
              <LoadingLine width="14em" />
            </div>
            <hr />
            <br /><LoadingLine width="12em" />
            <br /><LoadingLine width="12em" />
          </div>

        </div>

        <div>

          <h2>Showing <span id='search-count' /> books</h2>
          <div id='search-results'>
            <PaginatorLoading />
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

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
