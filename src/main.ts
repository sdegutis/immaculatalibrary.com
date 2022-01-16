import chokidar from 'chokidar';
import 'dotenv/config';
import express from 'express';
import 'source-map-support/register';
import { URL, URLSearchParams } from 'url';
import { FileSys } from './lib/filesys';
import { jsxCreateStringifiedElement } from "./lib/jsx-stringify";
import { Runtime } from "./lib/runtime";

interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: { [name: Lowercase<string>]: string | string[] | undefined };
  body: Buffer;
}

interface RouteOutput {
  status?: number;
  headers?: object;
  body?: string | Buffer;
}

type RouteHandler = (input: RouteInput) => RouteOutput;


let handler: RouteHandler | undefined;

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

  if (!handler) return next();

  const output = handler({
    body: req.body,
    headers: req.headers,
    method: req.method,
    url: new URL(req.url, 'http://localhost:8080'),
  });

  res.status(output.status ?? 200);
  res.set(output.headers ?? {});
  res.end(output.body ?? '');
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});




const filesys = new FileSys('data');

const buildSite = () => {
  const root = filesys.load();

  const runtime = new Runtime(root, {
    jsxCreateElement: jsxCreateStringifiedElement,
  }, {
    console,
  });

  const boot = runtime.findModule('/src/boot')!;
  boot.require();

  handler = boot.exports.routeHandler;
};

let timeout: NodeJS.Timeout | null = null;
chokidar.watch('data/src').on('all', (e, p) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    buildSite();
  }, 100);
});


// const MarkdownIt = require('markdown-it');
// const markdown = new MarkdownIt({
//   html: true,
//   typographer: true,
//   linkify: true,
//   breaks: true,
// });



// const bcrypt = require('bcryptjs');
