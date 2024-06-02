import { CenteredColumn, Spaced } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { Typography } from './components/typography.js';

export default <>
  <TypicalPage title="Bible" image='/img/categories/classics-big.jpg'>

    <Spaced>
      <CenteredColumn>
        <Typography>

          <h2>Resources</h2>

          <h3>Live streams</h3>
          <ul>
            <li><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></li>
            <li><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></li>
            <li><a href='/sidebar/'>Sidebar</a> (install as an app)</li>
          </ul>

          <h3>Other</h3>
          <li><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></li>

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
