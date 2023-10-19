import { Column, Spaced } from "./components/column/column";
import { TypicalPage } from "./components/page";
import { SnippetsGroups } from "./components/snippet-groups";
import { allSnippets } from "./model/snippets";

export default <>
  <TypicalPage title="Book Snippets" image='/img/categories/reference-big.jpg'>

    <script type='module' src='/script/search-book-snippets.js' />

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
