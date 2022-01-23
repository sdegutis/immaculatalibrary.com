import booksDir from 'dir:/data/books/';
import { Routeable } from '../core/router';
import { loadContentFile } from '../util/data-files';
import { md, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { Category } from './category';
import { Snippet } from './snippet';
import { FsFile } from "/../src/filesys";
import { RouteInput, RouteOutput } from "/../src/http";

export class Book implements Routeable {

  static from(file: FsFile) {
    const data = loadContentFile<{
      title: string,
      subtitle: string,
      dateAdded: string,
      author: string,
      translator: string,
      score: number,
      rating: number,
      files: {
        archiveId: string,
        pdfFile: string,
      }[],
      storeLinks: {
        link: string;
        image: string;
        title: string;
      }[],
    }>(file, 'slug');

    return new Book(
      data.slug,
      data.markdownContent,
      data.meta.title,
      data.meta.subtitle,
      data.meta.dateAdded,
      data.meta.author,
      data.meta.translator,
      data.meta.score,
      data.meta.rating,
      data.meta.files,
      data.meta.storeLinks,
    );
  }

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public subtitle: string,
    public dateAdded: string,
    public author: string,
    public translator: string,
    public score: number,
    public rating: number,
    public files: {
      archiveId: string,
      pdfFile: string,
    }[],
    public storeLinks: {
      link: string;
      image: string;
      title: string;
    }[],
  ) { }

  category!: Category;
  snippets: Snippet[] = [];

  get route() {
    return `/books/${this.slug}.html`;
  }

  get(input: RouteInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.category.imageFilename} />
            <Container>
              <Content>
                <h1>{this.title}</h1>
                {md.render(this.markdownContent)}
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter />
        </body>
      </Html>
    }
  }

}

export const allBooks = (booksDir
  .files.map(file => Book.from(file))
  .sort(sortBy(b => `${b.dateAdded} ${b.slug}`)));

const allBooksScript = `
const booksList = document.getElementById('books-all');
const notFound = document.getElementById('no-books-found');

function searchSnippets(el) {
  const searchString = el
    .value
    .trim()
    .toLowerCase();

  for (const book of booksList.querySelectorAll('li')) {
    book.hidden = !book
      .innerText
      .toLowerCase()
      .includes(searchString);
  }

  notFound.hidden = (booksList.querySelectorAll('li:not([hidden])').length > 0);
}
`;

export const allBooksPage: Routeable = {
  route: `/books.html`,
  get: (input) => {
    const title = 'All Books';
    const image = '/img/reference-big.jpg';
    return {
      body: <>
        <Html>
          <Head title={title}>
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container>
                <Content>

                  <h1>{title}</h1>

                  <p>Not sure what to read?<br /> Try a <a href="/random.html" target="_blank">Random Book</a>.</p>
                  <hr />

                  <p>Search:<br /> <input type="text" oninput="searchSnippets(this);" /></p>
                  <hr />

                  <ul id="books-all" style="padding-left: 20px">
                    {allBooks.map(book => <>
                      <li>
                        <p><a class="link" href={book.route}>{book.title}</a><br /> {book.author}</p>
                      </li>
                    </>)}
                  </ul>

                  <span hidden id="no-books-found" style="font-style: italic">
                    No results
                  </span>

                  <script>{allBooksScript}</script>

                </Content>
              </Container>
            </main>
            <QuickLinks />
            <SiteFooter />
          </body>
        </Html>
      </>
    };
  },
};
