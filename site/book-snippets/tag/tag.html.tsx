import * as path from "path";
import { Column, Spaced } from "../../components/column.js";
import { TypicalPage } from "../../components/page.js";
import { allSnippets } from "../../model/snippets.js";
import { allTags } from "../../model/tag.js";
import { SnippetsList } from "../../shared/snippets.js";

export default [...allTags.values()].map(tag => [path.basename(tag.route), <>
  <TypicalPage title='Book Snippets' image='/img/categories/reference-big.jpg'>

    <Spaced>
      <Column split>

        <div>
          <h2>{tag.name} Book Snippets</h2>
          <SnippetsList snippets={allSnippets.filter(s => s.tags.has(tag))} />
        </div>

      </Column>
    </Spaced>

  </TypicalPage>
</>]);
