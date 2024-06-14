import { Spaced, SplitColumn } from "../components/column.js";
import { MoviesList, VideosList } from "../components/movies-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { Typography } from "../components/typography.js";
import { markdown } from "../core/helpers.js";
import { allMovies } from "../model/movies.js";

export default allMovies.map(movie => {
  return [`${movie.slug}.html`, <>
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
