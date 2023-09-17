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

      <SiteHeader image='/img/categories/blessed-sacrament-big.jpg' />
      <Navlinks />

      <Column spaced centered>
        <Typography>

          <h1>Devotions</h1>

          <p><a href='/prayers.html'>Daily Prayers</a></p>
          <p><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></p>
          <p><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></p>
          <p><a href='https://www.catholiccompany.com/magazine/prayer-holy-souls-purgatory-st-gertrude-5921'>St. Gertrude Prayer</a></p>
          <p><a href='http://auxiliumchristianorum.org/'>Auxilium Christianorum</a></p>
          <p><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></p>

        </Typography>
      </Column>

    </main>

    <QuickLinks />
    <SiteFooter />
  </Page>
</>;
