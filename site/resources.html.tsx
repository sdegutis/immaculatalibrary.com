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
          <ul>
            <li><a href="https://www.amazon.com/dp/0898708338">Hardcover (RSV-CE2)</a></li>
            <li><a href="https://www.truthandlifeapp.com/">Audiobook (RSV-CE New Testament)</a></li>
            <li><a href="https://catenabible.com/">Catena Bible</a></li>
          </ul>

          <h3>Live streams</h3>
          <ul>
            <li><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></li>
            <li><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></li>
            <li><a href='/sidebar/'>Sidebar</a> (install as an app)</li>
          </ul>

          <h3>Prayers</h3>
          <ul>
            <li><a href='/prayers/'>Daily Prayers</a></li>
            <li><a href='http://auxiliumchristianorum.org/'>Auxilium Christianorum</a></li>
            <li><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></li>
          </ul>

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
