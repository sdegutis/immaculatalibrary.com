import chokidar from 'chokidar';
import 'source-map-support/register';
import { jsxCreateStringifiedElement } from "./lib/jsx-stringify";
import { Runtime } from "./lib/runtime";
import { LocalFs } from './lib/vfs';

const filesys = new LocalFs('data');

const buildSite = () => {
  const root = filesys.load();

  const runtime = new Runtime(root, {
    jsxCreateElement: jsxCreateStringifiedElement,
  }, {
    console,
  });

  const boot = runtime.findAbsoluteModule('/src/a.tsx')!;
  boot.require();
  console.log(boot.exports.foo(3));
  console.log(boot.exports.foo(9));
};

let timeout: NodeJS.Timeout | null = null;
chokidar.watch('data/src').on('all', (e, p) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    buildSite();
  }, 100);
});




// const purity = require('@puritylib/purity');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const cookieSession = require('cookie-session');
// const express = require('express');
// const MarkdownIt = require('markdown-it');
// const { URLSearchParams } = require('url');
// const util = require('util');

// const fs = require('fs');
// const boot = fs.readFileSync('bootstrapper.tsx', 'utf8');
// const html = fs.readFileSync('bootstrapper.html', 'utf8');
// const js = fs.readFileSync('bootstrapper.js', 'utf8');
// fs.writeFileSync('data.json', JSON.stringify({
//   "ee7f907b-9324-4ab9-bca7-6ece08b57ab4": {
//     "$$boot": { "$$eval": boot },
//     "html": html,
//     "js": js,
//   }
// }));

// dotenv.config();

// const port = 8080;

// const server = express();

// server.set('trust proxy', 1);

// server.set('query parser', (s) => new URLSearchParams(s ?? ''));

// server.use(express.raw({ type: '*/*', limit: '100mb' }));

// server.use((req, res, next) => {
//   if (req.path.endsWith('/') && req.path !== '/')
//     res.redirect(req.path.slice(0, -1));
//   else
//     next();
// });

// server.use(cookieSession({
//   secret: process.env['COOKIE_SECRET'],
//   httpOnly: true,
// }));

// const markdown = new MarkdownIt({
//   html: true,
//   typographer: true,
//   linkify: true,
//   breaks: true,
// });

// const db = new purity.JsonFileDatabase('data.json');

// // const db = new purity.S3Database('imlibv3');
// // db.saveRegularly();

// const app = new purity.App(db, {
//   util,
//   JSON,
//   console,
//   markdown,
//   bcrypt,
//   Buffer,
// });

// server.use((req, res) => {
//   app.handleRequest({
//     body: req.body,
//     headers: req.headers,
//     method: req.method,
//     url: new URL(req.url, 'http://localhost:8080'),
//   }).then(output => {
//     res.status(output.status ?? 200);
//     res.set(output.headers ?? {});
//     res.end(output.body ?? '');
//   });
// });

// app.start().then(() => {

//   server.listen(port, () => {
//     console.log(`Running on http://localhost:${port}`);
//   });

// });
