import { Column } from "../components/column/column";
import { formatDate } from "../components/format-date";
import { TypicalPage } from "../components/page";
import { Typography } from "../components/typography";
import { markdown } from "../core/helpers";
import { allArticles } from "../model/articles";

export default allArticles.map(article => [`${article.slug}.html`, <>
  <TypicalPage image={article.data.imageFilename ?? '/img/page/articles.jpg'}>

    <link rel="stylesheet" href="/css/article.data.css" />

    <Column spaced split>

      <Typography>

        <h1>{markdown.renderInline(article.data.title)}</h1>

        {article.data.imageCaption && <small>(Image: {article.data.imageCaption})</small>}

        <p class="date">
          {formatDate(article.date)} &bull; {article.mins} min
        </p>

        {markdown.render(article.content)}

      </Typography>

    </Column>

  </TypicalPage>
</>]);
