import { Column } from "./column";

export const Navlinks: JSX.Component<{}> = () => <>
  <link rel="stylesheet" href='/css/navlinks.css' />
  <Column>
    <div id='navlinks'>
      <a href='/about.html'>About</a>{' | '}
      <a href='/books.html'>Books</a>{' | '}
      <a href='/movies.html'>Movies</a>{' | '}
      <a href='/articles.html'>Articles</a>{' | '}
      <a href='/music.html'>Music</a>{' | '}
      <a href='/audio-bible.html'>Audio Bible</a>{' | '}
      <a href='/devotions.html'>Devotions</a>
    </div>
  </Column>
</>;
