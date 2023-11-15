import { Spaced, SplitColumn } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import { PaginatorLoading } from "../components/paginator.js";
import { Rating } from "../components/rating.js";
import { Typography } from "../components/typography.js";
import { markdown } from "../core/helpers.js";
import { allBooks } from "../model/books.js";
import { LoadingLine, LoadingParagraph } from "../shared/loading.js";

export default allBooks.map(book => [`${book.slug}.html`, <>
  <TypicalPage title="Books" image={book.imageBig}>

    <Spaced>
      <SplitColumn>

        <Typography>

          <link rel="stylesheet" href='/css/page/book.css' />

          <h2>{book.data.title}</h2>
          <p>{book.data.subtitle}</p>
          <p>By <span>{book.data.author}</span></p>
          <p><Rating n={book.data.rating} /></p>

          <blockquote>
            {markdown.render(book.content)}
          </blockquote>

          <h4>Read now:</h4>
          {book.data.complete && <>
            <details open class='infobox green'>
              <summary>Complete book</summary>
              <p>
                This book has been fully digitized. { }
                <a href={`/books/read-on-web/${book.slug}.html`}>Read on web</a>
              </p>
            </details>
          </>}
          <ul class="downloads">
            {book.data.files.map(file => <li>
              {book.data.files.length > 1 && <>
                <p>
                  {file.pdfFile.replace('.pdf', '')}
                </p>
              </>}
              <p>
                <a href={`http://books.immaculatalibrary.com/${file.pdfFile}`} target="_blank">Download PDF</a>
                {file.archiveId && <>
                  { } &bull; { }
                  <a href={`https://archive.org/details/${file.archiveId}?view=theater`} target="_blank">Read Scans</a>
                </>}
              </p>
            </li>)}
          </ul>

          {book.data.storeLinks.length > 0 && <>
            <details open class='infobox'>
              <summary>Buy physical book:</summary>
              {book.data.storeLinks.map(link => <>
                <p>Purchase from <a href={link.link}>{markdown.renderInline(link.title)}</a></p>
              </>)}
            </details>
          </>}

          <p>
            <details class='infobox yellow'>
              <summary>
                How to download to iPhone
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
            <details class='infobox yellow'>
              <summary>
                Why is this book free?
              </summary>
              <p>
                This book is in the public domain. The copyright it had when printed is no longer in effect.
              </p>
            </details>
          </p>

        </Typography>

        <div>
          <script type='module' src='/scripts/book-page.js' />
          <h3>Snippets from this book</h3>
          <div id='snippets-in-book' data-book={book.slug}>
            <p><LoadingLine width="7em" /></p>
            <p><LoadingLine width="100%" height="2em" /></p>
            <PaginatorLoading />
            <ul>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
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

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>]);
