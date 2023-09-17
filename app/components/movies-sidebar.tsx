import { allMovies } from "../model/new/models";

export const MoviesSidebar: JSX.Component<{}> = (attrs, children) => <>
  <div>
    <ul>
      {allMovies.map(movie => <li>
        <a href={`/movies/${movie.slug}.html`}>{movie.title}</a> ({movie.year})
      </li>)}
    </ul>
  </div>
</>;
