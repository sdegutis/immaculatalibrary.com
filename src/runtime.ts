import * as path from "path";
import * as sucrase from 'sucrase';
import vm from 'vm';
import { Dir, File } from "./filesys";

type JsxCreateElement = (
  tag: string | Function | symbol,
  attrs: any,
  ...children: any[]
) => any;

export class Runtime {

  context;
  modules = new Map<File, Module>();
  timeouts: NodeJS.Timeout[] = [];
  intervals: NodeJS.Timer[] = [];

  constructor(
    public root: Dir,
    public jsxCreateElement?: JsxCreateElement,
  ) {
    this.context = vm.createContext({
      console,
      Buffer,
      setTimeout: (fn: () => void, ms: number) => this.setTimeout(fn, ms),
      setInterval: (fn: () => void, ms: number) => this.setInterval(fn, ms),
    });
    this.createModules(root);
  }

  setTimeout(fn: () => void, ms: number) {
    this.timeouts.push(setTimeout(fn, ms));
  }

  setInterval(fn: () => void, ms: number) {
    this.intervals.push(setInterval(fn, ms));
  }

  shutdown() {
    this.timeouts.forEach(clearTimeout);
    this.intervals.forEach(clearInterval);
  }

  findModule(absolutePath: string) {
    let dir: Dir = this.root;
    const parts = absolutePath.split(path.posix.sep).slice(1);
    let part: string | undefined;

    while (part = parts.shift()) {
      if (parts.length === 0) {
        const file = (
          dir.files[part] ??
          dir.files[part + '.ts'] ??
          dir.files[part + '.tsx']
        );
        if (file) {
          const mod = this.modules.get(file);
          if (mod) return mod;
        }
      }
      else {
        const subdir = dir.subdirs[part];
        if (!subdir) break;
        dir = subdir;
      }
    }

    return null;
  }

  createModules(dir: Dir) {
    for (const subdir of Object.values(dir.subdirs)) {
      this.createModules(subdir);
    }

    for (const file of Object.values(dir.files)) {
      if (file.name.match(/\.tsx?$/)) {
        this.modules.set(file, new Module(file, this));
      }
    }
  }

}

class Module {

  public exports = Object.create(null);
  #ran = false;
  #runtime: Runtime;

  constructor(
    public file: File,
    runtime: Runtime,
  ) {
    this.#runtime = runtime;
  }

  require() {
    if (!this.#ran) {
      const rawCode = this.file.buffer.toString('utf8');

      const args = {
        require: (path: string) => this.#require(path),
        exports: this.exports,
        __dir: this.file.parent!,
        __file: this.file,
      };

      const sucraseOptions: sucrase.Options = {
        transforms: ['typescript', 'imports'],
        disableESTransforms: true,
        production: true,
      };

      if (this.#runtime.jsxCreateElement) {
        (args as any)._JSX = {
          createElement: this.#runtime.jsxCreateElement,
          fragment: Symbol('fragment'),
        };
        sucraseOptions.transforms.push('jsx');
        sucraseOptions.jsxPragma = '_JSX.createElement';
        sucraseOptions.jsxFragmentPragma = '_JSX.fragment';
      }

      const { code } = sucrase.transform(rawCode, sucraseOptions);

      const runModule = vm.compileFunction(code, Object.keys(args), {
        filename: path.join(...`data${this.file.path}`.split(path.posix.sep)),
        parsingContext: this.#runtime.context,
      });

      runModule(...Object.values(args));

      this.#ran = true;
    }
    return this.exports;
  }

  #require(toPath: string) {
    let absolutePath: string;

    if (toPath.startsWith('/')) {
      absolutePath = toPath;
    }
    else if (toPath.startsWith('.')) {
      absolutePath = path.posix.join(path.posix.dirname(this.file.path), toPath);
    }
    else {
      return require(toPath);
    }

    const mod = this.#runtime.findModule(absolutePath);
    if (!mod) {
      throw new Error(`Can't find module at path: ${absolutePath}`);
    }
    return mod.require();
  }

}
