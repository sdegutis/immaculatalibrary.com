import { addRouteable, Routeable, RouteMethod } from '../core/router';
import { staticRouteFor } from '../core/static';
import { EnrichedInput } from '../pages/admin';
import { loadContentFile } from '../util/data-files';
import { excerpt, md, rating, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/components/page';
import { QuickLinks } from '../view/components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/components/site';
import { Book } from './book';
import categoriesDir from '/data/categories/';

export class Category implements Routeable {

  static from(dir: FsDir) {
    const file = dir.filesByName['content.md']!;

    const data = loadContentFile<{
      title: string,
      shortTitle: string,
      books: string[],
    }>(file, 'slug');

    const imageBig = staticRouteFor(dir.filesByName['image-big.jpg']!);
    const imageSmall = staticRouteFor(dir.filesByName['image-small.jpg']!);

    return new Category(
      dir.name,
      data.markdownContent,
      data.meta.title,
      data.meta.shortTitle,
      imageBig,
      imageSmall,
      new Set(data.meta.books),
    );
  }

  books: Book[] = [];

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public shortTitle: string,
    public imageBig: string,
    public imageSmall: string,
    public bookSlugs: Set<string>,
  ) { }

  get route() {
    return `/${this.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title}>
          <link rel="stylesheet" href="/css/layout/category.css" />
          <link rel="stylesheet" href="/css/base/rating-label.css" />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.imageBig} />
            <Container>

              <div>

                <h1>{this.title}</h1>

                <Content>
                  {md.render(this.markdownContent)}
                </Content>

                <section id='category'>
                  <h2>Books</h2>
                  <ul>
                    {this.books.map(book => {
                      return <li>
                        <div class="title">
                          <a href={book.route}>{book.title}</a>
                          {book.subtitle && <>: {book.subtitle}</>}
                          {' '}
                          {rating(book.rating)}
                        </div>

                        <div class="author">{book.author}</div>
                        <div class="blurb content">{md.render(excerpt(book.markdownContent))}</div>
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

const categoryOrder = [
  'classics',
  'devotion',
  'instruction',
  'reference',
  'saints',
  'mary',
  'joseph',
  'apologetics',
  'blessed-sacrament',
  'sacred-heart',
  'holy-spirit',
  'lourdes',
  'st-francis-de-sales',
  'st-alphonsus-de-liguori',
  'st-catherine-of-siena',
  'st-teresa-of-avila',
  'st-john-of-the-cross',
  'st-john-henry-newman',
  'st-thomas-more',
  'st-thomas-aquinas',
  'st-louis-de-montfort',
  'jesuits',
  'fr-lasance',
];

export const allCategories = (categoriesDir
  .dirs.map(dir => Category.from(dir))
  .sort(sortBy(c => categoryOrder.indexOf(c.slug))));

allCategories.forEach(addRouteable);

export function referenceImage() {
  return allCategories.find(cat => cat.slug === 'reference')!.imageBig;
}
