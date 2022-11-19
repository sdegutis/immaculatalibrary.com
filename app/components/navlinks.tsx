import { aboutPage } from "../routes/about/about";
import { audioBiblePage } from "../routes/audiobible/audiobible";
import { allBooksPage } from "../routes/books/all-books/all-books";
import { devotionsPage } from "../routes/devotions/devotions";
import { allMoviesPage } from "../routes/movies/all-movies/all-movies";
import { musicPage } from "../routes/music/music";
import { allSnippetsPage } from "../routes/snippets/all/snippets";
import { staticRouteFor } from "../util/static";
import { Container } from "./container/container";

export const Navlinks: JSX.Component<{}> = () => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['navlinks.css']!)} />
  <Container>
    <div id='navlinks-donate'>
      Dear reader, please donate Apple Cash (815-245-1625) if you can 😢 God bless you 🥲
    </div>
  </Container>
  <Container>
    <div id='navlinks'>
      <a href={aboutPage.route}>About</a>
      {' | '}
      <a href={allBooksPage.route}>Books</a>
      {' | '}
      <a href={allSnippetsPage.route}>Snippets</a>
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
</>;
