import { referenceImage } from '../../category/view-category';
import allBooksScript from './search-books.js';
import { HeroImage } from '/src/components/hero-image/hero-image';
import { Container } from "../../../components/container/container";
import { QuickLinks } from "/src/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "/src/components/site";
import { addRouteable, Routeable } from "/src/core/router";
import { staticRouteFor } from '../../../util/static';
import { allBooks } from "../../../model/books/book";

const allBooksPage: Routeable = {
  route: `/books.html`,
  method: 'GET',
  handle: (input) => {
    const title = 'All Books';
    const image = referenceImage();
    return {
      body: <>
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

                  <p>Not sure what to read?<br /> Try a <a href="/random.html" target="_blank">Random Book</a>.</p>
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

                  <script src={staticRouteFor(allBooksScript)}></script>

                </div>
              </Container>
            </main>
            <QuickLinks />
            <SiteFooter input={input} />
          </body>
        </Html>
      </>
    };
  },
};

addRouteable(allBooksPage);
