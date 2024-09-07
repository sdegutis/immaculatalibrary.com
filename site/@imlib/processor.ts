import { processFile, SiteProcessor } from "@imlib/core";
import { extname } from "path";
import { isDev } from "../components/admin.js";
import { makeSitemap } from "../sitemap.js";

const contentProcessors: Record<string, (s: any) => string> = {
  '.html': hoistHtml,
  '.json': JSON.stringify,
};

function hoistHtml(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}

function processContent(content: any, ext: string) {
  const fn = contentProcessors[ext];
  return fn ? fn(content) : content;
}

export default (({ inFiles, outFiles }) => {
  for (const file of inFiles) {
    if (
      (file.path.startsWith('/admin/') && !isDev) ||
      (file.path.startsWith('/data/')) ||
      (file.path.startsWith('/model/'))
    ) continue;

    for (const { path, content } of processFile(file)) {
      outFiles.set(path, processContent(content, extname(path)));
    }
  }

  outFiles.set('/sitemap.xml', makeSitemap(outFiles.keys()));
}) as SiteProcessor;
