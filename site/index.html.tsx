import { CenteredColumn, Spaced, SplitColumn } from "./components/column.js";
import { FadeIn } from "./components/fadein.js";
import { Navlinks } from "./components/navlinks.js";
import { EmptyPage } from "./components/page.js";
import { QuickLinks } from "./components/quicklinks.js";
import { SiteFooter } from "./components/site-footer.js";
import { Typography } from "./components/typography.js";
import { featuredBooks } from "./model/featured.js";
import { HomeLoading } from "./shared/loading.js";

export default <>
  <EmptyPage>

    <link rel="stylesheet" href="/css/page/home.css" />

    <main>

      <div id="letters-from-heaven">
        <Spaced>
          <Navlinks />
          <CenteredColumn>
            <Typography>
              <FadeIn>
                <h1>Immaculata Library</h1>
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
                        <a rel="noopener" href="/snippets/2021-06-26-how-we-should-do-holy-reading.html">77</a>
                      </p>
                    </li>
                  </ul>
                </blockquote>
              </FadeIn>
            </Typography>
          </CenteredColumn>
        </Spaced>
      </div>

      <FadeIn>
        <Spaced>
          <SplitColumn>

            <div>

              <div>
                <h2>Snippet of the Hour</h2>
                <Typography>
                  <div id="random-book-snippet">
                    <HomeLoading />
                  </div>
                </Typography>
              </div>
              <script type='module' src='/scripts/home.js' />
            </div>

            <div class='hidden-on-mobile'>

              <h2>Featured books</h2>
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

          </SplitColumn>
        </Spaced>
      </FadeIn>

      <FadeIn>
        <Spaced>
          <CenteredColumn>
            <Typography>

              <h3>About Immaculata Library</h3>

              <p>The website Immaculata Library began as a quick place
                to store digital copies of invaluable and timeless
                Catholic books that have become copyright free,
                in order to easily share them with friends and family.</p>

              <p>Over time, it has grown to be a full online library,
                with links to free and paid Sacred music, links and
                reviews of Catholic movies, and links to other resources
                to help Catholics grow in devotion in this digital age.</p>

              <p>Only the most useful and approved of all Catholic books
                are selected for this website. This means, only books that
                have received official approbations from Bishops, <em>and</em> have
                helped to produce Saints, or are written by Saints, are offered.</p>

            </Typography>
          </CenteredColumn>
        </Spaced>
      </FadeIn>

    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
