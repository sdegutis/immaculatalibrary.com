import { processSite, SiteProcessor } from "@imlib/core";
import { makeSitemap } from "../sitemap.xml.js";
import { isDev } from "../util/_helpers.js";

export default ((files) => {
  const out = processSite(files
    .filter(f => !f.path.startsWith('/admin/') || isDev)
    .filter(f => !f.path.endsWith('.md'))
    .filter(f => !f.path.match(/_.*\.js$/)));
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
