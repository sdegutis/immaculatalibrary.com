import chokidar from 'chokidar';
import express from 'express';
import { mkdirSync, writeFileSync } from 'fs';
import 'source-map-support/register';
import { URL, URLSearchParams } from 'url';
import { FileSys } from './filesys';
import { RouteHandler } from './http';
import { jsxCreateStringifiedElement } from "./jsx-stringify";
import { Runtime } from "./runtime";
import Yaml from 'js-yaml';


const items: any[] = (Object.entries<any>(
  require('../imlib-backup-2022-01-18T13_31_41.688Z.json'))
  .map(([$id, data]) => ({ $id, ...data }))
);

function importPublic() {
  const staticItems = items.filter(it => !it.$boot && it.$type === '73c941de-a7e9-4bce-98b1-9bb59ef57b65');
  for (const item of staticItems) {
    const buffer = Buffer.from(item.content, item.base64 ? 'base64' : 'utf8');
    writeFileSync('data/public/' + item.path, buffer);
  }
}

function importMovies() {
  const movieItems = (items
    .filter(it => it.$type === '10a9ab1a-0665-4905-8c5c-2410739a7ad8')
    .sort((a, b) =>
      a.sortOrder < b.sortOrder ? -1 :
        a.sortOrder > b.sortOrder ? 1 :
          0));
  console.log(movieItems.map(it => it.slug));
  for (const item of movieItems) {
    // console.log('hmm')
    // const buffer = Buffer.from(item.content, item.base64 ? 'base64' : 'utf8');
    const header = Yaml.dump({
      title: item.title,
      shortTitle: item.shortTitle,
      year: item.year,
      imageFilename: item.imageFilename,
    }, {
      forceQuotes: true,
    });
    writeFileSync(`data/data/movies/${item.slug}.md`, `---\n${header}---\n\n${item.description}`);
  }
}

// importPublic();
// importMovies();

// const staticItems = items.filter(it => !it.$boot && it.$type === '73c941de-a7e9-4bce-98b1-9bb59ef57b65');
// console.log(staticItems.length)
// console.log(snippets.length)

process.exit(0);

class Site {

  handler!: RouteHandler;
  #filesys = new FileSys('data');
  #runtime: Runtime | undefined;

  constructor() {
    this.build();
  }

  build() {
    console.log('Building site');
    const root = this.#filesys.load();

    this.#runtime?.shutdown();
    this.#runtime = new Runtime(root, jsxCreateStringifiedElement);

    const boot = this.#runtime.findModule('/src/boot')!;

    try {
      boot.require();
      this.handler = boot.exports.routeHandler;
    }
    catch (e) {
      console.error(e);
    }
  }

}

const site = new Site();

let timeout: NodeJS.Timeout | null = null;
chokidar.watch('data/src', { ignoreInitial: true }).on('all', (e, p) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    site.build();
  }, 100);
});

const baseUrl = 'https://www.immaculatalibrary.com/';
const port = 8080;
const server = express();
server.set('trust proxy', 1);
server.set('query parser', (s: string) => new URLSearchParams(s ?? ''));
server.use(express.raw({ type: '*/*', limit: '100mb' }));

server.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path !== '/') {
    res.redirect(req.path.slice(0, -1));
    return;
  }

  const output = site.handler({
    body: req.body,
    headers: req.headers,
    method: req.method,
    url: new URL(req.url, baseUrl),
  });

  res.status(output.status ?? 200);
  res.set(output.headers ?? {});
  res.end(output.body ?? '');
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
