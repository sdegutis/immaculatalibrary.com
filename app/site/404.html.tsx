import { Column } from "../components/new/column";
import { Navlinks } from "../components/new/navlinks";
import { Page } from "../components/new/page";
import { QuickLinks } from "../components/new/quicklinks";
import { SiteFooter } from "../components/new/site-footer";
import { SiteHeader } from "../components/new/site-header";
import { Typography } from "../components/new/typography";

export default <>
  <Page>
    <main>

      <SiteHeader image='/img/page/404.jpg' />
      <Navlinks />

      <Column spaced>
        <Typography>

          <h1>Page not found</h1>
          <p>Sorry, couldn't find the page you're looking for.</p>

        </Typography>
      </Column>

    </main>

    <QuickLinks />
    <SiteFooter />
  </Page>
</>;
