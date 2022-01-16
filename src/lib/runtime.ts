import * as path from "path";
import * as sucrase from 'sucrase';
import vm from 'vm';
import { Dir, File } from "./filesys";

type JsxCreateElement = (
  tag: string | Function | symbol,
  attrs: any,
  ...children: any[]
) => any;

interface RuntimeOptions {
  jsxCreateElement?: JsxCreateElement;
}

export class Runtime {

  context;
  jsxCreateElement: JsxCreateElement | undefined;

  modules = new Map<File, Module>();

  constructor(
    public root: Dir,
    options: RuntimeOptions,
    sandbox: { [global: string]: any },
  ) {
    this.jsxCreateElement = options.jsxCreateElement;
    this.context = vm.createContext(sandbox);
    this.createModules(root);
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
        filename: this.file.path,
        parsingContext: this.#runtime.context,
      });

      runModule(...Object.values(args));

      this.#ran = true;
    }
    return this.exports;
  }

  #require(toPath: string) {
    const absolutePath = (path.posix.isAbsolute(toPath)
      ? toPath
      : path.posix.join(path.posix.dirname(this.file.path), toPath));
    const mod = this.#runtime.findModule(absolutePath);
    if (!mod) {
      throw new Error(`Can't find module at path: ${absolutePath}`);
    }
    return mod.require();
  }

}
