import * as fs from "fs";
import * as path from "path";
import 'source-map-support/register';
import * as sucrase from 'sucrase';
import vm from 'vm';


class Dir {

  files: File[] = [];
  dirs: Dir[] = [];
  entries: (File | Dir)[] = [];

  constructor(
    public name: string,
    public parent: Dir | null,
  ) { }

}

class File {

  constructor(
    public name: string,
    public parent: Dir | null,
    public buffer: Buffer,
  ) { }

  function: Function | null = null;

}

const context = vm.createContext({
  console,
});

function fakeRequire(...args: any[]) {
  console.log({ args });
}

function loadDir(base: string, parent: Dir | null) {
  const files = fs.readdirSync(base);

  const dir = new Dir(path.basename(base), parent);

  for (const name of files) {
    if (name.startsWith('.')) continue;

    const fullpath = path.join(base, name);
    const stat = fs.statSync(fullpath);

    if (stat.isDirectory()) {
      const child = loadDir(fullpath, dir);
      dir.dirs.push(child);
      dir.entries.push(child);
    }
    else if (stat.isFile()) {
      const buffer = fs.readFileSync(fullpath);

      const child = new File(name, dir, buffer);
      dir.files.push(child);
      dir.entries.push(child);

      if (name.endsWith('.tsx')) {
        const rawCode = child.buffer.toString('utf8');

        const { code } = sucrase.transform(rawCode, {
          jsxPragma: 'JSX.createElement',
          jsxFragmentPragma: 'JSX.fragment',
          transforms: ['jsx', 'typescript', 'imports'],
          disableESTransforms: true,
          production: true,
        });

        const fakeModule = {
          exports: Object.create(null),
        };

        child.function = vm.compileFunction(code, ['require', 'exports'], {
          filename: fullpath,
          parsingContext: context,
        });

        if (name === 'c.tsx') {
          console.log(code);
          child.function(fakeRequire, fakeModule.exports);

          console.log(fakeModule.exports.default(3))
          console.log(fakeModule.exports.default(9))
        }
      }

    }
  }

  return dir;
}

const root = loadDir('foo', null);

// console.dir(root, { depth: null });



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
