import { Column, Spaced } from "../../components/column/column.js";
import { TypicalPage } from "../../components/page.js";
import { Rating } from "../../components/rating/rating.js";
import { Typography } from "../../components/typography.js";
import { excerpt, markdown } from "../../core/helpers.js";
import { allCategories } from "../../model/categories.js";

export default allCategories.map(cat => [`${cat.slug}.html`, <>
  <TypicalPage title="Book Categories" image={`/img/categories/${cat.slug}-big.jpg`}>

    <link rel="stylesheet" href='/css/page/category.css' />

    <Spaced>
      <Column centered>
        <Typography>

          <h2>{cat.data.title}</h2>
          {markdown.render(cat.content)}

        </Typography>
      </Column>
    </Spaced>

    <Spaced>
      <Column split>

        <section id='category'>
          <h2>Books</h2>
          <ul>
            {cat.booksInCategory.map(book => {
              return <li>
                <div class="title">
                  <a href={book.route}>{book.data.title}</a>
                  {book.data.subtitle && <>: {book.data.subtitle}</>}
                  {' '}
                  <Rating n={book.data.rating} />
                </div>

                <div class="author">{book.data.author}</div>
                <Typography>
                  <div class="blurb">{markdown.render(excerpt(book.content))}</div>
                </Typography>
              </li>;
            })}
          </ul>
        </section>

        <section id='snippets-in-category'>
          <h2>Book Snippets</h2>
          <div class='scrollable-area'>
            <ul>
              {cat.booksInCategory
                .filter(book => book.snippets.length > 0)
                .map(book => <>
                  <li>
                    <h3>{book.data.title}</h3>
                    <ul>
                      {book.snippets.map(bookSnippet => <>
                        <li>
                          <p>
                            p.{bookSnippet.data.archivePage} { }
                            <a href={bookSnippet.route}>{bookSnippet.renderedTitle}</a>
                          </p>
                        </li>
                      </>)}
                    </ul>
                  </li>
                </>)}
            </ul>
          </div>
        </section>

      </Column>
    </Spaced>

  </TypicalPage >
</>]);
