export default (root: FsDir) => {
  const files = getFiles(root);

  return <>
    {'<?xml version="1.0" encoding="UTF-8"?>\n'}
    <urlset
      {...{
        'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
        'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
        'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9",
      }}
    >
      {[...files].map((file) => {
        const date = file.name.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
        return <>
          <url>
            <loc>https://www.immaculatalibrary.com{file.path}</loc>
            {date && <lastmod>{date}</lastmod>}
          </url>
        </>;
      })}
    </urlset>
  </>;
};

function getFiles(dir: FsDir): FsFile[] {
  return [...dir.files, ...dir.dirs.flatMap(getFiles)];
}
