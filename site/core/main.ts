import * as path from 'path/posix';
import { handlers } from './handlers.js';
import { isDev } from './helpers.js';
import { outfiles } from './outfiles.js';
import files from '/';
export { handlers, outfiles };

const sitemapIdx = files.findIndex((file) => file.path === '/sitemap.xml.js');
const sitemap = files[sitemapIdx]!;
files.splice(sitemapIdx, 1);
files.push(sitemap);

for (const { path: filepath, content } of files) {
  if (!isDev && filepath.startsWith('/admin/')) continue;

  if (filepath.includes('.html') || filepath.includes('.xml') || filepath.includes('.json')) {
    const exported = require(filepath).default;
    if (filepath.match(/\[.+\]/)) {
      const dir = path.dirname(filepath);
      for (const [slug, jsx] of exported) {
        const filename = filepath.slice(0, -3).replace(/\[.+\]/, slug);
        outfiles.set(filename, hoist(jsx));
      }
    }
    else {
      outfiles.set(filepath.slice(0, -3), hoist(exported));
    }
  }
  else if (!filepath.endsWith('.md')) {
    outfiles.set(filepath, content);
  }
}

function hoist(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, ['<head>', ...hoisted].join('')));
}
