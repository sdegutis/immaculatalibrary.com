import * as Common from "../../components/common";
import { Rating } from "../../components/rating";
import { markdown } from "../../core/helpers";
import { allBooks } from '../../model/books';

export default allBooks.map(book => [`${book.data.slug}.html`, <>
  <Common.TypicalPage image={book.category.imageBig}>

    <Common.Column spaced split>

      <Common.Typography>

        <link rel="stylesheet" href='/css/book.css' />

        <h1>{book.data.title}</h1>
        <p class="subtitle">{book.data.subtitle}</p>
        <p>By <span class="author">{book.data.author}</span></p>
        <p><Rating n={book.data.rating} /></p>
        {markdown.render(book.data.content)}

        <h4>Read now:</h4>
        {book.data.complete && <>
          <table class="downloads" id='read-online-table'>
            <tr>
              <td>
                <a href={`/books/read-on-web/${book.data.slug}.html`}>
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

      </Common.Typography>

      <div>

        <script type='module' src='/script/random-snippet-in-book.js' />
        <h3>Book snippets (<a href='#' data-book={book.data.slug} id='random-snippet-in-book-button'>Random</a>)</h3>
        <ul class="snippets-latest">
          {book.snippets.length > 0
            ? <>
              {[...book.snippets].map(bookSnippet => <>
                <li>
                  <p>
                    p.{bookSnippet.data.archivePage} { }
                    <a href={bookSnippet.route}>{bookSnippet.renderedTitle}</a>
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

    </Common.Column>

  </Common.TypicalPage>
</>]);
