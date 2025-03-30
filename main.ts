import * as immaculata from 'immaculata'
// import { makeSitemap } from './site/sitemap.js'

const importmap = `
<script type="importmap">{
  "imports": {
    "markdown-it": "https://cdn.jsdelivr.net/npm/markdown-it@latest/+esm",
    "eases": "https://cdn.jsdelivr.net/npm/eases@latest/+esm"
  }
}</script>
`

function processJson(file: FsFile) {
  if (!file.path.endsWith('.json')) return
  file.content = JSON.stringify(file.content)
}

function processHtml(file: FsFile) {
  if (!file.path.endsWith('.html')) return

  const hoisted = new Set<string>()
  file.content = ((file.content as string)
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => { hoisted.add(s); return '' })
    .replace('<head>', `$&${importmap}`)
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')))
}

const isDev = process.argv[2] !== 'generate'
const action = isDev ? immaculata.startDevServer : immaculata.generateFiles

const runtime = new immaculata.Runtime()

runtime.processor = (files) => {
  files = files.filter(f => !f.path.startsWith('/admin/') || isDev)
  files = files.filter(f => !f.path.startsWith('/data/'))
  files = files.filter(f => !f.path.startsWith('/model/'))
  files = files.flatMap(immaculata.processFile)
  files.forEach(processJson)
  files.forEach(processHtml)
  // outFiles.set('/sitemap.xml', makeSitemap(outFiles.keys()))
  return files
}

runtime.rebuildAll()

action(runtime)
