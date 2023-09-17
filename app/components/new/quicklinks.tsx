import { allCategories } from "../../model/new/categories";
import { allMovies } from "../../model/new/movies";

export const QuickLinks: JSX.Component<{}> = (attrs, children) => {
  return <>
    <link rel="stylesheet" href='/css/quicklinks.css' />

    <div id="recents">
      <div class="container">

        <h2>Books</h2>
        <ul class="quicklinks">

          {allCategories.map(cat => <li>
            <a class="link" href={`/book/category/${cat.slug}.html`} style={`background-image: url(/img/categories/${cat.slug}-small.jpg);`}>
              <span>{cat.meta.shortTitle}</span>
            </a>
          </li>
          )}

        </ul>

        <h2>Movies</h2>
        <ul class="quicklinks">

          {allMovies.map(movie => <li>
            <a class="link" href={`/movies/${movie.slug}.html`} style={`background-image: url(/img/movies/${movie.slug}-small.jpg);`}>
              <span>{movie.meta.shortTitle}</span>
            </a>
          </li>
          )}

          <li>
            <a class="link" href='/audio-bible.html' style={`background-image: url(/img/page/audiobible-small.jpg);`}>
              <span>Audio Bible</span>
            </a>
          </li>

        </ul>

      </div>
    </div>

  </>;
};
