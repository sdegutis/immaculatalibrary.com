import { allCategories } from "../../model/category";
import { allMovies } from "../../model/movie";
import { publishedPosts } from "../../model/post";
import { excerpt, format_date, md, reading_mins } from "../../util/helpers";

export const QuickLinks: Component<{}> = (attrs, children) => {
  const recentPosts = publishedPosts.slice(0, 6);

  return <>

    <div id="recents">
      <div class="container">

        <h2>Blog Posts</h2>
        <p><a href="/posts.html">See all</a></p>

        <ul id="posts">

          {recentPosts.map(post => <>
            <li class="post-box">
              <a href={post.route}>
                <img class="image" src={post.imageFilename} />
              </a>
              <a class="title" href={post.route}>
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
            <a class="link" href={cat.route} style={`background-image: url(/img/${cat.slug}.jpg);`}>
              <span>{cat.shortTitle}</span>
            </a>
          </li>
          )}

        </ul>

        <h2>Movies</h2>
        <ul class="quicklinks">

          {allMovies.map(movie => <li>
            <a class="link" href={movie.route} style={`background-image: url(/img/movies/${movie.slug}-small.jpg);`}>
              <span>{movie.shortTitle}</span>
            </a>
          </li>
          )}

          <li>
            <a class="link" href="/audio-bible.html" style="background-image: url(/img/audiobible.png);">
              <span>Audio Bible</span>
            </a>
          </li>

        </ul>

      </div>
    </div>

  </>;
};
