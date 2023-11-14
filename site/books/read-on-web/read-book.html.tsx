import { Spaced, SplitColumn } from "../../components/column.js";
import { TypicalPage } from "../../components/page.js";
import { Rating } from "../../components/rating.js";
import { Typography } from "../../components/typography.js";
import { markdown } from "../../core/helpers.js";
import { allBooks } from "../../model/books.js";

export default allBooks.filter(book => book.data.complete).map(book => {
  const orderedSnippets = [...book.snippets];

  return [`${book.slug}.html`, <>
    <TypicalPage title="Books" image={book.imageBig}>

      <Spaced>
        <SplitColumn>

          <link rel="stylesheet" href='/css/page/read-book.css' />

          <div>

            <Typography>
              <h2>{book.data.title}</h2>
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

        </SplitColumn>
      </Spaced>

    </TypicalPage>
  </>];
});
