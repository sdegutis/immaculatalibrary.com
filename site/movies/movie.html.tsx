import { Column } from "../components/column/column";
import { MoviesSidebar } from "../components/movies-sidebar";
import { TypicalPage } from "../components/page";
import { Typography } from "../components/typography";
import { markdown } from "../core/helpers";
import { allMovies } from '../model/movies';

export default allMovies.map(movie => {
  return [`${movie.slug}.html`, <>
    <TypicalPage image={`/img/movies/${movie.slug}-big.jpg`}>

      <Column spaced split>

        <Typography>
          <h1>{movie.data.title} ({movie.data.year})</h1>
          {movie.data.subtitle && <h4><i>{movie.data.subtitle}</i></h4>}
          {markdown.render(movie.content)}
        </Typography>

        <MoviesSidebar />

      </Column>

    </TypicalPage>
  </>];
});
