import { allCategories, categoriesBySlug } from '../../model/categories.js';
import { featuredBooks } from '../../model/featured.js';
import { allMovies } from '../../model/movies.js';
import { Typography } from '../typography.js';

export const QuickLinks: JSX.Component = (attrs, children) => {
  return <>
    <link rel="stylesheet" href='/components/quicklinks/quicklinks.css' />

    <div class="recents alt">

      <div class="container">
        <h2>Featured Books</h2>
      </div>

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

    </div>

    <div class="recents">
      <div class="container">

        <h2>Books</h2>
        <ul class="quicklinks">

          {allCategories.map(cat => <li>
            <a class="link" href={cat.route} style={`background-image: url(${cat.imageSmall});`}>
              <span>{cat.data.shortTitle}</span>
            </a>
          </li>
          )}

        </ul>

      </div>
    </div>

    <div class="recents alt">
      <div class="container">

        <h2>Movies</h2>
        <ul class="quicklinks">

          {allMovies.map(movie => <li>
            <a class="link" href={movie.route} style={`background-image: url(${movie.imageSmall});`}>
              <span>{movie.data.shortTitle}</span>
            </a>
          </li>
          )}

          <li>
            <a class="link" href='/audio-bible.html' style={`background-image: url(/img/page/audiobible.jpg);`}>
              <span>Audio Bible</span>
            </a>
          </li>

        </ul>

      </div>
    </div>

  </>;
};
