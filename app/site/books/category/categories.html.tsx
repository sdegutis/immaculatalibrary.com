import * as Common from "../../../components/common";
import { Rating } from "../../../components/rating";
import { excerpt, markdown } from "../../../core/helpers";
import { allCategories } from "../../../model/models";

export default allCategories.map(cat => [`${cat.slug}.html`, <>
  <Common.TypicalPage image={`/img/categories/${cat.slug}-big.jpg`}>

    <link rel="stylesheet" href='/css/category.css' />

    <Common.Column spaced centered>
      <Common.Typography>

        <h1>{cat.title}</h1>
        {markdown.render(cat.content)}

      </Common.Typography>
    </Common.Column>

    <Common.Column spaced split>

      <section id='category'>
        <h2>Books</h2>
        <ul>
          {cat.booksInCategory.map(book => {
            return <li>
              <div class="title">
                <a href={book.route}>{book.title}</a>
                {book.subtitle && <>: {book.subtitle}</>}
                {' '}
                <Rating n={book.rating} />
              </div>

              <div class="author">{book.author}</div>
              <Common.Typography>
                <div class="blurb">{markdown.render(excerpt(book.content))}</div>
              </Common.Typography>
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
                  <h3>{book.title}</h3>
                  <ul>
                    {book.snippets.map(bookSnippet => <>
                      <li>
                        <p>
                          p.{bookSnippet.archivePage} { }
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

    </Common.Column>

  </Common.TypicalPage >
</>]);