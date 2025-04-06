import { HomeLoading } from "./components/$loading.js"
import { Typography } from "./components/$typography.js"
import { VerifyHuman } from "./components/_verifyhuman.js"
import { ArticlesList } from "./components/articles-list.js"
import { CenteredColumn, Spaced, SplitColumn } from "./components/column.js"
import { FadeIn } from "./components/fadein.js"
import { EmptyPage } from "./components/page.js"
import { QuickLinks } from "./components/quicklinks.js"
import { SiteFooter } from "./components/site-footer.js"
import { SiteHeader } from "./components/site-header.js"
import { Markdown } from "./fathers.html.js"
import { allVideos } from "./model/videos.js"

const video = allVideos.find(v => v.data.title.includes('Demonic'))!

export default <>
  <EmptyPage>

    <VerifyHuman />

    <main>

      <SiteHeader page="Home" image="/img/page/home.jpg" title={
        <Spaced>
          <CenteredColumn>
            <Typography>
              <blockquote>
                <Markdown>
                  "Have always at hand some approved book of devotion, and read a little of them every day with as much devotion as if you
                  were reading a letter which those saints had sent you from heaven to show you the way to it, and encourage you to come."
                </Markdown>
                <p style='margin-left:4em'>&mdash; St. Francis de Sales</p>
                <p style='margin-left:2em'>
                  Introduction to the Devout Life, <a rel="noopener" href="/snippets/2021-06-26-how-we-should-do-holy-reading.html">page 77</a>
                </p>
              </blockquote>
            </Typography>
          </CenteredColumn>
        </Spaced>
      } />

      <Spaced>
        <SplitColumn>

          {/* <img
            srcset={[
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/410px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 410w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/164px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 164w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/328px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 328w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/525px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 525w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/701px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 701w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/1401px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 1401w',
              // 'https://upload.wikimedia.org/wikipedia/commons/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 3508w',
            ].join(', ')}
            width='400'
          /> */}

          <FadeIn>

            <div>
              <h2>Snippet of the Hour</h2>
              <Typography>
                <div id="random-book-snippet">
                  <HomeLoading />
                </div>
              </Typography>
            </div>
            <script type='module' src='/scripts/home.js' />
          </FadeIn>

          <div>

            <FadeIn>
              <h2>Latest Articles</h2>
              <p><i>Not written to everyone.</i></p>
              <ArticlesList count={12} />
            </FadeIn>

          </div>

        </SplitColumn>
      </Spaced>

    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>
