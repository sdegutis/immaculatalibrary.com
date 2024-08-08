import { processSite, SiteProcessor } from "@imlib/core";
import { makeSitemap } from "../sitemap.xml.js";

export default ((files) => {
  const out = processSite(files);
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
