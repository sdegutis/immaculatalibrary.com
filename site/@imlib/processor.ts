import { defaultProcessors, Processor, processSite, SiteProcessor, skip } from "@imlib/core";
import { makeSitemap } from "../sitemap.xml.js";
import { isDev } from "../util/_helpers.js";

export default ((files) => {
  const processors: Processor[] = [
    !isDev ? [/^\/admin\//, skip] as Processor : null,
    [/\.md$/, skip] as Processor,
    [/_.*\.js$/, skip] as Processor,
    ...defaultProcessors,
  ].filter(p => !!p);

  const out = processSite(files, processors);
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;
