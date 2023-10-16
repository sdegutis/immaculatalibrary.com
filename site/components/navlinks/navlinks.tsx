import { randomUUID } from "crypto";
import { generated } from "../../core/generated";
import { Column } from "../column/column";
import css from './navlinks.css';

const cssId = `gen-${randomUUID()}`;
const newPath = generated(css.path, () => css.content.toString('utf8').replace(/ID/g, cssId));

export const Navlinks: JSX.Component<{ divider?: boolean }> = (attrs) => {
  return <>
    <link rel="stylesheet" href={newPath} />
    <Column>
      <div id={cssId} class={attrs.divider ? 'divider' : ''}>
        <a href='/about.html'>About</a>{' | '}
        <a href='/books.html'>Books</a>{' | '}
        <a href='/movies.html'>Movies</a>{' | '}
        <a href='/articles.html'>Articles</a>{' | '}
        <a href='/music.html'>Music</a>{' | '}
        <a href='/bible.html'>Bible</a>{' | '}
        <a href='/devotions.html'>Prayers</a>
      </div>
    </Column>
  </>;
};
