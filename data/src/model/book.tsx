import booksDir from 'dir:/data/books/';
import { Routeable } from '../core/router';
import { AuthedInput } from '../pages/admin';
import { loadContentFile } from '../util/data-files';
import { excerpt, md, rating, ShareLinks, sortBy, striptags } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { Category } from './category';
import { Snippet } from './snippet';
import { FsFile } from "/../src/filesys";
import { RouteOutput } from "/../src/http";

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

  get(input: AuthedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title} description={striptags(excerpt(this.markdownContent))}>
          <link rel="stylesheet" href="/css/layout/book.css" />
          <link rel="stylesheet" href="/css/base/rating-label.css" />
        </Head>
        <body>
          <SiteHeader user={input.user} />
          <main>
            <HeroImage image={this.category.imageFilename} />
            <Container>
              <Content>

                <h1>{this.title}</h1>
                <p class="subtitle">{this.subtitle}</p>
                <p>By <span class="author">{this.author}</span></p>
                <p>{rating(this.rating)}</p>
                {md.render(this.markdownContent)}

                <h4>Read now:</h4>
                <table class="downloads">
                  {this.files.map(file => <>
                    <tr>
                      {this.files.length > 1 && <>
                        <td>
                          {file.pdfFile.replace('.pdf', '')}
                        </td>
                      </>}
                      <td class="link">
                        <a href={`http://books.immaculatalibrary.com/${file.pdfFile}`} target="_blank">Download PDF</a>
                      </td>
                      {file.archiveId && <>
                        <td class="link">
                          <a href={`https://archive.org/details/${file.archiveId}?view=theater`} target="_blank">Read online</a>
                        </td>
                      </>}
                    </tr>
                  </>)}
                </table>

                {this.storeLinks.length > 0 && <>
                  <h4>Buy physical book:</h4>
                  <div class="indent">
                    <p>You can purchase this book from these publishers:</p>
                    <ul style="display: grid; grid-auto-flow: column;">
                      {this.storeLinks.map(link => <>
                        <li style="text-align: center;">
                          <a href={link.link}>
                            {md.render(link.title)} <img src={link.image} height="100" />
                          </a>
                        </li>
                      </>)}
                    </ul>
                  </div>
                </>}

                <p>
                  <details>
                    <summary>
                      <b>How to download to iPhone</b>
                    </summary>
                    <ol>
                      <li>Make sure you have the
                        <a href="https://apps.apple.com/us/app/apple-books/id364709193">Books app</a>
                        installed from the App Store.
                      </li>
                      <li>Click the link to download the book.</li>
                      <li>Wait for it to fully finish loading.</li>
                      <li>Click the Share button at the bottom of the screen.</li>
                      <li>Click "Copy to Books" and check your Libray tab in Apple Books.</li>
                    </ol>
                  </details>
                </p>

                <p>
                  <details>
                    <summary>
                      <b>Why is this book free?</b>
                    </summary>
                    <p class="indent">
                      This book is in the public domain. The copyright it had when printed is no longer in effect.
                    </p>
                  </details>
                </p>

                <ShareLinks />
              </Content>

              <div>

                <h3>Book snippets (<a href="/book-snippets.html">See all</a>)</h3>
                <ul class="snippets-latest">
                  {this.snippets.length > 0
                    ? <>
                      {[...this.snippets].map(bookSnippet => <>
                        <li>
                          <p>
                            <a href={bookSnippet.route}>{md.renderInline(bookSnippet.title)}</a>
                          </p>
                        </li>
                      </>)}
                    </>
                    : <>
                      <li>
                        <em>No snippets have been posted for this book yet.</em>
                      </li>
                    </>}
                </ul>

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
            <SiteHeader user={input.user} />
            <main>
              <HeroImage image={image} />
              <Container>
                <div>

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

                </div>
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
