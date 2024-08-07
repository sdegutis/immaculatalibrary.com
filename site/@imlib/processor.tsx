import { processSite, SiteProcessor } from "@imlib/core";
import * as path from "path/posix";

export default ((files) => {
  const out = processSite(files);
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;

function makeSitemap(paths: Iterable<string>) {
  return <>
    {`<?xml version="1.0" encoding="UTF-8"?>`}
    <urlset
      {...{
        'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
        'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
        'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9"
      }}
    >
      {[...paths]
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
  </> as string;
}
