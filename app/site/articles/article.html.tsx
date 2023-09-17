import * as Common from "../../components/common";
import { calculateReadingMins, formatDate, markdown } from "../../core/helpers";
import { allArticles } from "../../model/models";

export default allArticles.map(article => [`${article.slug}.html`, <>
  <Common.TypicalPage image={article.imageFilename ?? '/img/page/articles.jpg'}>

    <link rel="stylesheet" href="/css/article.css" />

    <Common.Column spaced split>

      <Common.Typography>

        <h1>{markdown.renderInline(article.title)}</h1>

        {article.imageCaption && <small>(Image: {article.imageCaption})</small>}

        <p class="date">
          {formatDate(article.date)} &bull; {calculateReadingMins(article.content)} min
        </p>

        {markdown.render(article.content)}

      </Common.Typography>

    </Common.Column>

  </Common.TypicalPage>
</>]);
