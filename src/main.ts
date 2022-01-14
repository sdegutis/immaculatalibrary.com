import * as fs from "fs";
import * as path from "path";
import 'source-map-support/register';
import * as sucrase from 'sucrase';
import vm from 'vm';


class Module {

  public exports = Object.create(null);
  private ran = false;

  constructor(
    private file: File,
    private runtime: Runtime,
  ) { }

  run() {
    if (!this.ran) {
      const rawCode = this.file.buffer.toString('utf8');
      const { code } = sucrase.transform(rawCode, {
        jsxPragma: 'JSX.createElement',
        jsxFragmentPragma: 'JSX.fragment',
        transforms: ['jsx', 'typescript', 'imports'],
        disableESTransforms: true,
        production: true,
      });

      const args = {
        require: (path: string) => this.require(path),
        exports: this.exports,
        __dir: this.file.parent!,
      };

      const runModule = vm.compileFunction(code, Object.keys(args), {
        filename: this.file.path,
        parsingContext: this.runtime.context,
      });

      runModule(...Object.values(args));
      this.ran = true;
    }
    return this.exports;
  }

  private require(toPath: string) {
    const destPath = path.join(this.file.path, toPath);
    const mod = this.runtime.findModuleFromRoot(destPath);
    if (!mod) {
      throw new Error(`Can't find module at path: ${destPath}`);
    }
    mod.run();
    return mod.exports;
  }

}

class Dir {

  files: { [name: string]: File } = Object.create(null);
  subdirs: { [name: string]: Dir } = Object.create(null);
  entries: { [name: string]: File | Dir } = Object.create(null);

  constructor(
    public path: string,
    public name: string,
    public parent: Dir | null,
  ) { }

}

class File {

  constructor(
    public path: string,
    public name: string,
    public parent: Dir | null,
    public buffer: Buffer,
  ) { }

  module: Module | null = null;

}

interface Sandbox {
  JSX?: {
    createElement: (tag: string | Function | Symbol, attrs: any, ...children: any[]) => any,
    fragment: Symbol,
  },
  [global: string]: any;
}

class Runtime {

  context;
  constructor(public root: Dir, sandbox: Sandbox) {
    this.context = vm.createContext(sandbox);
    this.createModules(root);
  }

  findModuleFromRoot(destPath: string) {
    if (!destPath.endsWith('.tsx')) destPath += '.tsx';

    let dir: Dir = this.root;
    const parts = destPath.split(path.sep);
    let part: string | undefined;

    while (part = parts.shift()) {
      if (parts.length === 0) {
        const file = dir.files[part];
        if (file && file.module) {
          return file.module;
        }
      }
      else {
        const subdir = dir.subdirs[part];
        if (subdir) {
          dir = subdir;
        }
      }
    }

    return null;
  }

  createModules(dir: Dir) {
    for (const subdir of Object.values(dir.subdirs)) {
      this.createModules(subdir);
    }

    for (const file of Object.values(dir.files)) {
      if (file.name.endsWith('.tsx')) {
        file.module = new Module(file, this);
      }
    }
  }

}

class FsLoader {

  constructor(private fsBase: string) { }

  load() {
    return this.loadDir('', null);
  }

  loadDir(base: string, parent: Dir | null) {
    const files = fs.readdirSync(path.join(this.fsBase, base));

    const dir = new Dir(base, path.basename(base), parent);

    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fullpath = path.join(this.fsBase, base, name);
      const stat = fs.statSync(fullpath);

      if (stat.isDirectory()) {
        const child = this.loadDir(path.join(base, name), dir);
        dir.subdirs[name] = child;
        dir.entries[name] = child;
      }
      else if (stat.isFile()) {
        const buffer = fs.readFileSync(fullpath);

        const child = new File(path.join(base, name), name, dir, buffer);
        dir.files[name] = child;
        dir.entries[name] = child;
      }
    }

    return dir;
  }

}

const loader = new FsLoader('testing/foo');
const root = loader.load();


const unary = new Set(['br', 'hr', 'input']);

function createElement(tag: string | Function | Symbol, attrs: any, ...children: any[]) {
  attrs ??= {};

  if (typeof tag === 'function') {
    return tag(attrs, children);
  }

  const childrenString = (children
    .filter(c =>
      c !== null &&
      c !== undefined &&
      c !== false)
    .flat()
    .join(''));

  if (tag instanceof Symbol) {
    if (tag === JSX.fragment) {
      return childrenString;
    }
    else if (!tag.description) {
      throw new Error('Empty Symbol passed as JSX tag.');
    }
    tag = tag.description;
  }

  const attrsArray = Object.entries(attrs);
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray
      .map(([k, v]) => {
        if (v === true) return k;
        if (v === false || v === null || v === undefined) return '';
        return `${k}="${v}"`;
      })
      .join(' ')
    : '');

  if (unary.has(tag)) {
    return `<${tag}${attrsString}/>`;
  }

  return `<${tag}${attrsString}>${childrenString}</${tag}>`;
}

const JSX = {
  createElement,
  fragment: Symbol('fragment'),
};


const runtime = new Runtime(root, {
  console,
  JSX,
});
const boot = runtime.findModuleFromRoot('a.tsx')!;
boot.run();
console.log(boot.exports.foo(3));
console.log(boot.exports.foo(9));





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
