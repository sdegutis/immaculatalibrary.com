import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { Rating } from "../../components/rating";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { Category } from "../../model/category";
import { allCategories } from "../../model/models";
import { excerpt, markdown } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";

export class ViewCategory implements Routeable {

  constructor(private cat: Category) {
    addRouteable(this);
  }

  get route() {
    return `/books/category/${this.cat.slug}.html`;
  }

  handle(): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        title={this.cat.title}
        image={this.cat.imageBig}
      >
        <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['category.css']!)} />

        <Container spaced centered>
          <div>
            <h1>{this.cat.title}</h1>
            <Content>
              {markdown.render(this.cat.markdownContent)}
            </Content>
          </div>
        </Container>

        <Container spaced split>

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

        </Container>
      </SiteCommon>)
    }
  }

}

export function referenceImage() {
  return allCategories.find(cat => cat.slug === 'reference')!.imageBig;
}
