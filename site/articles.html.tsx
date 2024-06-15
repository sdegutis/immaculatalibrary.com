import { Typography } from "./components/$typography.js";
import { ArticlesList } from "./components/articles-list.js";
import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg' page="Articles">

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>About the Articles</h2>
          <p>
            Most of these articles were written to my children
            during a time in which they were unlawfully kept from me,
            and this site was the only means which I had of
            communicating to them any of my thoughts or heart.
          </p>
        </Typography>

        <ArticlesList />

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
