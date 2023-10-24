import * as crypto from 'crypto';
import { generated } from "../core/generated.js";
import { Column } from "./column.jsx";

const css = /*css*/`
  #ID {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    margin: 2em 0;
  }

  #ID.divider {
    padding-bottom: 2em;
    border-bottom: 1px solid var(--border-color);
  }
`;

const hash = crypto.createHash('md5').update(css).digest('hex');
const cssId = `gen-${hash}`;
const cssPath = generated(`navlinks-${hash}.css`, () => css.replace(/ID/g, cssId));

export const Navlinks: JSX.Component<{ divider?: boolean }> = (attrs) => {
  return <>
    <Column>
      <link rel="stylesheet" href={cssPath} />
      <div id={cssId} class={attrs.divider ? 'divider' : ''}>
        <a href='/'>Immaculata Library</a> { }
        <a href='/books.html'>Books</a> { }
        <a href='/snippets.html'>Snippets</a>
        <a href='/movies.html'>Movies</a> { }
        <a href='/articles.html'>Articles</a> { }
        <a href='/music.html'>Music</a> { }
        <a href='/bible.html'>Bible</a> { }
        <a href='/devotions.html'>Prayers</a> { }
      </div>
    </Column>
  </>;
};
