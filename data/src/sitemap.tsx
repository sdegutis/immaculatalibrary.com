// sitemap.xml

() => <>
  {'<?xml version="1.0" encoding="UTF-8"?>\n'}
  <urlset
    {...{
      'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
      'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
      'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9",
    }}
  >{'\n'}
    {Object.values($site.items)
      .filter(item => item.$route?.() && !item.$route().startsWith('/admin'))
      .map(item => <>
        <url>{'\n'}
          <loc>https://www.immaculatalibrary.com{item.$route()}</loc>{'\n'}
          {(item.date || item.dateAdded) && <>
            <lastmod>{item.date || item.dateAdded}</lastmod>{'\n'}
          </>}
        </url>{'\n'}
      </>)}{'\n'}
  </urlset>
</>