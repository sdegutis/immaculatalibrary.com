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
  #timeouts: NodeJS.Timeout[] = [];
  #intervals: NodeJS.Timer[] = [];

  constructor(
    public root: Dir,
    public jsxCreateElement?: JsxCreateElement,
  ) {
    this.context = vm.createContext({
      console,
      Buffer,
      setTimeout: (fn: () => void, ms: number) => this.#setTimeout(fn, ms),
      setInterval: (fn: () => void, ms: number) => this.#setInterval(fn, ms),
    });
    this.#createModules(root);
  }

  #setTimeout(fn: () => void, ms: number) {
    this.#timeouts.push(setTimeout(fn, ms));
  }

  #setInterval(fn: () => void, ms: number) {
    this.#intervals.push(setInterval(fn, ms));
  }

  shutdown() {
    this.#timeouts.forEach(clearTimeout);
    this.#intervals.forEach(clearInterval);
  }

  find(absolutePath: string) {
    let dir: Dir = this.root;
    const parts = absolutePath.split(path.posix.sep).slice(1);
    let part: string | undefined;

    while (undefined !== (part = parts.shift())) {
      if (parts.length === 0) {
        if (part === '') return dir;

        return (
          dir.filesByName[part] ??
          dir.filesByName[part + '.ts'] ??
          dir.filesByName[part + '.tsx'] ??
          null
        );
      }
      else {
        const subdir = dir.dirsByName[part];
        if (!subdir) break;
        dir = subdir;
      }
    }

    return null;
  }

  #createModules(dir: Dir) {
    for (const subdir of dir.dirs) {
      this.#createModules(subdir);
    }

    for (const file of dir.files) {
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
    private file: File,
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
        filename: this.file.realPath,
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

    const file = this.#runtime.find(absolutePath);
    if (!file) throw new Error(`Can't find file at path: ${absolutePath}`);

    const mod = file.isFile() && this.#runtime.modules.get(file);
    if (!mod) return file;

    return mod.require();
  }

}
