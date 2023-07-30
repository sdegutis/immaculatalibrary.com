import { Container } from "../../../components/container/container";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable } from "../../../core/router";
import { allSnippets } from "../../../model/models";
import { calculateReadingMins, formatDate, groupByDate, markdown } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";
import { referenceImage } from "../../category/view-category";
import { randomSnippetPage } from "../random";
import searchBookSnippetsScript from './search-book-snippets.js';

export const allSnippetsPage: Routeable = {
  route: `/book-snippets.html`,
  method: 'GET',
  handle: (input) => {

    const title = 'Book Snippets';
    const image = referenceImage();
    const groups = Object.entries(groupByDate(allSnippets));

    return {
      body: renderElement(<>
        <SiteCommon
          title={title}
          image={image}
          input={input}
        >
          <Container spaced split>

            <script src={staticRouteFor(searchBookSnippetsScript)} defer></script>
            <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['book-snippets.css']!)} />

            <div>

              <h1>{title}</h1>

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

            </div>

          </Container>
        </SiteCommon>
      </>)
    };
  },
};

const bookSnippetSearch: Routeable = {
  route: '/book-snippets/searchable.json',
  method: 'GET',
  handle: (input) => {
    return {
      body: Buffer.from(JSON.stringify(allSnippets.map(s => ({
        searchable: s.markdownContent.toLowerCase()
          + s.title.toLowerCase()
          + s.book.title.toLowerCase()
          + s.book.author.toLowerCase(),
        title: s.renderedTitle,
        bookTitle: s.book.title,
        url: s.view.route,
        formattedDate: formatDate(s.date),
        readingMins: calculateReadingMins(s.markdownContent),
      }))))
    }
  }
};

addRouteable(allSnippetsPage);
addRouteable(bookSnippetSearch);
