import { LoadingLine, LoadingParagraph } from './components/$loading.js';
import { Column, Spaced, SplitColumn } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { PaginatorLoading } from './components/paginator.js';

export default <>
  <TypicalPage title='Books' image='/img/categories/reference-big.jpg' page='Books'>

    <script src='/scripts/$tabs.js' type='module'></script>
    <link rel="stylesheet" href='/css/components/tabs.css' />

    <div id='tabs-container'>
      <Spaced>
        <Column>
          <div id='tabs-buttons'>
            <button>Search Books</button>
            <button>Search Snippets</button>
          </div>
        </Column>
      </Spaced>
      <div id='tabs-bodies'>

        <div id='books-area'>

          <Spaced>
            <SplitColumn>

              <div>

                <script src='/scripts/$books-page.js' type='module'></script>
                <link rel="stylesheet" href='/css/page/books.css' />

                <h2>Find Books</h2>
                <div class='filters-container'>
                  <LoadingLine width="100%" height='2.4em' />
                  <div class='books-filters'>
                    <LoadingLine width="4em" />
                    <LoadingLine width="9em" />
                    <LoadingLine width="2em" />
                    <LoadingLine width="14em" />
                    <LoadingLine width="4em" />
                    <LoadingLine width="100%" height='2em' />
                    <LoadingLine width="4em" />
                    <LoadingLine width="100%" height='2em' />
                  </div>
                  <hr />
                  <br /><LoadingLine width="12em" />
                  <br /><LoadingLine width="12em" />
                </div>

              </div>

              <div>

                <h2>Showing <span class='search-count' /> books</h2>
                <div class='search-results'>
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

        </div>
        <div id='snippets-area'>

          <Spaced>
            <SplitColumn>

              <div>

                <script type='module' src='/scripts/$snippets-page.js' />
                <link rel="stylesheet" href='/css/page/snippets.css' />

                <h2>Find Book Snippets</h2>
                <div class='filters-container'>
                  <LoadingLine width="100%" height="2em" />
                  <div class='snippets-filters' style='align-items:center'>
                    <LoadingLine width="2em" />
                    <LoadingLine width="100%" height="2em" />
                    <LoadingLine width="4em" />
                    <LoadingLine width="12em" height="2em" />
                  </div>
                  <hr />
                  <br /><LoadingLine width="12em" />
                  <br /><LoadingLine width="12em" />
                </div>

              </div>

              <div>

                <h2>Showing <span class='search-count' /> book snippets</h2>
                <div class='search-results'>
                  <PaginatorLoading />
                  <ul>
                    <li><LoadingParagraph lines={3} /></li>
                    <li><LoadingParagraph lines={3} /></li>
                    <li><LoadingParagraph lines={3} /></li>
                    <li><LoadingParagraph lines={3} /></li>
                    <li><LoadingParagraph lines={3} /></li>
                    <li><LoadingParagraph lines={3} /></li>
                    <li><LoadingParagraph lines={3} /></li>
                  </ul>
                </div>

              </div>

            </SplitColumn>
          </Spaced>

        </div>

      </div>
    </div>

  </TypicalPage>
</>;
