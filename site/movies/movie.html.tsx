import { Column, Spaced } from "../components/column/column";
import { MoviesSidebar } from "../components/movies-sidebar";
import { TypicalPage } from "../components/page";
import { Typography } from "../components/typography";
import { markdown } from "../core/helpers";
import { allMovies } from '../model/movies';

export default allMovies.map(movie => {
  return [`${movie.slug}.html`, <>
    <TypicalPage title="Movies" image={`/img/movies/${movie.slug}-big.jpg`}>

      <Spaced>
        <Column split>

          <Typography>
            <h2>{movie.data.title} ({movie.data.year})</h2>
            {movie.data.subtitle && <h4><i>{movie.data.subtitle}</i></h4>}
            {markdown.render(movie.content)}
          </Typography>

          <MoviesSidebar />

        </Column>
      </Spaced>

    </TypicalPage>
  </>];
});
