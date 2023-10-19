import { randomUUID } from "crypto";
import { generated } from "../core/generated";
import { Column } from "./column/column";

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

const cssId = `gen-${randomUUID()}`;
const newPath = generated('navlinks.css', () => css.replace(/ID/g, cssId));

export const Navlinks: JSX.Component<{ divider?: boolean }> = (attrs) => {
  return <>
    <Column>
      <link rel="stylesheet" href={newPath} />
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
