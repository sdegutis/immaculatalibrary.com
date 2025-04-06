import { transformSync } from '@swc/core'
import { randomUUID } from 'crypto'
import * as immaculata from 'immaculata'
import { registerHooks } from 'module'
import { handlers, tree } from './data.ts'

const isDev = process.argv[2] !== 'generate'

registerHooks(tree.moduleHook())
registerHooks(immaculata.tryTsTsxJsxModuleHook)
registerHooks(immaculata.jsxRuntimeModuleHook('immaculata/dist/jsx-strings.js'))
registerHooks(immaculata.compileJsxTsxModuleHook((source, url) => transformSync(source, {
  isModule: true,
  filename: url.replace(/\?ver=\d+$/, ''),
  sourceMaps: 'inline',
  jsc: {
    keepClassNames: true,
    target: 'esnext',
    parser: url.match(/\.tsx(\?|$)/)
      ? { syntax: 'typescript', tsx: true, decorators: true }
      : { syntax: 'ecmascript', jsx: true, decorators: true },
    transform: {
      react: {
        throwIfNamespace: false,
        runtime: 'automatic'
      },
    },
  },
}).code))


async function processSite() {
  return tree.processFiles(async files => {

    if (!isDev) files.with('^/admin/').remove()
    files.with(/\.d\.ts$/).remove()
    files.with('^/data/').remove()
    files.with('^/model/').remove()

    files.with('/sitemap.tsx').remove()

    const singleDynFile = /\..+(?<ext>\.tsx?)$/
    const arrayDynFile = /\/.*(?<slug>\[.+\]).*\..+(?<ext>\.tsx?)$/

    await files.with(arrayDynFile).doAsync(async file => {
      const match = file.path.match(arrayDynFile)!
      const exports = await import('./site' + file.path)
      const array = exports.default as [string, any][]
      files.del(file.path)

      for (const [name, obj] of array) {
        const filepath = file.path.replace(match.groups!["slug"]!, name)
        const realpath = filepath.slice(0, -match.groups!["ext"]!.length)
        files.add(realpath, realpath.endsWith('.json') ? JSON.stringify(obj) : obj)
      }
    })

    await files.with(singleDynFile).doAsync(async file => {
      const match = file.path.match(singleDynFile)!
      const exports = await import('./site' + file.path)
      const o = exports.default
      file.path = file.path.slice(0, -match.groups!["ext"]!.length)
      file.text = typeof o === 'string' ? o : JSON.stringify(o)
    })

    files.with('\.html$').do(file => file.text = hoistHeaders(file.text))

    files.with(/\.tsx?$/).do(file => {
      const placeholder = randomUUID()
      file.text = transformSync(file.text, {
        isModule: true,
        filename: file.path,
        sourceMaps: 'inline',
        jsc: {
          keepClassNames: true,
          target: 'esnext',
          parser: { syntax: 'typescript', tsx: true, decorators: true },
          transform: {
            react: { runtime: 'automatic', importSource: placeholder },
          },
        },
      }).code
      file.text = file.text.replace(`${placeholder}/jsx-runtime`, '/util/jsx-runtime.js')
      file.path = file.path.replace(/\.tsx?$/, '.js')
    })

    const importmap = `
      <script type="importmap">{
        "imports": {
          "markdown-it": "https://cdn.jsdelivr.net/npm/markdown-it@latest/+esm",
          "eases": "https://cdn.jsdelivr.net/npm/eases@latest/+esm"
        }
      }</script>
    `
    files.with('\.html$').do(file => file.text = file.text.replace('<head>', `$&${importmap}`))

    const sitemapFn = await import('./site/sitemap.js')
    files.add('/sitemap.xml', sitemapFn.makeSitemap(files.paths()))

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
