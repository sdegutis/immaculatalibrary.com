import { Container } from "../../../components/container/container";
import { HeroImage } from '../../../components/hero-image/hero-image';
import { QuickLinks } from '../../../components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../../../components/site';
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable } from '../../../core/router';
import { allBooks } from "../../../model/models";
import { staticRouteFor } from '../../../util/static';
import { referenceImage } from '../../category/view-category';
import { randomBookPage } from "../random-book";
import allBooksScript from './search-books.js';

export const allBooksPage: Routeable = {
  route: `/books.html`,
  method: 'GET',
  handle: (input) => {
    const title = 'All Books';
    const image = referenceImage();
    return {
      body: renderElement(<>
        <Html>
          <Head title={title}>
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container spaced split>
                <div>

                  <h1>{title}</h1>

                  <p>Not sure what to read?<br /> Try a <a href={randomBookPage.route} target="_blank">Random Book</a>.</p>
                  <hr />

                  <p>Search:<br /> <input type="text" oninput="searchBooks(this);" /></p>
                  <hr />

                  <ul id="books-all" style="padding-left: 20px">
                    {allBooks.map(book => <>
                      <li>
                        <p><a class="link" href={book.view.route}>{book.title}</a><br /> {book.author}</p>
                      </li>
                    </>)}
                  </ul>

                  <span hidden id="no-books-found" style="font-style: italic">
                    No results
                  </span>

                  <script src={staticRouteFor(allBooksScript)} defer></script>

                </div>
              </Container>
            </main>
            <QuickLinks />
            <SiteFooter input={input} />
          </body>
        </Html>
      </>)
    };
  },
};

addRouteable(allBooksPage);
