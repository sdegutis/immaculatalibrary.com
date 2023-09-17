import * as Common from "../components/common";
import { booksBySlug, categoriesBySlug } from "../model/models";

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

export default <>
  <Common.Page>

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

      <Common.Column spaced centered>
        <div class="home">
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
        </div>
      </Common.Column>

      <div id='featured-books-area'>

        <div id='featured-books-container'>

          <h2>Featured books</h2>

          <ul id='featured-books'>
            {featuredBooks.map(({ id, why, image }) => {
              const book = booksBySlug[id]!;
              const imageUrl = categoriesBySlug[image]!.imageBig;
              return <>
                <li class='featured-book'>
                  <h3><a href={book.route}>{book.title}</a></h3>
                  <a href={book.route}>
                    <div class='thumb' style={`background-image: url(${imageUrl})`} />
                  </a>
                  <Common.Typography><p>{why}</p></Common.Typography>
                </li>
              </>;
            })}
          </ul>

        </div>

      </div>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />

  </Common.Page>
</>;
