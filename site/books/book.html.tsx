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

        <div>

          <Typography>
            <h2>{book.data.title}</h2>
            <p>{book.data.subtitle}</p>
            <p>By <span>{book.data.author}</span></p>
            <p><Rating n={book.data.rating} /></p>
            <blockquote>
              {markdown.render(book.content)}
            </blockquote>
          </Typography>

          <h3>Read now</h3>
          <blockquote>
            {book.data.complete && <>
              <p>
                <a href={`/books/read-on-web/${book.slug}.html`}>Read digitized edition</a>
              </p>
            </>}
            {book.data.files.map(file => <>
              <p>
                {book.data.files.length > 1 && <>
                  {file.pdfFile.replace('.pdf', '')}
                  <br />
                </>}
                <a href={`http://books.immaculatalibrary.com/${file.pdfFile}`} target="_blank">Download PDF</a>
                {file.archiveId && <>
                  { } &bull; { }
                  <a href={`https://archive.org/details/${file.archiveId}?view=theater`} target="_blank">Read Scans</a>
                </>}
              </p>
            </>)}
          </blockquote>

          {book.data.storeLinks.length > 0 && <>
            <h3>Buy physical book:</h3>
            <blockquote>
              <ul>
                {book.data.storeLinks.map(link => <>
                  <li>Purchase from <a href={link.link}>{markdown.renderInline(link.title)}</a></li>
                </>)}
              </ul>
            </blockquote>
          </>}

          <h3>How to download to iPhone</h3>
          <blockquote>
            <ol>
              <li>Install the <a href="https://apps.apple.com/us/app/apple-books/id364709193">Books app</a>.</li>
              <li>Download the book's PDF above.</li>
              <li>Wait for it to fully finish loading.</li>
              <li>Click the Share button.</li>
              <li>Click "Copy to Books".</li>
            </ol>
          </blockquote>

          <h3>Why is this book free?</h3>
          <blockquote>
            <p>
              This book was written so long ago that it's now public domain; the copyright it had when printed is no longer in effect.
            </p>
          </blockquote>

        </div>

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
