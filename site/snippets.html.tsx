import { Column, Spaced } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { RandomBookSnippet } from "./components/random-snippet.js";
import { SnippetsGroups } from "./components/snippet-groups.js";
import { WordSep } from "./components/word-sep.js";
import { calculateReadingMins } from "./core/helpers.js";
import { allSnippets } from "./model/snippets.js";

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export default <>
  <TypicalPage title="Book Snippets" image='/img/categories/reference-big.jpg'>

    <script type='module' src='/scripts/search-book-snippets.js' />

    <Spaced>
      <Column split>

        <div>

          <h2>Book Snippets</h2>

          <p>
            Search:<br />
            <input type="text" id="search-book-snippets-field" />
          </p>

          <p>
            <RandomBookSnippet>
              <a href='#'>Random</a>
            </RandomBookSnippet>
            <WordSep />
            {allSnippets.length} total
            <WordSep />
            {totalReadingTime}
          </p>

          <SnippetsGroups snippets={allSnippets} />

        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
