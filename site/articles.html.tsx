import { ArticlesList } from "./components/articles-list.js";
import { Column, Spaced } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { Typography } from "./components/typography.js";

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg'>

    <Spaced>
      <Column split>

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

      </Column>
    </Spaced>

  </TypicalPage>
</>;
