import * as path from "path";
import * as sucrase from 'sucrase';
import vm from 'vm';
import { Dir, File } from "./vfs";

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

  findModuleFromRoot(destPath: string) {
    if (!destPath.endsWith('.tsx')) destPath += '.tsx';

    let dir: Dir = this.root;
    const parts = destPath.split(path.sep);
    let part: string | undefined;

    while (part = parts.shift()) {
      if (parts.length === 0) {
        const file = dir.files[part];
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
      if (file.name.endsWith('.tsx')) {
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
    const destPath = path.join(path.dirname(this.file.path), toPath);
    const mod = this.#runtime.findModuleFromRoot(destPath);
    if (!mod) {
      throw new Error(`Can't find module at path: ${destPath}`);
    }
    return mod.require();
  }

}
