import { allMovies } from "../../model/movies/movie";

export const MoviesSidebar: Component<{}> = (attrs, children) => <>
  <div>
    <ul>
      {allMovies.map(movie => <li>
        <a href={movie.view.route}>{movie.title}</a> ({movie.year})
      </li>)}
    </ul>
  </div>
</>;
