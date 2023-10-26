import * as path from 'path/posix';
import { handlers } from './handlers.js';
import { isDev } from './helpers.js';
import { jsxToString } from './jsx-runtime.js';
import { outfiles } from './outfiles.js';
import files from '/';
export { handlers, outfiles };

console.time('Building views');

const sitemapIdx = files.findIndex((file) => file.path === '/sitemap.xml.js');
const sitemap = files[sitemapIdx]!;
files.splice(sitemapIdx, 1);
files.push(sitemap);

for (const { path: filepath, content } of files) {
  if (!isDev && filepath.startsWith('/admin/')) continue;

  if (filepath.includes('.html') || filepath.includes('.xml') || filepath.includes('.json')) {
    const dir = path.dirname(filepath);
    const exported = (await import(filepath)).default;

    if (Array.isArray(exported)) {
      for (const [name, jsx] of exported) {
        outfiles.set(path.join(dir, name), jsxToString(jsx as JSX.Element));
      }
    }
    else {
      outfiles.set(filepath.slice(0, -3), jsxToString(exported as JSX.Element));
    }
  }
  else if (!filepath.endsWith('.md')) {
    outfiles.set(filepath, content);
  }
}

console.timeEnd('Building views');
