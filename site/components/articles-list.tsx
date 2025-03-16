import { allArticles } from "../model/articles.js";
import { formatDate } from "../util/format-date.js";
import { LoadingParagraph } from "./$loading.js";
import { PaginatorLoading } from "./paginator.js";

export const ArticlesList = (data: { count?: number }) => <>
  <script type='module' src='/scripts/paginate.js' />
  <div data-paginate={data.count ?? 7}>
    <div>
      <PaginatorLoading />
      <LoadingParagraph lines={2} />
      <LoadingParagraph lines={2} />
      <LoadingParagraph lines={2} />
      <LoadingParagraph lines={2} />
      <LoadingParagraph lines={2} />
      <LoadingParagraph lines={2} />
      <LoadingParagraph lines={2} />
    </div>
    <div hidden>
      {allArticles.map(article => <>
        <p>
          <a class="title" href={article.route}>{article.data.title}</a><br />
          <small>{article.mins} min &bull; {formatDate(article.date)}</small>
        </p>
      </>)}
    </div>
  </div>
</>;
