import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { Rating } from "../../components/rating/rating";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { Category } from "../../model/categories/category";
import { allCategories } from "../../model/models";
import { excerpt, markdown } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";

export class ViewCategory implements Routeable {

  constructor(private cat: Category) {
    addRouteable(this);
  }

  get route() {
    return `/${this.cat.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: RouteInput): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        title={this.cat.title}
        image={this.cat.imageBig}
        input={input}
      >
        <Container spaced split>

          <div>

            <h1>{this.cat.title}</h1>

            <Content>
              {markdown.render(this.cat.markdownContent)}
            </Content>

            <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['category.css']!)} />

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

          </div>

        </Container>
      </SiteCommon>)
    }
  }

}

export function referenceImage() {
  return allCategories.find(cat => cat.slug === 'reference')!.imageBig;
}
