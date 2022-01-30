import { Container } from "../../components/container/container";
import { EnrichedInput } from "/src/auth/login";
import { Content } from "/src/components/content/content";
import { HeroImage } from "/src/components/hero-image/hero-image";
import { QuickLinks } from "/src/components/quicklinks";
import { Rating } from "/src/components/rating/rating";
import { Head, Html, SiteFooter, SiteHeader } from "/src/components/site";
import { addRouteable, Routeable, RouteMethod } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { allCategories, Category } from "/src/model/category";
import { excerpt, md } from "/src/util/helpers";

export class ViewCategory implements Routeable {

  constructor(private cat: Category) {
    addRouteable(this);
  }

  get route() {
    return `/${this.cat.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
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
      </Html>
    }
  }

}

export function referenceImage() {
  return allCategories.find(cat => cat.slug === 'reference')!.imageBig;
}
