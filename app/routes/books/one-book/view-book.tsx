import { AdminButton } from "../../../components/admin-button/admin-button";
import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { Rating } from "../../../components/rating/rating";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../../core/router";
import { Book } from "../../../model/books/book";
import { excerpt, markdown, striptags } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";
import { allSnippetsPage } from "../../snippets/all/snippets";

export class ViewBookRoute implements Routeable {

  constructor(private book: Book) {
    addRouteable(this);
  }

  get route() {
    return `/books/${this.book.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: RouteInput): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        input={input}
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
            <div id='read-online-table-donate-section'>
              <p>To read online or download PDF, please make a <a href='#' id='donate-to-read-button'>one-time donation</a> to help keep the site running.</p>
              <p>Or you can <a href="#" onclick='revealReadOnlineSection(); return false'>just skip the donation</a> and start reading this book online now.</p>
            </div>
            <script defer src={staticRouteFor(__dir.filesByName['onebook.js']!)}></script>
            <p id='did-donate-sign' hidden>
              ❤️ Thanks for supporting this site! 🙏 Please continue to support us by <a href='https://buy.stripe.com/5kAaIqclW2dsby8dQQ' target='_blank'>donating</a> again when you can. ❤️
            </p>
            <table class="downloads" hidden id='read-online-table'>
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
                      <a href={`https://archive.org/details/${file.archiveId}?view=theater`} target="_blank">Read online</a>
                      {input.session?.isAdmin && <>
                        <br />
                        <AdminButton href={file.page.route}>New Snippet</AdminButton>
                      </>}
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

            <h3>Book snippets (<a href={allSnippetsPage.route}>See all</a>)</h3>
            <ul class="snippets-latest">
              {this.book.snippets.length > 0
                ? <>
                  {[...this.book.snippets].map(bookSnippet => <>
                    <li>
                      <p>
                        p.{bookSnippet.archivePage} { }
                        <a href={bookSnippet.view.route}>{markdown.renderInline(bookSnippet.title)}</a>
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
