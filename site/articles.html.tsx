import { Column } from "./components/column/column";
import { formatDate } from "./components/format-date";
import { TypicalPage } from "./components/page";
import { excerpt, markdown } from "./core/helpers";
import { allArticles } from "./model/articles";

export default <>
  <TypicalPage image='/img/page/articles.jpg'>

    <Column spaced>

      <link rel="stylesheet" href="/css/articles.css" />

      <h1>Articles</h1>
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

  </TypicalPage>
</>;
