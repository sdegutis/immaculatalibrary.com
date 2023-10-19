import { Column, Spaced } from "../components/column/column";
import { formatDate } from "../components/format-date";
import { TypicalPage } from "../components/page";
import { Typography } from "../components/typography";
import { markdown } from "../core/helpers";
import { allArticles } from "../model/articles";

export default allArticles.map(article => [`${article.slug}.html`, <>
  <TypicalPage title="Articles" image={article.data.imageFilename ?? '/img/page/articles.jpg'}>

    <link rel="stylesheet" href="/css/article.data.css" />

    <Spaced>
      <Column split>

        <Typography>

          <h2>{markdown.renderInline(article.data.title)}</h2>

          {article.data.imageCaption && <small>(Image: {article.data.imageCaption})</small>}

          <p class="date">
            {formatDate(article.date)} &bull; {article.mins} min
          </p>

          {markdown.render(article.content)}

        </Typography>

      </Column>
    </Spaced>

  </TypicalPage>
</>]);
