import { allCategories, allMovies, allPosts } from "../model/models";
import { audioBibleImageSmall, audioBiblePage } from "../pages/audiobible/audiobible";
import { allPostsPage } from "../pages/posts/all/all-posts";
import { excerpt, format_date, md, reading_mins } from "../util/helpers";
import { staticRouteFor } from "../util/static";

export const QuickLinks: Component<{}> = (attrs, children) => {
  const recentPosts = allPosts.slice(0, 6);

  return <>

    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['quicklinks.css']!)} />

    <div id="recents">
      <div class="container">

        <h2>Blog Posts</h2>
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
                {format_date(post.date)} &bull; {reading_mins(post.markdownContent)} min
              </span>
              <div class="excerpt">
                {md.render(excerpt(post.markdownContent))}
              </div>
            </li>

          </>)}
        </ul>

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
