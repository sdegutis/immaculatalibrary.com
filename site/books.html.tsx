import { LoadingLine, LoadingParagraph } from './components/$loading.js';
import { Spaced, SplitColumn } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { PaginatorLoading } from './components/paginator.js';

export const Tabs: JSX.Component<{ index: number }> = (attrs) => <>
  <h1>Books & Book Snippets</h1>
  <div class='tab-links'>
    {[
      { href: '/books.html', title: 'Books' },
      { href: '/snippets.html', title: 'Snippets' },
    ].map((link, i) =>
      <a href={link.href} class={i === attrs.index ? 'active' : ''}>Search {link.title}</a>
    )}
  </div>
</>;

export default <>
  <TypicalPage title={<Tabs index={0} /> as string} image='/img/categories/reference-big.jpg' page='Books'>

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

  </TypicalPage>
</>;
