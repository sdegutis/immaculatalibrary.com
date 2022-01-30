import { Container } from "../../../components/container/container";
import { EnrichedInput } from "/src/auth/login";
import { Content } from "/src/components/content/content";
import { HeroImage } from "/src/components/hero-image/hero-image";
import { QuickLinks } from "/src/components/quicklinks";
import { Rating } from "/src/components/rating/rating";
import { Head, Html, SiteFooter, SiteHeader } from "/src/components/site";
import { addRouteable, Routeable, RouteMethod } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { Book } from "/src/model/book";
import { excerpt, md, striptags } from "/src/util/helpers";

export class ViewBookRoute implements Routeable {

  constructor(private book: Book) {
    addRouteable(this);
  }

  get route() {
    return `/books/${this.book.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.book.title} description={striptags(excerpt(this.book.markdownContent))}>
          <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['book.css']!)} />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.book.category.imageBig} />
            <Container spaced split>
              <Content>

                <h1>{this.book.title}</h1>
                <p class="subtitle">{this.book.subtitle}</p>
                <p>By <span class="author">{this.book.author}</span></p>
                <p><Rating n={this.book.rating} /></p>
                {md.render(this.book.markdownContent)}

                <h4>Read now:</h4>
                <table class="downloads">
                  {this.book.files.map(file => <>
                    <tr>
                      {this.book.files.length > 1 && <>
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

                {this.book.storeLinks.length > 0 && <>
                  <h4>Buy physical book:</h4>
                  <div class="indent">
                    <p>You can purchase this book from these publishers:</p>
                    <ul style="display: grid; grid-auto-flow: column;">
                      {this.book.storeLinks.map(link => <>
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

              </Content>

              <div>

                <h3>Book snippets (<a href="/book-snippets.html">See all</a>)</h3>
                <ul class="snippets-latest">
                  {this.book.snippets.length > 0
                    ? <>
                      {[...this.book.snippets].map(bookSnippet => <>
                        <li>
                          <p>
                            <a href={bookSnippet.view.route}>{md.renderInline(bookSnippet.title)}</a>
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
          <SiteFooter input={input} />
        </body>
      </Html>
    }
  }

}
