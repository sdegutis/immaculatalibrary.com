import { processFile, SiteProcessor } from "immaculata";
import { extname } from "path";
import { isDev } from "../components/admin.js";
import { makeSitemap } from "../sitemap.js";

export default (({ inFiles, outFiles }) => {

  const files = [...inFiles]

  // console.log(files
  //   .map(f => f.module?.imports)
  //   .filter(imps => imps !== undefined)
  //   .flatMap(imps => [...imps])
  //   .filter(imp => !imp.match(/(^[./])|(!$)|^immaculata$/))
  //   .filter(imp => !builtinModules.includes(imp))
  // )

  const contentProcessors: Record<string, (s: any) => string> = {
    '.html': hoistHtml,
    '.json': JSON.stringify,
  };

  const importmap = `
  <script type="importmap">{
    "imports": {
      "markdown-it": "https://cdn.jsdelivr.net/npm/markdown-it@latest/+esm",
      "eases": "https://cdn.jsdelivr.net/npm/eases@latest/+esm"
    }
  }</script>
  `

  function hoistHtml(jsx: string) {
    const hoisted = new Set<string>();
    return (jsx
      .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
        hoisted.add(s);
        return '';
      })
      .replace(/<\/head>/, [...hoisted, importmap, '</head>'].join('')));
  }

  function processContent(content: any, ext: string) {
    const fn = contentProcessors[ext];
    return fn ? fn(content) : content;
  }

  for (const file of files) {
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
