import { staticRouteFor } from "../util/static";
import { allCategories } from "../model/categories/category";
import { allMovies } from "../model/movies/movie";
import { publishedPosts } from "../model/posts/post";
import { excerpt, format_date, md, reading_mins } from "../util/helpers";
import { audioBibleImageSmall } from "/src/pages/audiobible/audiobible";

export const QuickLinks: Component<{}> = (attrs, children) => {
  const recentPosts = publishedPosts.slice(0, 6);

  return <>

    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['quicklinks.css']!)} />

    <div id="recents">
      <div class="container">

        <h2>Blog Posts</h2>
        <p><a href="/posts.html">See all</a></p>

        <ul id="posts">

          {recentPosts.map(post => <>
            <li class="post-box">
              <a href={post.view.route}>
                <img class="image" src={post.imageSmall} />
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
            <a class="link" href="/audio-bible.html" style={`background-image: url(${audioBibleImageSmall});`}>
              <span>Audio Bible</span>
            </a>
          </li>

        </ul>

      </div>
    </div>

  </>;
};
