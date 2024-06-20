import { HomeLoading } from "./components/$loading.js";
import { Typography } from "./components/$typography.js";
import { CenteredColumn, Spaced, SplitColumn } from "./components/column.js";
import { FadeIn } from "./components/fadein.js";
import { LatestSnippetsArea } from "./components/latest-snippets.js";
import { EmptyPage } from "./components/page.js";
import { QuickLinks } from "./components/quicklinks.js";
import { SiteFooter } from "./components/site-footer.js";
import { SiteHeader } from "./components/site-header.js";
import { allArticles } from "./model/articles.js";
import { allBooks } from "./model/books.js";

export default <>
  <EmptyPage>

    <main>

      <SiteHeader page="Home" image="/img/page/home.jpg" title={
        <Spaced>
          <CenteredColumn>
            <Typography>
              <FadeIn>
                <h1 style='text-align:left'>Immaculata Library</h1>
                <blockquote style='border:none; padding:0'>
                  <p>
                    “Have always at hand some approved book of devotion, and read a little of them every day with as much devotion as if you
                    were reading a letter which those saints had sent you from heaven to show you the way to it, and encourage you to come.”
                  </p>
                  <p style='margin-left:4em'>&mdash; St. Francis de Sales</p>
                  <p style='margin-left:2em'>
                    Introduction to the Devout Life, <a rel="noopener" href="/snippets/2021-06-26-how-we-should-do-holy-reading.html">page 77</a>
                  </p>
                </blockquote>
              </FadeIn>
            </Typography>
          </CenteredColumn>
        </Spaced> as string
      } />

      <Spaced>
        <SplitColumn>

          <FadeIn>

            <div>
              <h2>Snippet of the Hour</h2>
              <Typography>
                <div id="random-book-snippet">
                  <HomeLoading />
                </div>
              </Typography>
            </div>
            <script type='module' src='/scripts/$home.js' />
          </FadeIn>

          <div>

            <FadeIn>
              <h2>Latest book snippets</h2>
              <LatestSnippetsArea />
            </FadeIn>

            <FadeIn>
              <h2>Latest articles</h2>
              <ul>
                {allArticles.slice(0, 12).map(article => <>
                  <li>
                    {article.mins} min &bull; <a href={article.route}>{article.data.title}</a>
                  </li>
                </>)}
              </ul>
            </FadeIn>

            <FadeIn>
              <h2>Recently added books</h2>
              <ul>
                {allBooks.toReversed().slice(0, 7).map(book => <>
                  <li>
                    <a href={book.route}>{book.data.title}</a> by {book.data.author}
                  </li>
                </>)}
              </ul>
            </FadeIn>

          </div>

        </SplitColumn>
      </Spaced>

    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
