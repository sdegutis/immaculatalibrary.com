import * as Common from "../components/common";

export default <>
  <Common.Page>

    <Common.SiteHeader image='/img/page/home.jpg' />
    <Common.Navlinks />

    <main>

      <Common.Column spaced centered>
        <Common.Typography>

          <h1>About Immaculata Library</h1>

          <p>The website Immaculata Library began as a quick place
            to store digital copies of invaluable and timeless
            Catholic books that have become copyright free,
            in order to easily share them with friends and family.</p>

          <p>Over time, it has grown to be a full online library,
            with links to free and paid Sacred music, links and
            reviews of Catholic movies, and links to other resources
            to help Catholics grow in devotion in this digital age.</p>

          <p>Only the most useful and approved of all Catholic books
            are selected for this website. This means, only books that
            have received official approbations from Bishops, <em>and</em> have
            helped to produce Saints, or are written by Saints, are offered.</p>

        </Common.Typography>
      </Common.Column>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />

  </Common.Page>
</>;
