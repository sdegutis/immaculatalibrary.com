import path from 'path/posix';
import { out } from "./core/main";

export default <>
  {'<?xml version="1.0" encoding="UTF-8"?>\n'}
  <urlset {...{
    'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
    'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
    'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9",
  }}>
    {[...out.keys()].filter(filepath => filepath.endsWith('.html')).map(filepath => {
      const name = path.basename(filepath);
      const date = name.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
      return <>
        <url>
          <loc>https://www.immaculatalibrary.com{filepath}</loc>
          {date && <lastmod>{date}</lastmod>}
        </url>
      </>;
    })}
  </urlset>
</>;
