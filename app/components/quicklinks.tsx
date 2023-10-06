import { allCategories, allMovies } from "../model/models";

export const QuickLinks: JSX.Component<{}> = (attrs, children) => {
  return <>
    <link rel="stylesheet" href='/css/quicklinks.css' />

    <div id="recents">
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

        <h2>Movies</h2>
        <ul class="quicklinks">

          {allMovies.map(movie => <li>
            <a class="link" href={movie.route} style={`background-image: url(${movie.imageSmall});`}>
              <span>{movie.shortTitle}</span>
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
