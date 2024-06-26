import { Typography } from "../../components/$typography.js";
import { Admin } from "../../components/admin.js";
import { Navlinks } from "../../components/navlinks.js";
import { EmptyPage } from "../../components/page.js";
import { Rating } from "../../components/rating.js";
import { SiteFooter } from "../../components/site-footer.js";
import { handlers } from "../../core/exports.js";
import { allBooks } from "../../model/books.js";
import { allSnippets } from "../../model/snippets.js";
import { markdown, sortBy } from "../../util/helpers.js";

handlers.set('/reorder-snippets-in-book', (body) => {
  const json = JSON.parse(body) as { slug: string, i: number }[];
  for (const { i, slug } of json) {
    const s = allSnippets.find(s => slug === s.slug)!;
    s.data.sortOrder = i;
    s.save();
  }
  console.log('done')
  return '/';
});

export default allBooks.filter(book => book.data.complete).map(book => {
  const orderedSnippets = [...book.snippets];
  orderedSnippets.sort(sortBy(s => s.data.sortOrder ?? 0));

  const file = book.data.files[0]!;

  return [book.slug, <>
    <EmptyPage>

      <link rel="stylesheet" href='/css/page/read-book.css' />
      <Admin><script type='module' src='./$read-whole-book.js' /></Admin>

      <main>

        <Navlinks page="Books" />

        <section>

          <div>

            <Typography>
              <h2><a href={book.route}>{book.data.title}</a></h2>
              <p class="subtitle">{book.data.subtitle}</p>
              <p>By <span class="author">{book.data.author}</span></p>
              <p><Rating n={book.data.rating} /></p>
              {markdown.render(book.content)}
            </Typography>

            <hr />

            <h3>Chapter Index</h3>
            <div class="readonline-chapters">
              {orderedSnippets.map((bookSnippet, i) => <span class='chapter-link'>
                <span>Ch.{i + 1}</span>
                <a href={`#snippet-${bookSnippet.slug}`}>
                  {bookSnippet.renderedTitle}
                </a>
              </span>)}
            </div>

          </div>

          <div>
            <Typography>
              {orderedSnippets.map((bookSnippet, i) => <>
                <div class='chapter' id={`snippet-${bookSnippet.slug}`}>
                  <h3 class='chapter-header'>
                    Chapter {i + 1} &mdash; { }
                    <a href={bookSnippet.route}>
                      {bookSnippet.renderedTitle}
                    </a>
                  </h3>
                  {bookSnippet.renderedBody}
                  <hr />
                </div>
              </>)}
            </Typography>
          </div>

          <iframe src={`https://archive.org/details/${file.archiveId}?view=theater`} />

        </section>

        <SiteFooter thin />

      </main>

    </EmptyPage>
  </>];
});
