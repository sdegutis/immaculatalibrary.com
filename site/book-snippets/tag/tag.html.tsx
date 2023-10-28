import * as path from "path";
import { Column, Spaced } from "../../components/column.js";
import { TypicalPage } from "../../components/page.js";
import { SnippetsGroups } from "../../components/snippet-groups.js";
import { allTags } from "../../model/tag.js";

export default [...allTags.values()].map(tag => [path.basename(tag.route), <>
  <TypicalPage title='Book Snippets' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>
          <h2>{tag.name} Book Snippets</h2>
          <SnippetsGroups filter={{ type: 'tag', tag: tag.name }} />
        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>]);
