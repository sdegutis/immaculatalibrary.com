import { Column, Spaced } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import { Rating } from "../components/rating.js";
import { Typography } from "../components/typography.js";
import { markdown } from "../core/helpers.js";
import { allBooks } from "../model/books.js";
import { LoadingLine, LoadingParagraph } from "../shared/loading.js";

export default allBooks.map(book => [`${book.slug}.html`, <>
  <TypicalPage title="Books" image={book.category.imageBig}>

    <Spaced>
      <Column split>

        <Typography>

          <link rel="stylesheet" href='/css/page/book.css' />

          <h2>{book.data.title}</h2>
          <p class="subtitle">{book.data.subtitle}</p>
          <p>By <span class="author">{book.data.author}</span></p>
          <p><Rating n={book.data.rating} /></p>
          {markdown.render(book.content)}

          <h4>Read now:</h4>
          {book.data.complete && <>
            <table class="downloads" id='read-online-table'>
              <tr>
                <td>
                  <a href={`/books/read-on-web/${book.slug}.html`}>
                    Read on Web
                  </a>
                </td>
              </tr>
            </table>
          </>}
          <table class="downloads" id='read-online-table'>
            {book.data.files.map(file => <>
              <tr>
                {book.data.files.length > 1 && <>
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

          {book.data.storeLinks.length > 0 && <>
            <h4>Buy physical book:</h4>
            <div class="indent">
              <p>You can purchase this book from these publishers:</p>
              <ul style="display: grid; grid-auto-flow: column;">
                {book.data.storeLinks.map(link => <>
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

        </Typography>

        <div>
          <script type='module' src='/scripts/book-page.js' />
          <h3>Book snippets</h3>
          <div id='snippets-in-book' data-book={book.slug}>
            <p><LoadingLine width="7em" /></p>
            <p style='display:flex; gap:1em'>
              <LoadingLine width='4em' height='1.6em' />
              <LoadingLine width='4em' height='1.6em' />
              <LoadingLine width='4em' height='1.6em' />
            </p>
            <ul>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
            </ul>
          </div>
        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>]);
