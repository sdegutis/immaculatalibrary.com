import * as Common from "../components/common";

export default <>
  <Common.TypicalPage image='/img/categories/reference-big.jpg'>

    <script src='/script/search-book-snippets.js' defer></script>
    <link rel="stylesheet" href='/css/book-snippets.css' />

    <Common.Column spaced split>

      {/* <div>

        <h1>Book Snippets</h1>

        <p>
          Not sure what to read?<br />
          Try a <a href={randomSnippetPage.route} target="_blank">Random Book Snippet</a>.</p>
        <hr />

        <p>
          Search:<br />
          <input type="text" id="search-book-snippets-field" />
        </p>

        <div id="search-results"></div>
        <hr />

        <ul id="snippets-all">
          {groups.map(([date, group]) => <>
            <li>
              <h4>{date}</h4>
              <ul>
                {group.map(snippet => <>
                  <li class="snippet">
                    <p>
                      <a href={snippet.view.route}>{snippet.renderedTitle}</a>
                      <br /> {calculateReadingMins(snippet.markdownContent)} min &mdash; {snippet.book.title}
                    </p>
                  </li>
                </>)}
              </ul>
            </li>
          </>)}
        </ul>

      </div> */}

    </Common.Column>

  </Common.TypicalPage>
</>;
