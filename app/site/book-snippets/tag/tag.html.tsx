import * as Common from "../../../components/common";
import { allTags } from "../../../model/tag";

export default [...allTags.values()].map(tag => {
  // const [randomSnippet] = tag.snippets;
  // const image = randomSnippet!.book.category.imageBig;

  // const groups = Object.entries(groupByDate([...tag.snippets]));

  return [`${tag.slug.toLowerCase()}.html`, <>
    <Common.TypicalPage image='/img/categories/reference-big.jpg'>

      <Common.Column spaced split>

        <div>
          <h1>{tag.name} Book Snippets</h1>
          {/* <SnippetsGroups groups={groups} /> */}
        </div>

      </Common.Column>

    </Common.TypicalPage>
  </>];
});
