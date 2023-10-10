import * as Common from "../components/common";
import { FormatDate } from "../components/format-date";
import { markdown } from "../core/helpers";
import { allArticles } from "../model/articles";

export default allArticles.map(article => [`${article.slug}.html`, <>
  <Common.TypicalPage image={article.data.imageFilename ?? '/img/page/articles.jpg'}>

    <link rel="stylesheet" href="/css/article.data.css" />

    <Common.Column spaced split>

      <Common.Typography>

        <h1>{markdown.renderInline(article.data.title)}</h1>

        {article.data.imageCaption && <small>(Image: {article.data.imageCaption})</small>}

        <p class="date">
          <FormatDate date={article.date} /> &bull; {article.mins} min
        </p>

        {markdown.render(article.content)}

      </Common.Typography>

    </Common.Column>

  </Common.TypicalPage>
</>]);
