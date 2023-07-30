import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { Navlinks } from "../../components/navlinks";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { Routeable, addRouteable } from "../../core/router";
import { allBooks, allCategories, allSnippets } from "../../model/models";
import { staticRouteFor } from "../../util/static";
import { LatestBookSnippets } from "../snippets/latest-list";
import cssFile from './home.css';
import headerImage from './home.jpg';
import randomBookSnippetScript from './random-book-snippet.js';

const featuredBooks = [
  {
    id: 'introduction-to-the-devout-life',
    why: `Practical advice for living in a fallen world while building devotion and avoiding sin, useful both for those new to the faith and those looking to reinvigorate their spiritual life.`,
    image: 'instruction',
  },
  {
    id: 'imitation-of-christ',
    why: `One of the most popular and widely acclaimed books in all of Christian history, the Imitation of Christ is densely packed with devotional material for reflection and prayer.`,
    image: 'devotion',
  },
  {
    id: 'st-john-henry-newman-reply-to-eirenicon',
    why: `A thorough defense of the Church's core teachings about Mary, which many useful tangents like the process of conversion and an explanation of how the Church's devotions emerge.`,
    image: 'st-john-henry-newman',
  },
  {
    id: 'catena-aurea',
    why: `Commentary of the Church Fathers on the four Gospels, compiled and weaved together seamlessly by St. Thomas Aquinas and translated into English by St. John Henry Newman.`,
    image: 'classics',
  },
  {
    id: 'the-sinners-guide',
    why: `Exhortations to practice virtue and avoid sin, tackling this topic from practically every angle possible, with extremely thorough explanations and reasoned theology at every step along the way.`,
    image: 'holy-spirit',
  },
  {
    id: 'the-spiritual-combat',
    why: `Practical guide to the temptations we will face by trying to live a devout life and how to overcome them, with practical theology about the nature of sin, temptation, grace, and virtue.`,
    image: 'apologetics',
  },
  {
    id: 'the-glories-of-mary',
    why: `A comprehensive explanation and defense of all the devotions and doctrines relating to the Blessed Virgin Mary, structured around the Hail Holy Queen prayer, with historical examples and prayers.`,
    image: 'mary',
  },
  {
    id: 'catholic-encyclopedia',
    why: `The 1912 edition of the Catholic Encyclopedia, a 15 volume set series containing thorough and invaluable information on nearly every topic from the eyes of about 100 years ago.`,
    image: 'reference',
  },

];

export const mainSiteHeaderImagePath = staticRouteFor(headerImage);

export const homePage: Routeable = {
  route: `/`,
  method: 'GET',
  handle: (input) => {
    return {
      body: renderElement(<>
        <Html>
          <Head
            description="Catholic Digital Library"
            imagePath={mainSiteHeaderImagePath} />
          <body>

            <div>

              <link rel="stylesheet" href={staticRouteFor(cssFile)} />

              <section id="home-hero" style={`background-image: url(${mainSiteHeaderImagePath})`}>
                <div></div>
                <div>
                  <div>
                    <h1><a href={homePage.route}>Immaculata Library</a></h1>
                    <p>Catholic Digital Library</p>
                  </div>
                </div>
              </section>

              <Navlinks />

              <Container spaced centered>
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
              </Container>

            </div>

            <div id='featured-books-area'>

              <div id='featured-books-container'>

                <h2>Featured books</h2>

                <ul id='featured-books'>
                  {featuredBooks.map(({ id, why, image }) => {
                    const book = allBooks.find(book => book.slug === id)!;
                    const imageUrl = allCategories.find(cat => cat.slug === image)!.imageBig;
                    return <>
                      <li class='featured-book'>
                        <h3><a href={book.view.route}>{book.title}</a></h3>
                        <a href={book.view.route}>
                          <div class='thumb' style={`background-image: url(${imageUrl})`} />
                        </a>
                        <Content><p>{why}</p></Content>
                      </li>
                    </>;
                  })}
                </ul>

              </div>

            </div>

            <main>

              <Container spaced split>

                <div>

                  <div>
                    <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>
                    <noscript>Enable JavaScript to see more random book snippets</noscript>
                    <script>{`const homeSnippets = ${JSON.stringify(allSnippets.map(snippet => snippet.viewWithPreview.route))}`}</script>
                    <Content>
                      <div id="random-book-snippet"></div>
                    </Content>
                  </div>
                  <script src={staticRouteFor(randomBookSnippetScript)} defer />

                  {/* <h3>Book Snippets by Tag</h3>
                  <p>{sortedTags().map(tag => <>
                    <a href={tag.view.route}>#{tag.slug}</a> { }
                  </>)}</p> */}
                </div>
                <div>

                  <LatestBookSnippets />

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
