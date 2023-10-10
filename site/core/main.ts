import path from 'path/posix';
import resources from '../components/';
import { isDev } from './helpers';
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
          outfiles.set(path.join(dir, name), (jsx as JSX.Element).stringify());
        }
      }
      else {
        outfiles.set(filepath.slice(0, -4), (exported as JSX.Element).stringify());
      }
    }
  }
  else if (!filepath.endsWith('.ts') && !filepath.endsWith('.md')) {
    outfiles.set(filepath, content);
  }
}

for (const { path: outpath, content } of resources) {
  if (!outpath.match(/\.tsx?$/)) {
    outfiles.set(outpath, content);
  }
}

console.timeEnd('Building views');