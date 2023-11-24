import { CenteredColumn, Spaced } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { Typography } from './components/typography.js';

export default <>
  <TypicalPage title="Bible" image='/img/categories/classics-big.jpg'>

    <Spaced>
      <CenteredColumn>
        <Typography>

          <h2>Resources</h2>

          <h3>Bibles</h3>
          <p><a href="https://www.amazon.com/dp/0898708338">Hardcover (RSV-CE2)</a></p>
          <p><a href="https://www.truthandlifeapp.com/">Audiobook (RSV-CE New Testament)</a></p>

          <h3>Live streams</h3>
          <p><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></p>
          <p><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></p>

          <h3>Prayers</h3>
          <p><a href='/prayers.html'>Daily Prayers</a></p>
          <p><a href='https://www.catholiccompany.com/magazine/prayer-holy-souls-purgatory-st-gertrude-5921'>St. Gertrude Prayer</a></p>
          <p><a href='http://auxiliumchristianorum.org/'>Auxilium Christianorum</a></p>
          <p><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></p>

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
