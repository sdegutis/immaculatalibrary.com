import { allMovies } from "../../model/models";

export const MoviesSidebar: JSX.Component<{}> = (attrs, children) => <>
  <div>
    <ul>
      {allMovies.map(movie => <li>
        <a href={movie.view.route}>{movie.title}</a> ({movie.year})
      </li>)}
    </ul>
  </div>
</>;