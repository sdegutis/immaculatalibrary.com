import * as Common from "../components/new/common";

export default <>
  <Common.Page>
    <main>

      <Common.SiteHeader image='/img/page/404.jpg' />
      <Common.Navlinks />

      <Common.Column spaced>
        <Common.Typography>

          <h1>Page not found</h1>
          <p>Sorry, couldn't find the page you're looking for.</p>

        </Common.Typography>
      </Common.Column>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />
  </Common.Page>
</>;
