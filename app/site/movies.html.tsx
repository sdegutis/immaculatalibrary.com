import { Column } from "../components/new/column";
import { MoviesSidebar } from "../components/new/movies-sidebar";
import { Navlinks } from "../components/new/navlinks";
import { Page } from "../components/new/page";
import { QuickLinks } from "../components/new/quicklinks";
import { SiteFooter } from "../components/new/site-footer";
import { SiteHeader } from "../components/new/site-header";
import { Typography } from "../components/new/typography";

export default <>
  <Page>
    <main>

      <SiteHeader image='/img/categories/blessed-sacrament-big.jpg' />
      <Navlinks />

      <Column spaced split>
        <Typography>

          <h1>Holy Movies</h1>

          <p>
            Books are not the only way to experience the
            lives of the saints! Movies can be a great way
            to increase our devotion and love for God through
            his Saints. This page contains a roughly priotized
            list of recommended and reviewed Catholic movies.
          </p>

        </Typography>
        <MoviesSidebar />
      </Column>

    </main>

    <QuickLinks />
    <SiteFooter />
  </Page>
</>;
