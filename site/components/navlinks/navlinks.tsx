import { Column } from "../column/column";
import css from './navlinks.css';

export const Navlinks: JSX.Component<{ divider?: boolean }> = (attrs) => <>
  <link rel="stylesheet" href={css.path} />
  <Column>
    <div id='navlinks' class={attrs.divider ? 'divider' : ''}>
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
