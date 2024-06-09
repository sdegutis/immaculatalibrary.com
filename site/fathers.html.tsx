import { ArticlesList } from "./components/articles-list.js";
import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { Typography } from "./components/typography.js";

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg'>

    <Spaced>
      <SplitColumn>

        <span>Commentary on the Gospels by the Fathers of the Church, made easily searchable. (Catena Bible is missing quite a few quotes, plus that site is made by some orthodoxes.)</span>
        <span>Coming soon.</span>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
