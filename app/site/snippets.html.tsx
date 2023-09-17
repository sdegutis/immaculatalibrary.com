import * as Common from "../components/common";
import { SnippetsGroups } from "../components/snippet-groups";

export default <>
  <Common.TypicalPage image='/img/categories/reference-big.jpg'>

    <script type='module' src='/script/search-book-snippets.js' />

    <Common.Column spaced split>

      <div>

        <h1>Book Snippets</h1>

        <p>
          Not sure what to read?<br />
          Try a <a href='#' target="_blank">Random Book Snippet</a>.</p>
        <hr />

        <p>
          Search:<br />
          <input type="text" id="search-book-snippets-field" />
        </p>

        <SnippetsGroups />

      </div>

    </Common.Column>

  </Common.TypicalPage>
</>;
