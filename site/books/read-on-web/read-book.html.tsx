import { Navlinks } from "../../components/navlinks.js";
import { EmptyPage } from "../../components/page.js";
import { Rating } from "../../components/rating.js";
import { SiteFooter } from "../../components/site-footer.js";
import { Typography } from "../../components/typography.js";
import { markdown } from "../../core/helpers.js";
import { allBooks } from "../../model/books.js";

export default allBooks.filter(book => book.data.complete).map(book => {
  const orderedSnippets = [...book.snippets];
  const file = book.data.files[0]!;

  return [`${book.slug}.html`, <>
    <EmptyPage>

      <link rel="stylesheet" href='/css/page/read-book.css' />

      <main>

        <Navlinks page="Books" />

        <section>

          <div>

            <Typography>
              <h2><a href={book.route}>{book.data.title}</a></h2>
              <p class="subtitle">{book.data.subtitle}</p>
              <p>By <span class="author">{book.data.author}</span></p>
              <p><Rating n={book.data.rating} /></p>
              {markdown.render(book.content)}
            </Typography>

            <hr />

            <h3>Chapter Index</h3>
            <div class="readonline-chapters">
              {orderedSnippets.map((bookSnippet, i) => <>
                <span>Ch.{i + 1}</span>
                <a href={`#snippet-${bookSnippet.slug}`}>
                  {bookSnippet.renderedTitle}
                </a>
              </>)}
            </div>

          </div>

          <div>
            <Typography>
              {orderedSnippets.map((bookSnippet, i) => <>
                <div class='chapter' id={`snippet-${bookSnippet.slug}`}>
                  <h3 class='chapter-header'>
                    Chapter {i + 1} &mdash; { }
                    <a href={bookSnippet.route}>
                      {bookSnippet.renderedTitle}
                    </a>
                  </h3>
                  {bookSnippet.renderedBody}
                  <hr />
                </div>
              </>)}
            </Typography>
          </div>

          <iframe src={`https://archive.org/details/${file.archiveId}?view=theater`} />

        </section>

        <SiteFooter thin />

      </main>

    </EmptyPage>
  </>];
});
