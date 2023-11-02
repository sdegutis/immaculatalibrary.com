import { Column, Spaced } from "./components/column.js";
import { LoadingItem } from "./components/loading.js";
import { TypicalPage } from "./components/page.js";
import { RandomBookSnippet } from "./components/random-snippet.js";
import { allSnippets } from "./model/snippets.js";
import { calculateReadingMins } from './shared/helpers.js';

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export default <>
  <TypicalPage title="Book Snippets" image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>

          <script type='module' src='/scripts/snippets-page.js' />
          <link rel="stylesheet" href='/css/page/snippets.css' />

          <h2>Find Book Snippets</h2>
          <p><input placeholder='Search' autofocus type="text" id="search-book-snippets-field" /></p>
          <div id='snippets-filters' />
          <hr />
          <p>Not sure what to read?<br /> Try a <RandomBookSnippet><a href='#'>Random Book Snippet</a></RandomBookSnippet>.</p>

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
