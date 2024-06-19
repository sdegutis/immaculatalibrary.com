import * as crypto from 'crypto';
import { generated } from "../util/generated.js";
import { Column } from "./column.js";

const css = /*css*/`
  #ID {
    flex-wrap: wrap;
    margin: 2em 0;
  }
`;

const hash = crypto.createHash('md5').update(css).digest('hex');
const cssId = `gen-${hash}`;
const cssPath = generated(`navlinks-${hash}.css`, () => css.replace(/ID/g, cssId));

const links = {
  Home: { href: '/', title: 'Immaculata Library' },
  Books: { href: '/books.html', title: 'Books' },
  Fathers: { href: '/fathers.html', title: 'Fathers' },
  Movies: { href: '/movies.html', title: 'Movies' },
  Music: { href: '/music.html', title: 'Music' },
  Prayers: { href: '/prayers/', title: 'Prayers' },
  Articles: { href: '/articles.html', title: 'Articles' },
  Resources: { href: '/resources.html', title: 'Resources' },
};

export type NavPage = keyof typeof links;

export const Navlinks = (attrs: { page: NavPage }) => {
  return <>
    <Column>
      <link rel="stylesheet" href={cssPath} />
      <div id={cssId} class='tab-links'>
        {Object.entries(links).map(([name, link]) => (
          <a href={link.href} class={attrs.page === name ? 'active' : ''}>{link.title}</a>
        )).join(' ')}
      </div>
    </Column>
  </>;
};
