import * as Common from "../../components/new/common";
import { allMovies } from "../../model/new/movies";
import { markdown } from "../../util/helpers";

export default allMovies.map(movie => {
  return [`${movie.slug}.html`, <>
    <Common.Page>

      <Common.SiteHeader image={`/img/movies/${movie.slug}-big.jpg`} />
      <Common.Navlinks />

      <main>

        <Common.Column spaced split>
          <Common.Typography>

            <h1>{movie.displayTitle}</h1>
            {movie.meta.subtitle && <h4><i>{movie.meta.subtitle}</i></h4>}
            {markdown.render(movie.markdownContent)}

          </Common.Typography>
          <Common.MoviesSidebar />
        </Common.Column>

      </main>

      <Common.QuickLinks />
      <Common.SiteFooter />
    </Common.Page>
  </>];
});
