import * as immaculata from 'immaculata'
// import { makeSitemap } from './site/sitemap.js'

const isDev = process.argv[2] !== 'generate'

const tree = new immaculata.LiveTree('site', import.meta.url)

tree.enableModules(immaculata.transformModuleJsxToStrings)


export const handlers = new Map<string, (body: string) => string>()

async function processSite() {
  return tree.processFiles(async files => {

    if (!isDev) files.with('^/admin/')
    files.with('^/data/')
    files.with('^/model/')

    const singleDynFile = /\..+(?<ext>\.tsx?)$/
    await files.with(singleDynFile).doAsync(async file => {
      const match = file.path.match(singleDynFile)!
      const exports = await import('./site' + file.path)
      const o = exports.default
      file.path = file.path.slice(0, -match.groups!["ext"]!.length)
      file.text = typeof o === 'string' ? o : JSON.stringify(o)
    })

    const arrayDynFile = /\/.*(?<slug>\[.+\]).*\..+(?<ext>\.tsx?)$/
    await files.with(arrayDynFile).doAsync(async file => {
      const match = file.path.match(arrayDynFile)!
      const exports = await import('./site' + file.path)
      const array = exports.default as [string, any][]
      files.del(file.path)

      for (const [name, obj] of array) {
        const filepath = file.path.replace(match.groups!["slug"]!, name)
        files.add(filepath.slice(0, -match.groups!["ext"]!.length), '', obj)
      }
    })

    files.with('\.html$').do(file => file.text = hoistHeaders(file.text))


    const importmap = `
      <script type="importmap">{
        "imports": {
          "markdown-it": "https://cdn.jsdelivr.net/npm/markdown-it@latest/+esm",
          "eases": "https://cdn.jsdelivr.net/npm/eases@latest/+esm"
        }
      }</script>
    `
    files.with('\.html$').do(file => file.text = file.text.replace('<head>', `$&${importmap}`))

  })
}

if (isDev) {
  const server = new immaculata.DevServer(8080)
  server.handlers = handlers
  server.files = await processSite()

  tree.watch({
    ignored: (str) => str.endsWith('/site/api.d.ts')
  }, async (paths) => {
    const start = Date.now()
    server.files = await processSite()
    server.reload()
    console.log(`Time: ${Date.now() - start} ms`)
  })
}
else {
  immaculata.generateFiles(await processSite())
}


function hoistHeaders(content: string) {
  const hoisted = new Set<string>()
  return (content
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => { hoisted.add(s); return '' })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')))
}
