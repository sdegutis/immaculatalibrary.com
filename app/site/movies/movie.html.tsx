import * as Common from "../../components/common";
import { allMovies } from "../../model/models";
import { markdown } from "../../util/helpers";

export default allMovies.map(movie => {
  return [`${movie.slug}.html`, <>
    <Common.Page>

      <Common.SiteHeader image={`/img/movies/${movie.slug}-big.jpg`} />
      <Common.Navlinks />

      <main>

        <Common.Column spaced split>
          <Common.Typography>

            <h1>{movie.title} ({movie.year})</h1>
            {movie.subtitle && <h4><i>{movie.subtitle}</i></h4>}
            {markdown.render(movie.content)}

          </Common.Typography>
          <Common.MoviesSidebar />
        </Common.Column>

      </main>

      <Common.QuickLinks />
      <Common.SiteFooter />

    </Common.Page>
  </>];
});
