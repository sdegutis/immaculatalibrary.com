import { Column, Spaced } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { LoadingLine, LoadingParagraph } from "./shared/loading.js";

export default <>
  <TypicalPage title="Book Snippets" image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <script type='module' src='/scripts/snippets-page.js' />
          <link rel="stylesheet" href='/css/page/snippets.css' />

          <h2>Find Book Snippets</h2>
          <div id='filters-container'>
            <LoadingLine width="100%" height="2em" />
            <div id='snippets-filters'>
              <LoadingLine width="2em" />
              <LoadingLine width="7em" />
            </div>
            <hr />
            <br /><LoadingLine width="12em" />
            <br /><LoadingLine width="12em" />
          </div>

        </div>

        <div>

          <h2>Showing <span id='search-count' /> book snippets</h2>
          <div id='search-results'>
            <p style='display:flex; gap:1em'>
              <LoadingLine width='4em' height='1.6em' />
              <LoadingLine width='4em' height='1.6em' />
              <LoadingLine width='4em' height='1.6em' />
            </p>
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

      </Column>
    </Spaced>

  </TypicalPage>
</>;
