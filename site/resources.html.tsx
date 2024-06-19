import { Typography } from './components/$typography.js';
import { CenteredColumn, Spaced } from './components/column.js';
import { TypicalPage } from './components/page.js';

export default <>
  <TypicalPage title="Catholic Resources" image='/img/categories/classics-big.jpg' page='Resources'>

    <Spaced>
      <CenteredColumn>
        <Typography>

          <h2>Livestreams</h2>
          <ul>
            <li><a href='https://mass-online.org/daily-holy-mass-live-online/'>Online Masses</a></li>
            <li><a href='https://www.youtube.com/watch?v=rz5gektkF0o'>Online Adoration</a></li>
          </ul>

          <h2>Bibles</h2>
          <ul>
            <li><a href="https://www.amazon.com/dp/0898708338">Buy Hardcover</a></li>
            <li><a href="https://www.truthandlifeapp.com/">Audio Bible</a></li>
          </ul>

          <h2>Apps</h2>
          <ul>
            <li><a href='/sidebar/'>Adoration Sidebar</a> (install as an app)</li>
          </ul>

          <h2>Blogs</h2>
          <li><a href='https://www.catholicexorcism.org/'>CatholicExorcism.org</a></li>

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
