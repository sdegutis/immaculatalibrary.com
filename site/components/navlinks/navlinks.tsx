import { randomUUID } from "crypto";
import { outfiles } from "../../core/main";
import { Column } from "../column/column";
import css from './navlinks.css';

const newPath = `/generated` + css.path;
const cssId = `gen-${randomUUID()}`;
const str = css.content.toString('utf8').replace(/ID/g, cssId);
const content = Buffer.from(str);
outfiles.set(newPath, content);

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
