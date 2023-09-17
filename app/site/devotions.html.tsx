import * as Common from "../components/new/common";

export default <>
  <Common.Page>
    <main>

      <Common.SiteHeader image='/img/categories/blessed-sacrament-big.jpg' />
      <Common.Navlinks />

      <Common.Column spaced centered>
        <Common.Typography>

          <h1>Devotions</h1>

          <p><a href='/prayers.html'>Daily Prayers</a></p>
          <p><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></p>
          <p><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></p>
          <p><a href='https://www.catholiccompany.com/magazine/prayer-holy-souls-purgatory-st-gertrude-5921'>St. Gertrude Prayer</a></p>
          <p><a href='http://auxiliumchristianorum.org/'>Auxilium Christianorum</a></p>
          <p><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></p>

        </Common.Typography>
      </Common.Column>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />
  </Common.Page>
</>;
