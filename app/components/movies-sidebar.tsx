import { allMovies } from '../model/movies';

export const MoviesSidebar: JSX.Component<{}> = (attrs, children) => <>
  <div>
    <ul>
      {allMovies.map(movie => <li>
        <a href={`/movies/${movie.data.slug}.html`}>{movie.data.title}</a> ({movie.data.year})
      </li>)}
    </ul>
  </div>
</>;
