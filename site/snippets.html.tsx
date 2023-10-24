import { Column, Spaced } from "./components/column.jsx";
import { TypicalPage } from "./components/page.js";
import { SnippetsGroups } from "./components/snippet-groups.js";
import { allSnippets } from "./model/snippets.js";

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

          <SnippetsGroups snippets={allSnippets} />

        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
