import * as immaculata from 'immaculata'
// import { makeSitemap } from './site/sitemap.js'

const isDev = process.argv[2] !== 'generate'

const runtime = new immaculata.Runtime()

runtime.processor = (files) => {
  files = files.filter(f => !f.path.startsWith('/admin/') || isDev)
  files = files.filter(f => !f.path.startsWith('/data/'))
  files = files.filter(f => !f.path.startsWith('/model/'))
  files = files.flatMap(immaculata.processFile)
  files.filter(f => f.path.endsWith('.json')).forEach(f => f.content = JSON.stringify(f.content))
  files.filter(f => f.path.endsWith('.html')).forEach(f => f.content = hoistHeaders(f.content as string))

  const importmap = `
<script type="importmap">{
  "imports": {
    "markdown-it": "https://cdn.jsdelivr.net/npm/markdown-it@latest/+esm",
    "eases": "https://cdn.jsdelivr.net/npm/eases@latest/+esm"
  }
}</script>
`

  files.filter(f => f.path.endsWith('.html')).forEach(f => f.content = (f.content as string).replace('<head>', `$&${importmap}`))
  // outFiles.set('/sitemap.xml', makeSitemap(outFiles.keys()))
  return files
}

runtime.rebuildAll()

if (isDev) {
  process.env['DEV'] = '1'
  immaculata.startDevServer(runtime)
}
else {
  immaculata.generateFiles(runtime)
}

function hoistHeaders(content: string) {
  const hoisted = new Set<string>()
  return (content
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => { hoisted.add(s); return '' })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')))
}
