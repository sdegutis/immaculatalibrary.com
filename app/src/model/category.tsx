import categoriesDir from 'dir:/data/categories/';
import { Routeable } from '../core/router';
import { EnrichedInput } from '../pages/admin';
import { loadContentFile } from '../util/data-files';
import { excerpt, md, rating, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { Book } from './book';
import { FsFile } from "/src/filesys";
import { RouteOutput } from "/src/http";

export class Category implements Routeable {

  static from(file: FsFile) {
    const data = loadContentFile<{
      title: string,
      shortTitle: string,
      imageFilename: string,
      books: string[],
    }>(file, 'slug');

    return new Category(
      data.slug,
      data.markdownContent,
      data.meta.title,
      data.meta.shortTitle,
      data.meta.imageFilename,
      new Set(data.meta.books),
    );
  }

  books: Book[] = [];

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public shortTitle: string,
    public imageFilename: string,
    public bookSlugs: Set<string>,
  ) { }

  get route() {
    return `/${this.slug}.html`;
  }

  get(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title}>
          <link rel="stylesheet" href="/css/layout/category.css" />
          <link rel="stylesheet" href="/css/base/rating-label.css" />
        </Head>
        <body>
          <SiteHeader input={input} />
          <main>
            <HeroImage image={this.imageFilename} />
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
          <SiteFooter />
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
  .files.map(file => Category.from(file))
  .sort(sortBy(c => categoryOrder.indexOf(c.slug))));

export const allCategoryRoutes: Routeable[] = allCategories;
