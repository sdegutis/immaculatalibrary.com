import * as Common from "../../components/common";
import { MoviesSidebar } from "../../components/movies-sidebar";
import { markdown } from "../../core/helpers";
import { allMovies } from '../../model/movies';

export default allMovies.map(movie => {
  return [`${movie.data.slug}.html`, <>
    <Common.TypicalPage image={`/img/movies/${movie.data.slug}-big.jpg`}>

      <Common.Column spaced split>

        <Common.Typography>
          <h1>{movie.data.title} ({movie.data.year})</h1>
          {movie.data.subtitle && <h4><i>{movie.data.subtitle}</i></h4>}
          {markdown.render(movie.data.content)}
        </Common.Typography>

        <MoviesSidebar />

      </Common.Column>

    </Common.TypicalPage>
  </>];
});
