import { Column, Spaced } from "./components/column.js";
import { LoadingBox, LoadingItem } from "./components/loading.js";
import { TypicalPage } from "./components/page.js";
import { RandomBookSnippet } from "./components/random-snippet.js";

export default <>
  <TypicalPage title="Book Snippets" image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <script type='module' src='/scripts/snippets-page.js' />
          <link rel="stylesheet" href='/css/page/snippets.css' />

          <h2>Find Book Snippets</h2>
          <p><input placeholder='Search' autofocus type="text" id="search-book-snippets-field" /></p>
          <div id='snippets-filters'>
            <LoadingBox size="2em" />
            <LoadingBox size="7em" />
          </div>
          <hr />
          <p>Not sure what to read?<br /> Try a <RandomBookSnippet>Random Book Snippet</RandomBookSnippet>.</p>

        </div>

        <div>

          <h2>Showing <span id='search-count' /> book snippets</h2>
          <div id='search-results'>
            <ul>
              <li><LoadingItem lines={4} /></li>
              <li><LoadingItem lines={4} /></li>
              <li><LoadingItem lines={4} /></li>
              <li><LoadingItem lines={4} /></li>
              <li><LoadingItem lines={4} /></li>
              <li><LoadingItem lines={4} /></li>
              <li><LoadingItem lines={4} /></li>
            </ul>
          </div>

        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
