import { processSite, SiteProcessor } from "@imlib/core";
import { isDev } from "../components/admin.js";
import { makeSitemap } from "../sitemap.js";

export default ((files) => {
  const out = processSite(files
    .filter(f => !f.path.startsWith('/admin/') || isDev)
    .filter(f => !f.path.endsWith('.md'))
    .filter(f => !f.path.match(/_.*\.js$/)));
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
