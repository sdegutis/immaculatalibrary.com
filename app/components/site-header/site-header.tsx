import { aboutPage } from "../../pages/about/about";
import { audioBiblePage } from "../../pages/audiobible/audiobible";
import { allBooksPage } from "../../pages/books/all-books/all-books";
import { devotionsPage } from "../../pages/devotions/devotions";
import { homePage } from "../../pages/home/home";
import { allMoviesPage } from "../../pages/movies/all-movies/all-movies";
import { musicPage } from "../../pages/music/music";
import { staticRouteFor } from "../../util/static";

export const SiteHeader: Component<{}> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['site-header.css']!)} />
  <header id="site-header">
    <nav class="container">
      <a href={homePage.route}>Immaculata Library</a>
      <ul>
        <li>
          <ul>
            <li><a href={aboutPage.route}>About</a></li>
            <li><a href={allBooksPage.route}>Books</a></li>
            <li><a href={allMoviesPage.route}>Movies</a></li>
          </ul>
        </li>
        <li>
          <ul>
            <li><a href={musicPage.route}>Music</a></li>
            <li><a href={audioBiblePage.route}>Audio Bible</a></li>
            <li><a href={devotionsPage.route}>Devotions</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</>;
