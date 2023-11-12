import { ArticlesList } from "../components/articles-list.js";
import { Spaced, SplitColumn } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import { Typography } from "../components/typography.js";
import { markdown } from "../core/helpers.js";
import { allArticles } from "../model/articles.js";
import { formatDate } from '../shared/format-date.js';

export default allArticles.map(article => [`${article.slug}.html`, <>
  <TypicalPage title="Articles" image={article.data.imageFilename ?? '/img/page/articles.jpg'}>

    <Spaced>
      <SplitColumn>

        <div>
          <h2>{markdown.renderInline(article.data.title)}</h2>

          {article.data.imageCaption &&
            <p><small>(Image: {article.data.imageCaption})</small></p>
          }

          <p><small>{article.mins} min &bull; {formatDate(article.date)}</small></p>

          <style>{`.typography > p { text-indent: 1em; }`}</style>
          <Typography>
            {markdown.render(article.content)}
          </Typography>
        </div>

        <ArticlesList />

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>]);
