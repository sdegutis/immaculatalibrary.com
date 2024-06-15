import { handlers } from './handlers.js';
import { isDev } from './helpers.js';
import { outfiles } from './outfiles.js';
import files from '/';
export { handlers, outfiles };

const sitemapIdx = files.findIndex((file) => file.path === '/sitemap.xml.js');
const sitemap = files[sitemapIdx]!;
files.splice(sitemapIdx, 1);
files.push(sitemap);

const ARRAY_FILE_REGEX = /\[.+\]/;

const extFns = {
  html: hoist,
  json: JSON.stringify,
  xml: (s: string) => s,
};

for (const { path, content } of files) {
  if (!isDev && path.startsWith('/admin/')) continue;

  let match;
  if (match = path.match(/\.(.+)\.js$/)) {
    const ext = match[1] as keyof typeof extFns;
    const process = extFns[ext];

    const filepath = path.slice(0, -3);
    const exported = require(path).default;

    if (path.match(ARRAY_FILE_REGEX)) {
      for (const [slug, jsx] of exported) {
        const filename = filepath.replace(ARRAY_FILE_REGEX, slug);
        outfiles.set(filename, process(jsx));
      }
    }
    else {
      outfiles.set(filepath, process(exported));
    }
  }
  else if (!path.endsWith('.md')) {
    outfiles.set(path, content);
  }
}

function hoist(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}
