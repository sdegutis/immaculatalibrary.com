import { aboutPage } from "../../routes/about/about";
import { audioBiblePage } from "../../routes/audiobible/audiobible";
import { allBooksPage } from "../../routes/books/all-books/all-books";
import { devotionsPage } from "../../routes/devotions/devotions";
import { homePage } from "../../routes/home/home";
import { allMoviesPage } from "../../routes/movies/all-movies/all-movies";
import { musicPage } from "../../routes/music/music";
import { staticRouteFor } from "../../util/static";

export const SiteHeader: JSX.Component<{}> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['site-header.css']!)} />
  <header id="site-header">
    <nav class="container">
      <a href={homePage.route}>Immaculata Library</a>
      <ul>
        <li>
          <ul>
            <li><a href='#' class='feedback-button' id='giveFeedbackButton'>Give Feedback</a></li>
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
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['feedback.css']!)} />
  <script src={staticRouteFor(__dir.filesByName['feedback.js']!)} defer />
</>;
