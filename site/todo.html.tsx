import { CenteredColumn, Spaced } from "./components/column.js";
import { EmptyPage } from "./components/page.js";
import { LoadingParagraph } from "./shared/loading.js";

export default (
  <EmptyPage>
    <script type='module' src='/scripts/todo.js' />
    <Spaced>
      <CenteredColumn>
        <div id='root'>
          <LoadingParagraph lines={7} />
        </div>
      </CenteredColumn>
    </Spaced>
  </EmptyPage>
);
