import { Column } from "./components/column/column";
import { TypicalPage } from "./components/page";
import { SnippetsGroups } from "./components/snippet-groups";

export default <>
  <TypicalPage image='/img/categories/reference-big.jpg'>

    <script type='module' src='/script/search-book-snippets.js' />

    <Column spaced split>

      <div>

        <h1>Book Snippets</h1>

        <p>
          Search:<br />
          <input type="text" id="search-book-snippets-field" />
        </p>

        <SnippetsGroups />

      </div>

    </Column>

  </TypicalPage>
</>;
