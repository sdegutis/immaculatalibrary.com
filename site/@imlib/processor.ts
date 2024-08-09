import { defaultProcessors, processSite, SiteProcessor, skip } from "@imlib/core";
import { makeSitemap } from "../sitemap.xml.js";

export default ((files) => {
  const processors = [...defaultProcessors];

  if (!process.env['DEV']) {
    processors.unshift([/^\/admin\//, skip]);
  }

  const out = processSite(files, processors);
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
