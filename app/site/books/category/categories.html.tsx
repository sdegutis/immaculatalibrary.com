import * as Common from "../../../components/common";
import { allCategories } from "../../../model/models";
import { markdown } from "../../../util/helpers";

export default allCategories.map(cat => [`${cat.slug}.html`, <>
  <Common.Page>

    <link rel="stylesheet" href='/css/category.css' />

    <Common.SiteHeader image={`/img/categories/${cat.slug}-big.jpg`} />
    <Common.Navlinks />

    <main>

      <Common.Column spaced centered>
        <Common.Typography>

          <h1>{cat.title}</h1>
          {markdown.render(cat.content)}

        </Common.Typography>
      </Common.Column>

      {/* <Container spaced split>

        <section id='category'>
          <h2>Books</h2>
          <ul>
            {this.cat.books.map(book => {
              return <li>
                <div class="title">
                  <a href={book.view.route}>{book.title}</a>
                  {book.subtitle && <>: {book.subtitle}</>}
                  {' '}
                  <Rating n={book.rating} />
                </div>

                <div class="author">{book.author}</div>
                <Content>
                  <div class="blurb">{markdown.render(excerpt(book.markdownContent))}</div>
                </Content>
              </li>;
            })}
          </ul>
        </section>

        <section id='snippets-in-category'>
          <h2>Book Snippets</h2>
          <div class='scrollable-area'>
            <ul>
              {this.cat.books
                .filter(book => book.snippets.length > 0)
                .map(book => <>
                  <li>
                    <h3>{book.title}</h3>
                    <ul>
                      {book.snippets.map(bookSnippet => <>
                        <li>
                          <p>
                            p.{bookSnippet.archivePage} { }
                            <a href={bookSnippet.view.route}>{bookSnippet.renderedTitle}</a>
                          </p>
                        </li>
                      </>)}
                    </ul>
                  </li>
                </>)}
            </ul>
          </div>
        </section>

      </Container> */}

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />

  </Common.Page>
</>]);
