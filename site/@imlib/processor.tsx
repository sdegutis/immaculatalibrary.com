import { processSite, SiteProcessor } from "@imlib/core";
import { makeSitemap } from "../sitemap.js";

export default ((files) => {
  const out = processSite(files);
  out.delete('/sitemap.js');
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
