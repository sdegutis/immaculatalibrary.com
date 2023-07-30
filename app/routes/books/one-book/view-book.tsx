import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { Rating } from "../../../components/rating/rating";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable } from "../../../core/router";
import { Book } from "../../../model/books/book";
import { excerpt, markdown, striptags } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";

export class ViewBookRoute implements Routeable {

  readBookPage;

  randomSnippetInBookPage: Routeable;

  constructor(private book: Book) {
    addRouteable(this);
    this.readBookPage = new ReadBookRoute(this.book);

    this.randomSnippetInBookPage = {
      route: `/books/${this.book.slug}/random-snippet.html`,
      handle: () => ({
        body: renderElement(<>
          <script>{`const pages = ${JSON.stringify(this.book.snippets.map(snippet => snippet.view.route))}`}</script>
          <script>{`const i = Math.floor(Math.random() * pages.length); window.location = pages[i];`}</script>
        </>),
      }),
    };
    addRouteable(this.randomSnippetInBookPage);
  }

  get route() {
    return `/books/${this.book.slug}.html`;
  }

  handle(): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        title={this.book.title}
        description={striptags(excerpt(this.book.markdownContent))}
        image={this.book.category.imageBig}
      >
        <Container spaced split>
          <Content>

            <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['book.css']!)} />

            <h1>{this.book.title}</h1>
            <p class="subtitle">{this.book.subtitle}</p>
            <p>By <span class="author">{this.book.author}</span></p>
            <p><Rating n={this.book.rating} /></p>
            {markdown.render(this.book.markdownContent)}

            <h4>Read now:</h4>
            {this.book.complete && <>
              <table class="downloads" id='read-online-table'>
                <tr>
                  <td>
                    <a href={this.readBookPage.route}>
                      Read on Web
                    </a>
                  </td>
                </tr>
              </table>
            </>}
            <table class="downloads" id='read-online-table'>
              {this.book.archiveFiles.map(file => <>
                <tr>
                  {this.book.archiveFiles.length > 1 && <>
                    <td>
                      {file.pdfFile.replace('.pdf', '')}
                    </td>
                  </>}
                  <td class="link">
                    <a href={`http://books.immaculatalibrary.com/${file.pdfFile}`} target="_blank">Download PDF</a>
                  </td>
                  {file.archiveId && <>
                    <td class="link">
                      <a href={`https://archive.org/details/${file.archiveId}?view=theater`} target="_blank">Read Scans</a>
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
                        {markdown.render(link.title)} <img src={link.image} height="100" />
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
                  <li>Make sure you have the { }
                    <a href="https://apps.apple.com/us/app/apple-books/id364709193">Books app</a> { }
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

            <h3>Book snippets (<a href={this.randomSnippetInBookPage.route}>Random</a>)</h3>
            <ul class="snippets-latest">
              {this.book.snippets.length > 0
                ? <>
                  {[...this.book.snippets].map(bookSnippet => <>
                    <li>
                      <p>
                        p.{bookSnippet.archivePage} { }
                        <a href={bookSnippet.view.route}>{bookSnippet.renderedTitle}</a>
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
      </SiteCommon>)
    }
  }

}

export class ReadBookRoute implements Routeable {

  constructor(private book: Book) {
    addRouteable(this);
  }

  get route() {
    return `/books/read-on-web/${this.book.slug}.html`;
  }

  handle(): RouteOutput {
    const orderedSnippets = [...this.book.snippets];

    return {
      body: renderElement(<SiteCommon
        title={this.book.title}
        description={striptags(excerpt(this.book.markdownContent))}
        image={this.book.category.imageBig}
      >
        <Container spaced split>
          <Content>

            <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['book.css']!)} />

            <h1>{this.book.title}</h1>
            <p class="subtitle">{this.book.subtitle}</p>
            <p>By <span class="author">{this.book.author}</span></p>
            <p><Rating n={this.book.rating} /></p>
            {markdown.render(this.book.markdownContent)}

            <hr />

            {orderedSnippets.map((bookSnippet, i) => <>
              <div class='chapter' id={`snippet-${bookSnippet.slug}`}>
                <h3 class='chapter-header'>
                  Chapter {i + 1} &mdash; { }
                  <a href={bookSnippet.view.route}>
                    {bookSnippet.renderedTitle}
                  </a>
                </h3>
                {bookSnippet.renderedBody}
                <hr />
              </div>
            </>)}

          </Content>

          <div>

            <ul class="readonline-chapters">
              <h3>Chapter Index</h3>

              {orderedSnippets.map((bookSnippet, i) => <>
                <li>
                  <p>
                    Ch.{i + 1} { }
                    <a href={`#snippet-${bookSnippet.slug}`}>
                      {bookSnippet.renderedTitle}
                    </a>
                  </p>
                </li>
              </>)}
            </ul>

          </div>

        </Container>
      </SiteCommon>)
    }
  }

}
