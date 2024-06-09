import * as crypto from 'crypto';
import { generated } from "../core/generated.js";
import { Column } from "./column.js";

const css = /*css*/`
  #ID {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    margin: 2em 0;
  }
`;

const hash = crypto.createHash('md5').update(css).digest('hex');
const cssId = `gen-${hash}`;
const cssPath = generated(`navlinks-${hash}.css`, () => css.replace(/ID/g, cssId));

export const Navlinks = () => {
  return <>
    <Column>
      <link rel="stylesheet" href={cssPath} />
      <div id={cssId}>
        <a href='/'>Immaculata Library</a> { }
        <a href='/books.html'>Books</a> { }
        <a href='/movies.html'>Movies</a> { }
        <a href='/articles.html'>Articles</a> { }
        <a href='/music.html'>Music</a> { }
        <a href='/prayers/'>Prayers</a> { }
        <a href='/resources.html'>Resources</a> { }
      </div>
    </Column>
  </>;
};
