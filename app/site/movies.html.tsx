import * as Common from "../components/common";
import { MoviesSidebar } from "../components/movies-sidebar";

export default <>
  <Common.Page>

    <Common.SiteHeader image='/img/movies/passion-of-the-christ-big.jpg' />
    <Common.Navlinks />

    <main>

      <Common.Column spaced split>

        <Common.Typography>
          <h1>Holy Movies</h1>
          <p>
            Books are not the only way to experience the
            lives of the saints! Movies can be a great way
            to increase our devotion and love for God through
            his Saints. This page contains a roughly priotized
            list of recommended and reviewed Catholic movies.
          </p>
        </Common.Typography>

        <MoviesSidebar />

      </Common.Column>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />

  </Common.Page>
</>;
