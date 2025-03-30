import * as immaculata from 'immaculata'
import { extname } from 'path'
// import { makeSitemap } from './site/sitemap.js'

const isDev = process.argv[2] !== 'generate'
const action = isDev ? immaculata.startDevServer : immaculata.generateFiles

const runtime = new immaculata.Runtime()

runtime.processor = (files) => {

  const outFiles: FsFile[] = []

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
  }

  const importmap = `
  <script type="importmap">{
    "imports": {
      "markdown-it": "https://cdn.jsdelivr.net/npm/markdown-it@latest/+esm",
      "eases": "https://cdn.jsdelivr.net/npm/eases@latest/+esm"
    }
  }</script>
  `

  function hoistHtml(jsx: string) {
    const hoisted = new Set<string>()
    return (jsx
      .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
        hoisted.add(s)
        return ''
      })
      .replace('<head>', `$&${importmap}`)
      .replace(/<\/head>/, [...hoisted, '</head>'].join('')))
  }

  function processContent(content: any, ext: string) {
    const fn = contentProcessors[ext]
    return fn ? fn(content) : content
  }

  for (const file of files) {
    if (
      (file.path.startsWith('/admin/') && !isDev) ||
      (file.path.startsWith('/data/')) ||
      (file.path.startsWith('/model/'))
    ) continue

    for (const { path, content } of immaculata.processFile(file)) {
      outFiles.push({ path, content: processContent(content, extname(path)) })
    }
  }

  // outFiles.set('/sitemap.xml', makeSitemap(outFiles.keys()))

  return outFiles

}

runtime.rebuildAll()

action(runtime)
