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
          <p><a href="https://catenabible.com/">Catena Bible</a></p>

          <h3>Live streams</h3>
          <p><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></p>
          <p><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></p>
          <p><a href='/sidebar/'>Sidebar</a> (install as an app)</p>

          <h3>Prayers</h3>
          <p><a href='/prayers/'>Daily Prayers</a></p>
          <p><a href='http://auxiliumchristianorum.org/'>Auxilium Christianorum</a></p>
          <p><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></p>

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
