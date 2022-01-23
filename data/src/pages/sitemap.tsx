import { Routeable, routeables } from "../router";

export function makeSitemap(): Routeable {
  return {
    route: '/sitemap.xml',
    get: (input) => ({
      body: <>
        {'<?xml version="1.0" encoding="UTF-8"?>\n'}
        <urlset
          {...{
            'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
            'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
            'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9",
          }}
        >{'\n'}
          {[...routeables]
            .filter((routeable) => !routeable.route.startsWith('/admin'))
            .map((routeable) => <>
              <url>{'\n'}
                <loc>https://www.immaculatalibrary.com{routeable.route}</loc>{'\n'}
                {(routeable.lastModifiedDate) && <>
                  <lastmod>{routeable.lastModifiedDate}</lastmod>{'\n'}
                </>}
              </url>{'\n'}
            </>)}{'\n'}
        </urlset>
      </>
    })
  };
}
