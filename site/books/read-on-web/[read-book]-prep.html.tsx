import handlers from "handlers!"
import { Typography } from "../../components/$typography.js"
import { EmptyPage } from "../../components/page.js"
import { allBooks } from "../../model/books.js"
import { allSnippets } from "../../model/snippets.js"
import { sortBy } from "../../util/_helpers.js"

handlers.set('/reorder-snippets-in-book', (body) => {
  const json = JSON.parse(body) as { slug: string, i: number }[]
  for (const { i, slug } of json) {
    const s = allSnippets.find(s => slug === s.slug)!
    s.data.sortOrder = i
    s.save()
  }
  return '/'
})

export default allBooks.filter(book => book.data.complete).map(book => {
  const orderedSnippets = [...book.snippets]
  orderedSnippets.sort(sortBy(s => s.data.sortOrder ?? 0))

  const file = book.data.files[0]!

  return [book.slug, <>
    <EmptyPage>

      {book.snippets.map((bookSnippet, i) => <>
        <div class='chapter' id={`snippet-${bookSnippet.slug}`}>
          {/* <h1>
            Chapter {i + 1} &mdash;
            <a href={bookSnippet.route}>
              {bookSnippet.data.title}
            </a>
          </h1> */}
          <Typography>
            {bookSnippet.renderedBody}
          </Typography>
          <hr />
        </div>
      </>)}

    </EmptyPage>
  </>]
})
