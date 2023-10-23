import * as path from 'path/posix';
import { isDev } from './helpers.js';
import { jsxToString } from './jsx-runtime.js';
import files from '/';

export const handlers = new Map<string, (body: string) => string>();
export const outfiles = new Map<string, Buffer | string>();

console.time('Building views');

const sitemapIdx = files.findIndex((file) => file.path === '/sitemap.xml.tsx');
const sitemap = files[sitemapIdx]!;
files.splice(sitemapIdx, 1);
files.push(sitemap);

for (const { path: filepath, content } of files) {
  if (!isDev && filepath.startsWith('/admin/')) continue;

  if (filepath.endsWith('.tsx')) {
    if (filepath.includes('.html') || filepath.includes('.json')) {
      const dir = path.dirname(filepath);
      const exported = require(filepath).default;

      if (Array.isArray(exported)) {
        for (const [name, jsx] of exported) {
          outfiles.set(path.join(dir, name), jsxToString(jsx as JSX.Element));
        }
      }
      else {
        outfiles.set(filepath.slice(0, -4), jsxToString(exported as JSX.Element));
      }
    }
  }
  else if (!filepath.endsWith('.ts') && !filepath.endsWith('.md')) {
    outfiles.set(filepath, content);
  }
}

console.timeEnd('Building views');
