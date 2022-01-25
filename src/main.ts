import chokidar from 'chokidar';
import 'dotenv/config';
import express from 'express';
import 'source-map-support/register';
import { URL, URLSearchParams } from 'url';
import { FileSys, FsFile } from './filesys';
import { RouteHandler } from './http';
import { jsxCreateStringifiedElement } from "./jsx-stringify";
import { Runtime } from "./runtime";

class Site {

  handler!: RouteHandler;
  #filesys = new FileSys('data');
  #runtime: Runtime | undefined;
  persisted = Object.create(null);

  constructor() {
    this.build();
  }

  build() {
    console.log('Building site');
    const root = this.#filesys.load();

    this.#runtime?.shutdown();
    this.#runtime = new Runtime(this.persisted, root, jsxCreateStringifiedElement);

    const mainFile = root.find('/src/main')! as FsFile;
    const mainModule = this.#runtime.modules.get(mainFile)!;

    this.#runtime.context['restartSite'] = restartSite;

    try {
      console.log('Loading boot module...');
      mainModule.require();
      console.log('Done');
      this.handler = mainModule.exports.routeHandler;
    }
    catch (e) {
      console.error(e);
    }
  }

}

const site = new Site();

function restartSite() {
  console.log('restartSite(): starting...');
  site.build();
  console.log('restartSite(): done');
}

let timeout: NodeJS.Timeout | null = null;
chokidar.watch('data/src', { ignoreInitial: true }).on('all', (e, p) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(restartSite, 100);
});

const baseUrl = process.env['BASE_URL'];
const server = express();
server.set('trust proxy', 1);
server.set('query parser', (s: string) => new URLSearchParams(s ?? ''));
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

server.listen(8080, () => {
  console.log(`Running on http://localhost:8080`);
});
