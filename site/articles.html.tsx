import { Typography } from "./components/$typography.js";
import { ArticlesList } from "./components/articles-list.js";
import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg' page="Articles">

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>Articles of Immaculata Library</h2>
          <p>This is where I have rambled a lot.</p>
        </Typography>

        <ArticlesList />

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
