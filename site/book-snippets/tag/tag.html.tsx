import * as path from 'path/posix';
import { Column, Spaced } from '../../components/column/column';
import { TypicalPage } from '../../components/page';
import { SnippetsGroups } from "../../components/snippet-groups";
import { allSnippets } from '../../model/snippets';
import { allTags } from "../../model/tag";

export default [...allTags.values()].map(tag => [path.basename(tag.route), <>
  <TypicalPage title='Book Snippets' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>
          <h2>{tag.name} Book Snippets</h2>
          <SnippetsGroups snippets={allSnippets.filter(s => s.tags.has(tag))} />
        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>]);
