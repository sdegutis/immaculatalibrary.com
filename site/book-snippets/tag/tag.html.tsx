import path from 'path/posix';
import { Column, Spaced } from '../../components/column/column';
import { TypicalPage } from '../../components/page';
import { SnippetsGroups } from "../../components/snippet-groups";
import { allTags } from "../../model/tag";

export default [...allTags.values()].map(tag => [path.basename(tag.route), <>
  <TypicalPage image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>
          <h1>{tag.name} Book Snippets</h1>
          <SnippetsGroups />
        </div>

        <script type='module'>{`
        import { showSnippetGroups } from '/script/snippet-groups.js';
        showSnippetGroups(s => s.tags.includes(${JSON.stringify(tag.name)}));
      `}</script>

      </Column>
    </Spaced>

  </TypicalPage>
</>]);
