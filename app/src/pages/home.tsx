import { Routeable } from "../core/router";
import { LatestBookSnippets } from "../view/latest-snippets";
import { QuickLinks } from "../view/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/site";

export const homePage: Routeable = {
  route: `/`,
  method: 'GET',
  handle: (input) => {
    return {
      body: <>
        <Html>
          <Head
            description="Free Catholic Digital Resources"
            imagePath="/img/header.jpg"
          >
            <link rel="stylesheet" href="/css/layout/home.css" />
          </Head>
          <body>
            <SiteHeader input={input} />

            <main>

              <section id="home-hero">
                <div></div>
                <div>
                  <div>
                    <h1>Immaculata Library</h1>
                    <p>Free Digital Catholic Books</p>
                  </div>
                </div>
              </section>

              <div class="container">
                <section class="spaced-main-content split-page">
                  <div>
                    <div class="home content">

                      <h3>Letters from Heaven</h3>
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
                              <a href="https://archive.org/details/an-introduction-to-the-devout-life/page/77?view=theater">77</a>
                            </p>
                          </li>
                        </ul>
                      </blockquote>

                    </div>
                    <br />
                    <LatestBookSnippets />
                  </div>
                  <div>

                    <div>
                      <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>
                      <noscript>Enable JavaScript to see a random book snippet</noscript>
                      <div id="random-book-snippet" class="content"></div>
                    </div>
                    <script src="/js/home.js"></script>

                  </div>
                </section>
              </div>

            </main>

            <QuickLinks />
            <SiteFooter />
          </body>
        </Html>
      </>
    };
  },
};

const redirectHomePageRoute: Routeable = {
  route: '/index.html',
  method: 'GET',
  handle: (input) => ({
    status: 302,
    headers: { 'Location': '/' },
  })
};

export const homeRoutes: Routeable[] = [
  homePage,
  redirectHomePageRoute
];
