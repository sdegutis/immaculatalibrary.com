import { allCategories, categoriesBySlug } from '../model/categories.js';
import { featuredBooks } from '../model/featured.js';
import { allMovies } from '../model/movies.js';
import { Typography } from './$typography.js';
import { Column } from './column.js';
import { FadeIn } from './fadein.js';

export const QuickLinks: JSX.Component = (attrs, children) => {
  return <>
    <link rel="stylesheet" href='/css/components/quicklinks.css' />

    <div class="recents alt">

      <FadeIn>
        <Column>
          <h2>Featured Books</h2>
          <div id='featured-books-area'>
            <div id='featured-books-container'>

              <ul id='featured-books'>
                {featuredBooks.map(book => {
                  const imageUrl = categoriesBySlug[book.data.frontpage!.image]!.imageBig;
                  return <>
                    <li class='featured-book'>
                      <div class='thumb' style={`background-image: url(${imageUrl})`} />
                      <h3><a href={book.route}>{book.data.title}</a></h3>
                      <Typography><p>{book.data.frontpage!.why}</p></Typography>
                    </li>
                  </>;
                })}
              </ul>

            </div>
          </div>
        </Column>
      </FadeIn>

    </div>

    <div class="recents">
      <Column>

        <FadeIn>
          <h2>Books</h2>
          <ul class="quicklinks">
            {allCategories.map(cat => <li>
              <a class="link" href={cat.route} style={`background-image: url(${cat.imageSmall});`}>
                <span>{cat.data.shortTitle}</span>
              </a>
            </li>
            )}
          </ul>
        </FadeIn>

      </Column>
    </div>

    <div class="recents alt">
      <Column>

        <FadeIn>
          <h2>Movies</h2>
          <ul class="quicklinks">

            {allMovies.map(movie =>
              <li>
                <a class="link" href={movie.route} style={`background-image: url(${movie.imageSmall});`}>
                  <span>{movie.data.shortTitle}</span>
                </a>
              </li>
            )}

            <li>
              <a class="link" href='/videos.html' style={`background-image: url(/img/page/videos.jpg);`}>
                <span>Fulton Sheen</span>
              </a>
            </li>

            <li>
              <a class="link" href='/resources.html' style={`background-image: url(/img/page/audiobible.jpg);`}>
                <span>Audio Bible</span>
              </a>
            </li>

          </ul>
        </FadeIn>

      </Column>
    </div>

  </>;
};
