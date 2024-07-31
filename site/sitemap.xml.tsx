import * as path from "path/posix";
import allFiles from '/';

const isDev = !!process.env['DEV'];
const ARRAY_FILE_REGEX = /\[.+\]/;

const paths: string[] = [];

for (const { path, content } of allFiles) {
  if (!isDev && path.startsWith('/admin/')) continue;

  let match;
  if (match = path.match(/\.(.+)\.js$/)) {
    const filepath = path.slice(0, -3);
    const exported = require(path).default;

    if (path.match(ARRAY_FILE_REGEX)) {
      for (const [slug, jsx] of exported) {
        const filename = filepath.replace(ARRAY_FILE_REGEX, slug);
        paths.push(filename);
      }
    }
    else {
      paths.push(filepath);
    }
  }
  else {
    if (path.endsWith('.md')) {
      // skip
    }
    else if (path.endsWith('.js') && !path.includes('$')) {
      // skip
    }
    else {
      paths.push(path);
    }
  }
}

export default <>
  {`<?xml version="1.0" encoding="UTF-8"?>`}
  <urlset
    {...{
      'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
      'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
      'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9"
    }}
  >
    {paths
      .filter(filepath => filepath.endsWith('.html'))
      .map(filepath => {
        const name = path.basename(filepath);
        const date = name.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
        return <url>
          <loc>https://www.immaculatalibrary.com{filepath}</loc>
          {date && <lastmod>{date}</lastmod>}
        </url>;
      })
    }
  </urlset>
</>;
