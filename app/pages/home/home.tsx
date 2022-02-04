import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { addRouteable, Routeable } from "../../core/router";
import { allSnippets } from "../../model/models";
import { Snippet } from "../../model/snippets/snippet";
import { format_date, md, randomElement, reading_mins } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import { LatestBookSnippets } from "../snippets/latest-list";
import cssFile from './home.css';
import headerImage from './home.jpg';
import randomBookSnippetScript from './random-book-snippet.js';

export const mainSiteHeaderImagePath = staticRouteFor(headerImage);

export const homePage: Routeable = {
  route: `/`,
  method: 'GET',
  handle: (input) => {
    return {
      body: <>
        <Html>
          <Head
            description="Free Catholic Digital Resources"
            imagePath={mainSiteHeaderImagePath}
          >
            <link rel="stylesheet" href={staticRouteFor(cssFile)} />
          </Head>
          <body>
            <SiteHeader />

            <main>

              <section id="home-hero" style={`background-image: url(${mainSiteHeaderImagePath})`}>
                <div></div>
                <div>
                  <div>
                    <h1>Immaculata Library</h1>
                    <p>Free Digital Catholic Books</p>
                  </div>
                </div>
              </section>

              <Container spaced split>

                <div>
                  <div class="home">
                    <Content>
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
                    </Content>
                  </div>
                  <br />
                  <LatestBookSnippets />
                </div>
                <div>

                  <div>
                    <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>
                    <noscript>Enable JavaScript to see a random book snippet</noscript>
                    <Content>
                      <div id="random-book-snippet">
                        <SnippetWithPreview snippet={randomElement(allSnippets)} />
                      </div>
                    </Content>
                  </div>
                  <script src={staticRouteFor(randomBookSnippetScript)}></script>

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

const SnippetWithPreview: Component<{ snippet: Snippet }> = ({ snippet }) => <>
  <h4><a href={snippet.view.route}>{md.renderInline(snippet.title)}</a></h4>
  <p>{format_date(snippet.date)} &bull; {reading_mins(snippet.markdownContent)} min</p>
  <p>
    From <a href={snippet.book.view.route}>{snippet.book.title}</a>
    , page <a rel="noopener" href={snippet.archiveLink}>{snippet.archivePage}</a>
  </p>
  <div class='rendered-preview'>
    {snippet.previewMarkdown
      ? <>
        <div>{md.render(snippet.previewMarkdown)}</div>
        <div hidden>{md.render(snippet.markdownContent)}</div>
        <a href='#' class='continue-reading-snippet-link'><i>Continue reading...</i></a>
      </>
      : md.render(snippet.markdownContent)}
  </div>
</>;

const bookSnippetRandom: Routeable = {
  route: '/book-snippets/random',
  method: 'GET',
  handle: (input) => {
    return {
      body: <SnippetWithPreview snippet={randomElement(allSnippets)} />
    };
  }
};

addRouteable(bookSnippetRandom);

const redirectHomePageRoute: Routeable = {
  route: '/index.html',
  method: 'GET',
  handle: (input) => ({
    status: 302,
    headers: { 'Location': '/' },
  })
};

addRouteable(homePage);
addRouteable(redirectHomePageRoute);
