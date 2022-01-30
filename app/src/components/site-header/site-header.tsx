import { staticRouteFor } from "../../util/static";

export const SiteHeader: Component<{}> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['site-header.css']!)} />
  <header id="site-header">
    <nav class="container">
      <a href="/">Immaculata Library</a>
      <ul>
        <li>
          <ul>
            <li><a href="/about.html">About</a></li>
            <li><a href="/books.html">Books</a></li>
            <li><a href="/movies.html">Movies</a></li>
          </ul>
        </li>
        <li>
          <ul>
            <li><a href="/music.html">Music</a></li>
            <li><a href="/audio-bible.html">Audio Bible</a></li>
            <li><a href="/devotions.html">Devotions</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</>;
