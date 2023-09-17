import { allMovies } from "../../model/new/movies";

export const MoviesSidebar: JSX.Component<{}> = (attrs, children) => <>
  <div>
    <ul>
      {allMovies.map(movie => <li>
        <a href={`/movies/${movie.slug}.html`}>{movie.meta.title}</a> ({movie.meta.year})
      </li>)}
    </ul>
  </div>
</>;
