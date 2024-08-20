import { processSite, SiteProcessor } from "@imlib/core";
import { isDev } from "../components/admin.js";
import { makeSitemap } from "../sitemap.js";

export default ((files) => {
  const out = processSite(files
    .filter(f => !f.path.startsWith('/admin/') || isDev)
    .filter(f => !f.path.startsWith('/data/'))
    .filter(f => !f.path.startsWith('/model/')));
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
