import { Column } from "./components/column/column";
import { featuredBooks } from "./components/featured/featured";
import { Font } from "./components/fonts";
import { Navlinks } from "./components/navlinks";
import { EmptyPage } from "./components/page";
import { QuickLinks } from "./components/quicklinks/quicklinks";
import { SiteFooter } from "./components/site-footer";
import { Typography } from "./components/typography";
import davidlibre from './fonts/davidlibre/';

export default <>
  <EmptyPage>

    <link rel="stylesheet" href="/css/home.css" />

    <Font use={davidlibre} fallback='serif'>
      <section id="home-hero" style={`background-image: url(/img/page/home.jpg)`}>
        <div></div>
        <div>
          <div>
            <h1><a href='/'>Immaculata Library</a></h1>
            <p>Catholic Digital Library</p>
          </div>
        </div>
      </section>
    </Font>

    <Navlinks />

    <main>

      <div id="letters-from-heaven">
        <Column spaced centered>
          <Typography>
            <h2>Letters from Heaven</h2>
            <blockquote>
              <p>
                “Have always at hand some approved book of devotion, and read a little of them every day with as much devotion as if you
                were reading a letter which those saints had sent you from heaven to show you the way to it, and encourage you to come.”
              </p>
              <ul>
                <li>
                  <p>&mdash; St. Francis de Sales</p>
                  <p>
                    <a href="/books/introduction-to-the-devout-life.html">Introduction to the Devout Life</a>, page{' '}
                    <a rel="noopener" href="/book-snippets/2021-06-26-how-we-should-do-holy-reading.html">77</a>
                  </p>
                </li>
              </ul>
            </blockquote>
          </Typography>
        </Column>
      </div>

      <Column spaced split>

        <div>

          <div>
            <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>
            <Typography>
              <div id="random-book-snippet">
                <p><em>Loading...</em></p>
              </div>
            </Typography>
          </div>
          <script type='module' src='/script/random-book-snippet.js' defer />

          {/* <h3>Book Snippets by Tag</h3>
          <p>{sortedTags().map(tag => <>
            <a href={tag.route}>#{tag.oneword}</a> { }
          </>)}</p> */}
        </div>

        <div class='hidden-on-mobile'>

          <h3>Featured books</h3>
          <ul id='home-featured-books'>
            {featuredBooks.map(book => <>
              <li>
                <h3>
                  <a href={book.route}>
                    {book.data.title}
                  </a>
                </h3>
                <Typography>
                  <p>{book.data.frontpage!.why}</p>
                </Typography>
              </li>
            </>)}
          </ul>

        </div>

      </Column>

    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
