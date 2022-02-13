import { Container } from "../../../components/container/container";
import { HeroImage } from "../../../components/hero-image/hero-image";
import { QuickLinks } from "../../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../../components/site";
import { addRouteable, Routeable } from "../../../core/router";
import { allSnippets } from "../../../model/models";
import { format_date, groupByDate, md, reading_mins } from "../../../util/helpers";
import { renderElement } from "../../../core/jsx";
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
        <Html>
          <Head title={title}>
            <script src={staticRouteFor(searchBookSnippetsScript)} defer></script>
            <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['book-snippets.css']!)} />
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container spaced split>

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
                                <a href={snippet.view.route}>{md.renderInline(snippet.title)}</a>
                                <br /> {reading_mins(snippet.markdownContent)} min &mdash; {snippet.book.title}
                              </p>
                            </li>
                          </>)}
                        </ul>
                      </li>
                    </>)}
                  </ul>

                </div>

              </Container>
            </main>
            <QuickLinks />
            <SiteFooter input={input} />
          </body>
        </Html>
      </>)
    };
  },
};

const bookSnippetSearch: Routeable = {
  route: '/book-snippets/search',
  method: 'GET',
  handle: (input) => {
    const searchTerm = input.url.searchParams.get('searchTerm')!.toLowerCase();

    const snippets = allSnippets.filter(s => {
      if (s.markdownContent.toLowerCase().includes(searchTerm)) return true;
      if (s.title.toLowerCase().includes(searchTerm)) return true;
      if (s.book.title.toLowerCase().includes(searchTerm)) return true;
      if (s.book.author.toLowerCase().includes(searchTerm)) return true;
      return false;
    });

    return {
      body: Buffer.from(JSON.stringify(snippets.map(snippet => ({
        title: md.renderInline(snippet.title),
        bookTitle: snippet.book.title,
        url: snippet.view.route,
        formattedDate: format_date(snippet.date),
        readingMins: reading_mins(snippet.markdownContent),
      }))))
    };
  }
};

addRouteable(allSnippetsPage);
addRouteable(bookSnippetSearch);
