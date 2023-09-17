import { Column } from "../../components/new/column";
import { MoviesSidebar } from "../../components/new/movies-sidebar";
import { Navlinks } from "../../components/new/navlinks";
import { Page } from "../../components/new/page";
import { QuickLinks } from "../../components/new/quicklinks";
import { SiteFooter } from "../../components/new/site-footer";
import { SiteHeader } from "../../components/new/site-header";
import { Typography } from "../../components/new/typography";
import { allMovies } from "../../model/new/movies";
import { markdown } from "../../util/helpers";

export default allMovies.map(movie => {
  return [`${movie.slug}.html`, <>
    <Page>
      <main>

        <SiteHeader image={`/img/movies/${movie.slug}-big.jpg`} />
        <Navlinks />

        <Column spaced split>
          <Typography>

            <h1>{movie.displayTitle}</h1>
            {movie.meta.subtitle && <h4><i>{movie.meta.subtitle}</i></h4>}
            {markdown.render(movie.markdownContent)}

          </Typography>
          <MoviesSidebar />
        </Column>

      </main>

      <QuickLinks />
      <SiteFooter />
    </Page>
  </>];
});
