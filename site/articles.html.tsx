import { Column, Spaced } from "./components/column/column";
import { formatDate } from "./components/format-date";
import { TypicalPage } from "./components/page";
import { excerpt, markdown } from "./core/helpers";
import { allArticles } from "./model/articles";

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg'>

    <Spaced>
      <Column>

        <link rel="stylesheet" href="/css/articles.css" />

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
