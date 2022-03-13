import { allCategories, allMovies } from "../model/models";
import { aboutPage } from "../routes/about/about";
import { audioBibleImageSmall, audioBiblePage } from "../routes/audiobible/audiobible";
import { allBooksPage } from "../routes/books/all-books/all-books";
import { devotionsPage } from "../routes/devotions/devotions";
import { allMoviesPage } from "../routes/movies/all-movies/all-movies";
import { musicPage } from "../routes/music/music";
import { staticRouteFor } from "../util/static";
import { Container } from "./container/container";

export const QuickLinks: JSX.Component<{}> = (attrs, children) => {
  // const recentPosts = allPosts.slice(0, 6);

  return <>
    <Container>
      <div id='sitewide-quicklinks'>
        <a href={aboutPage.route}>About</a>
        {' | '}
        <a href={allBooksPage.route}>Books</a>
        {' | '}
        <a href={allMoviesPage.route}>Movies</a>
        {' | '}
        <a href={musicPage.route}>Music</a>
        {' | '}
        <a href={audioBiblePage.route}>Audio Bible</a>
        {' | '}
        <a href={devotionsPage.route}>Devotions</a>
      </div>
    </Container>

    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['quicklinks.css']!)} />

    <div id="recents">
      <div class="container">

        {/* <h2>Blog Posts</h2>
        <p><a href={allPostsPage.route}>See all</a></p>

        <ul id="posts">

          {recentPosts.map(post => <>
            <li class="post-box">
              <a href={post.view.route}>
                <img class="image" src={post.imageSmall} alt={post.title} width="1000" height="400" />
              </a>
              <a class="title" href={post.view.route}>
                {post.title}
              </a>
              <span class="date">
                {formatDate(post.date)} &bull; {calculateReadingMins(post.markdownContent)} min
              </span>
              <div class="excerpt">
                {markdown.render(excerpt(post.markdownContent))}
              </div>
            </li>

          </>)}
        </ul> */}

        <h2>Books</h2>
        <ul class="quicklinks">

          {allCategories.map(cat => <li>
            <a class="link" href={cat.view.route} style={`background-image: url(${cat.imageSmall});`}>
              <span>{cat.shortTitle}</span>
            </a>
          </li>
          )}

        </ul>

        <h2>Movies</h2>
        <ul class="quicklinks">

          {allMovies.map(movie => <li>
            <a class="link" href={movie.view.route} style={`background-image: url(${movie.smallImage});`}>
              <span>{movie.shortTitle}</span>
            </a>
          </li>
          )}

          <li>
            <a class="link" href={audioBiblePage.route} style={`background-image: url(${audioBibleImageSmall});`}>
              <span>Audio Bible</span>
            </a>
          </li>

        </ul>

      </div>
    </div>

  </>;
};
