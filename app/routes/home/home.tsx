import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { allSnippets } from "../../model/models";
import { Snippet } from "../../model/snippets/snippet";
import { allTags } from "../../model/snippets/tag";
import { calculateReadingMins, formatDate, markdown, randomElement } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import { LatestBookSnippets } from "../snippets/latest-list";
import cssFile from './home.css';
import headerImage from './home.jpg';
import randomBookSnippetScript from './random-book-snippet.js';

let randomSnippet: Snippet;
setTimeout(refreshRandomSnippet, 0);
setInterval(refreshRandomSnippet, 1000 * 60 * 60 * 24);
function refreshRandomSnippet() {
  randomSnippet = randomElement(allSnippets);
}

export const mainSiteHeaderImagePath = staticRouteFor(headerImage);

export const homePage: Routeable = {
  route: `/`,
  method: 'GET',
  handle: (input) => {
    return {
      body: renderElement(<>
        <Html>
          <Head
            description="Free Catholic Digital Resources"
            imagePath={mainSiteHeaderImagePath} />
          <body>

            <main>

              <link rel="stylesheet" href={staticRouteFor(cssFile)} />

              <section id="home-hero" style={`background-image: url(${mainSiteHeaderImagePath})`}>
                <div></div>
                <div>
                  <div>
                    <h1><a href={homePage.route}>Immaculata Library</a></h1>
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

                  <h3>Book Snippets by Tag</h3>
                  <p>{[...allTags.values()].map(tag => <>
                    <a href={tag.view.route}>#{tag.slug}</a> { }
                  </>)}</p>
                </div>
                <div>

                  <div>
                    <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>
                    <noscript>Enable JavaScript to see more random book snippets</noscript>
                    <Content>
                      <div id="random-book-snippet">
                        <SnippetWithPreview snippet={randomSnippet} />
                      </div>
                    </Content>
                  </div>
                  <script src={staticRouteFor(randomBookSnippetScript)} defer />

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

const SnippetWithPreview: JSX.Component<{ snippet: Snippet }> = ({ snippet }) => <>
  <h4><a href={snippet.view.route}>{markdown.renderInline(snippet.title)}</a></h4>
  <p>{formatDate(snippet.date)} &bull; {calculateReadingMins(snippet.markdownContent)} min</p>
  <p>
    From <a href={snippet.book.view.route}>{snippet.book.title}</a>
    , page <a rel="noopener" href={snippet.archiveLink}>{snippet.archivePage}</a>
    <br />
    <small>By {snippet.book.author}</small>
  </p>
  <div class='rendered-preview'>
    {snippet.previewMarkdown
      ? <>
        <div>{markdown.render(snippet.previewMarkdown)}</div>
        <div hidden>{markdown.render(snippet.markdownContent)}</div>
        <a href='#' class='continue-reading-snippet-link'><i>Continue reading...</i></a>
      </>
      : markdown.render(snippet.markdownContent)}
  </div>
</>;

const bookSnippetRandom: Routeable = {
  route: '/book-snippets/random',
  method: 'GET',
  handle: (input) => {
    return {
      body: renderElement(<SnippetWithPreview snippet={randomElement(allSnippets)} />)
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
