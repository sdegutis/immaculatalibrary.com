import { Typography } from "./components/$typography.js"
import { Admin } from "./components/admin.js"
import { ArticlesList } from "./components/articles-list.js"
import { Spaced, SplitColumn } from "./components/column.js"
import { TypicalPage } from "./components/page.js"

export default <>
  <TypicalPage title="Articles" image='/img/page/articles.jpg' page="Articles">

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>Letters I have written</h2>
          <p>Not meant for everyone.</p>
          <Admin>
            <p><a href='/admin/articles/new-article.html'>New article</a></p>
          </Admin>
        </Typography>

        <div>
          <h2>All Articles</h2>
          <ArticlesList />
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>
