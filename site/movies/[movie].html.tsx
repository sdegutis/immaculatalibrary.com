import { Typography } from "../components/$typography.js";
import { Spaced, SplitColumn } from "../components/column.js";
import { MoviesList, VideosList } from "../components/movies-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { allMovies } from "../model/movies.js";
import { markdown } from "../util/helpers.js";

export default allMovies.map(movie => {
  return [movie.slug, <>
    <TypicalPage title="Movies" image={`/img/movies/${movie.slug}-big.jpg`} page="Movies">

      <Spaced>
        <SplitColumn>

          <Typography>
            <h2>{movie.data.title} ({movie.data.year})</h2>
            {movie.data.subtitle && <h4><i>{movie.data.subtitle}</i></h4>}
            {markdown.render(movie.content)}
          </Typography>

          <div>
            <MoviesList />
            <VideosList />
          </div>

        </SplitColumn>
      </Spaced>

    </TypicalPage>
  </>];
});
