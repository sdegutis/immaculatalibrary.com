import * as Common from "../components/common";
import { EmptyPage } from "../components/page";
import { booksBySlug } from '../model/books';

export default <>
  <EmptyPage>

    <link rel="stylesheet" href="/css/home.css" />

    <section id="home-hero" style={`background-image: url(/img/page/home.jpg)`}>
      <div></div>
      <div>
        <div>
          <h1><a href='/'>Immaculata Library</a></h1>
          <p>Catholic Digital Library</p>
        </div>
      </div>
    </section>

    <Common.Navlinks />

    <main>

      <div id="letters-from-heaven">
        <Common.Column spaced centered>
          <Common.Typography>
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
          </Common.Typography>
        </Common.Column>
      </div>

      <Common.Column spaced split>

        <div>

          <div>
            <h3>Random Book Snippet (<a href='#' id='refresh-random-book-snippet'>Another</a>)</h3>
            <Common.Typography>
              <div id="random-book-snippet">
                <p><em>Loading...</em></p>
              </div>
            </Common.Typography>
          </div>
          <script type='module' src='/script/random-book-snippet.js' defer />

          {/* <h3>Book Snippets by Tag</h3>
          <p>{sortedTags().map(tag => <>
            <a href={tag.route}>#{tag.oneword}</a> { }
          </>)}</p> */}
        </div>

        <div>

          <h3>Featured books</h3>

          <ul id='featured-books'>
            {[
              'introduction-to-the-devout-life',
              'imitation-of-christ',
              'st-john-henry-newman-reply-to-eirenicon',
              'catena-aurea',
              'the-sinners-guide',
              'the-spiritual-combat',
              'the-glories-of-mary',
              'catholic-encyclopedia',
            ].map(id => {
              const book = booksBySlug[id]!;

              return <>
                <li>
                  <h3>
                    <a href={book.route}>
                      {book.data.title}
                    </a>
                  </h3>
                  <Common.Typography>
                    <p>{book.data.frontpage!.why}</p>
                  </Common.Typography>
                </li>
              </>;
            })}
          </ul>

        </div>

      </Common.Column>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />

  </EmptyPage>
</>;
