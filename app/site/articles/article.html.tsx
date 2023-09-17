import * as Common from "../../components/common";
import { allArticles } from "../../model/models";
import { calculateReadingMins, formatDate, markdown } from "../../util/helpers";

export default allArticles.map(article => [`${article.slug}.html`, <>
  <link rel="stylesheet" href="/css/article.css" />

  <Common.Page>

    <Common.SiteHeader image='/img/page/articles.jpg' />
    <Common.Navlinks />

    <main>

      <Common.Column spaced split>

        <Common.Typography>

          <h1>{markdown.renderInline(article.title)}</h1>

          <p class="date">
            {formatDate(article.date)} &bull; {calculateReadingMins(article.content)} min
          </p>

          {markdown.render(article.content)}

        </Common.Typography>

      </Common.Column>

    </main>

    <Common.QuickLinks />
    <Common.SiteFooter />

  </Common.Page>
</>]);
