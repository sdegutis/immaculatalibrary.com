import { CenteredColumn, Spaced } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { Typography } from './components/typography.js';

export default <>
  <TypicalPage title="Bible" image='/img/categories/classics-big.jpg'>

    <Spaced>
      <CenteredColumn>
        <Typography>

          <h2>Bibles</h2>
          <ul>
            <li><a href="https://www.amazon.com/dp/0898708338">Hardcover (RSV-CE2)</a></li>
            <li><a href="https://www.truthandlifeapp.com/">Audiobook (RSV-CE New Testament)</a></li>
            <li><a href="https://catenabible.com/">Catena Bible</a></li>
          </ul>

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
