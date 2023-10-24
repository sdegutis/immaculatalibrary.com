import { Column, Spaced } from "./components/column.js";
import { formatDate } from "./components/format-date.js";
import { TypicalPage } from "./components/page.js";
import { excerpt, markdown } from "./core/helpers.js";
import { allArticles } from "./model/articles.js";

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg'>

    <Spaced>
      <Column>

        <link rel="stylesheet" href="/css/page/articles.css" />

        <h2>Articles</h2>
        <ul class="all-blog-posts">
          {allArticles.map(article => <>
            <li class="post-row">
              <div>
                <a class="title" href={article.route}>
                  {article.data.title}
                </a>
                <span class="date">
                  {formatDate(article.date)} &bull; {article.mins} min
                </span>
                <div class="excerpt">
                  {markdown.render(excerpt(article.content))}
                </div>
              </div>
            </li>
          </>)}
        </ul>

      </Column>
    </Spaced>

  </TypicalPage>
</>;
