import chokidar from 'chokidar';
import express from 'express';
import 'source-map-support/register';
import { URL, URLSearchParams } from 'url';
import { File, FileSys } from './filesys';
import { RouteHandler } from './http';
import { jsxCreateStringifiedElement } from "./jsx-stringify";
import { Runtime } from "./runtime";

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

    const bootFile = root.find('/src/boot')! as File;
    const boot = this.#runtime.modules.get(bootFile)!;

    try {
      console.log('Loading boot module...');
      boot.require();
      console.log('Done');
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
server.disable('x-powered-by');

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
