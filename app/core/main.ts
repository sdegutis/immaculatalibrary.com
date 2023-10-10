import path from 'path/posix';
import resources from '../components/';
import files from '../site/';
import { isDev } from './helpers';

export const out = new Map<string, Buffer | string>();

console.time('Building views');

const sitemapIdx = files.findIndex(([filepath, content]) => filepath === '/site/sitemap.xml.tsx');
const sitemap = files[sitemapIdx]!;
files.splice(sitemapIdx, 1);
files.push(sitemap);

for (const [filepath, contents] of files) {
  const outpath = filepath.slice('/site'.length);

  if (!isDev && outpath.startsWith('/admin/')) continue;

  if (filepath.endsWith('.tsx')) {
    const dir = path.dirname(outpath);
    const exported = require(filepath).default;

    if (Array.isArray(exported)) {
      for (const [name, jsx] of exported) {
        out.set(path.join(dir, name), (jsx as JSX.Element).stringify());
      }
    }
    else {
      out.set(outpath.slice(0, -4), (exported as JSX.Element).stringify());
    }
  }
  else {
    out.set(outpath, contents);
  }
}

for (const [outpath, contents] of resources) {
  if (!outpath.match(/\.tsx?$/)) {
    out.set(outpath, contents);
  }
}

console.timeEnd('Building views');

export default out;