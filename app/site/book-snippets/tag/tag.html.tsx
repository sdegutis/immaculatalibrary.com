import path from 'path/posix';
import * as Common from "../../../components/common";
import { SnippetsGroups } from "../../../components/snippet-groups";
import { allTags } from "../../../model/tag";

export default [...allTags.values()].map(tag => [path.basename(tag.route), <>
  <Common.TypicalPage image='/img/categories/reference-big.jpg'>

    <Common.Column spaced split>

      <div>
        <h1>{tag.name} Book Snippets</h1>
        <SnippetsGroups />
      </div>

      <script type='module'>{`
        import { showSnippetGroups } from '/script/snippet-groups.js';
        showSnippetGroups(s => s.tags.includes(${JSON.stringify(tag.name)}));
      `}</script>

    </Common.Column>

  </Common.TypicalPage>
</>]);
