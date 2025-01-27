import { jsxToString } from "@imlib/core";
import { CenteredColumn, Spaced } from '../components/column.js';
import { EmptyPage } from '../components/page.js';

export default jsxToString(<>
  <EmptyPage>
    <Spaced>
      <CenteredColumn>
        <div>
          <link rel="stylesheet" href="./linktree.css" />
          <div id='linktree'>
            <span>Steven Degutis</span>
            <a target="_blank" href="https://thegospelbygenz.com">The Gospel by Gen Z</a>
            <a target="_blank" href="https://immaculatalibrary.com">Immaculata Library</a>
          </div>
        </div>
      </CenteredColumn>
    </Spaced>
  </EmptyPage>
</>);
