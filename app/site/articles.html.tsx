import * as Common from "../components/common";
import { excerpt, markdown } from "../core/helpers";
import { allArticles } from "../model/articles";

export default <>
  <Common.TypicalPage image='/img/page/articles.jpg'>

    <Common.Column spaced>

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
                <span class='format-date'>{article.data.date}</span> &bull; {article.mins} min
              </span>
              <div class="excerpt">
                {markdown.render(excerpt(article.data.content))}
              </div>
            </div>
          </li>
        </>)}
      </ul>

    </Common.Column>

  </Common.TypicalPage>
</>;
