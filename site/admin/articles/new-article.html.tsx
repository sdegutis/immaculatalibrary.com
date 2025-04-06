import { handlers } from "../../../main.js"
import { EmptyPage } from "../../components/page.js"
import { Article } from "../../model/articles.js"

handlers.set('/create-article', body => {
  const params = new URLSearchParams(body)

  const date = new Date().toLocaleDateString('sv')
  const slug = `${date}-${params.get('slug')!}`

  const article = new Article(slug, params.get('content')!, {
    title: params.get('title')!,
  })

  article.save()

  return article.route
})

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./new-article.css' />
    <script src='./new-article.js' type='module'></script>

    <form method='POST' action='/create-article'>
      <textarea spellcheck='true' name='content' autofocus autocomplete='off' />
      <input placeholder='Title' autocomplete='off' name='title' />
      <input placeholder='Slug' autocomplete='off' name='slug' />
      <button>Create</button>
    </form>

  </EmptyPage>
</>
