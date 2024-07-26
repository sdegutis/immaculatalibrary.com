import * as path from 'path/posix';
import files from '/';

const isDev = !!process.env['DEV'];

export const outfiles = new Map<string, Buffer | string>();

const ARRAY_FILE_REGEX = /\[.+\]/;

const extFns = {
  html: hoist,
  json: JSON.stringify,
};

for (const { path, content } of files) {
  if (!isDev && path.startsWith('/admin/')) continue;

  let match;
  if (match = path.match(/\.(.+)\.js$/)) {
    const ext = match[1] as keyof typeof extFns;
    const process = extFns[ext] ?? ((s: string) => s);

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
  else {
    if (path.endsWith('.md')) {
      // skip
    }
    else if (path.endsWith('.js') && !path.includes('$')) {
      // skip
    }
    else {
      outfiles.set(path, content);
    }
  }
}

outfiles.set('/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  >
    ${[...outfiles.keys()].filter(filepath => filepath.endsWith('.html')).map(filepath => {
    const name = path.basename(filepath);
    const date = name.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
    return `
        <url>
          <loc>https://www.immaculatalibrary.com${filepath}</loc>
          ${date ? `<lastmod>${date}</lastmod>` : ''}
        </url>
      `;
  }).join('')}
  </urlset>`
);

function hoist(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}
