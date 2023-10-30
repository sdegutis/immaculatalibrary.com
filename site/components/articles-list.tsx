import { allArticles } from "../model/articles.js";
import { formatDate } from "../shared/format-date.js";

export const ArticlesList = () => <>
  <div>
    <h2>All Articles</h2>
    <ul>
      {allArticles.map(article => <>
        <li>
          <a class="title" href={article.route}>{article.data.title}</a><br />
          <small>{article.mins} min &bull; {formatDate(article.date)}</small>
        </li>
      </>)}
    </ul>
  </div>
</>;
