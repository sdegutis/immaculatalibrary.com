import { Column, Spaced } from "./components/column/column";
import { TypicalPage } from "./components/page";
import { Typography } from "./components/typography";

export default <>
  <TypicalPage title="Prayers" image='/img/categories/blessed-sacrament-big.jpg'>

    <Spaced>
      <Column centered>
        <Typography>

          <h2>Prayers</h2>

          <p><a href='/prayers.html'>Daily Prayers</a></p>
          <p><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></p>
          <p><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></p>
          <p><a href='https://www.catholiccompany.com/magazine/prayer-holy-souls-purgatory-st-gertrude-5921'>St. Gertrude Prayer</a></p>
          <p><a href='http://auxiliumchristianorum.org/'>Auxilium Christianorum</a></p>
          <p><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></p>

        </Typography>
      </Column>
    </Spaced>

  </TypicalPage>
</>;
