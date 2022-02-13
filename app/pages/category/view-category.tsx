import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Rating } from "../../components/rating/rating";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { Category } from "../../model/categories/category";
import { allCategories } from "../../model/models";
import { excerpt, md } from "../../util/helpers";
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
      body: renderElement(<Html>
        <Head title={this.cat.title}>
          <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['category.css']!)} />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.cat.imageBig} />
            <Container spaced split>

              <div>

                <h1>{this.cat.title}</h1>

                <Content>
                  {md.render(this.cat.markdownContent)}
                </Content>

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
                          <div class="blurb">{md.render(excerpt(book.markdownContent))}</div>
                        </Content>
                      </li>;
                    })}
                  </ul>
                </section>

              </div>

            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>)
    }
  }

}

export function referenceImage() {
  return allCategories.find(cat => cat.slug === 'reference')!.imageBig;
}
