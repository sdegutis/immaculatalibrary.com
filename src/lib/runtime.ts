import * as path from "path";
import * as sucrase from 'sucrase';
import vm from 'vm';

export class Module {

  public exports = Object.create(null);
  private ran = false;

  constructor(
    private file: File,
    private runtime: Runtime,
  ) { }

  run() {
    if (!this.ran) {
      const rawCode = this.file.buffer.toString('utf8');

      const args = {
        require: (path: string) => this.require(path),
        exports: this.exports,
        __dir: this.file.parent!,
      };

      const sucraseOptions: sucrase.Options = {
        transforms: ['typescript', 'imports'],
        disableESTransforms: true,
        production: true,
      };

      if (this.runtime.jsxCreateElement) {
        (args as any).JSX = {
          createElement: this.runtime.jsxCreateElement,
          fragment: Symbol('fragment'),
        };
        sucraseOptions.transforms.push('jsx');
        sucraseOptions.jsxPragma = 'JSX.createElement';
        sucraseOptions.jsxFragmentPragma = 'JSX.fragment';
      }

      const { code } = sucrase.transform(rawCode, sucraseOptions);

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

export class Dir {

  files: { [name: string]: File } = Object.create(null);
  subdirs: { [name: string]: Dir } = Object.create(null);
  entries: { [name: string]: File | Dir } = Object.create(null);

  constructor(
    public path: string,
    public name: string,
    public parent: Dir | null,
  ) { }

}

export class File {

  constructor(
    public path: string,
    public name: string,
    public parent: Dir | null,
    public buffer: Buffer,
  ) { }

  module: Module | null = null;

}

interface JsxCreateElement {
  (tag: string | Function | symbol, attrs: any, ...children: any[]): any;
}

interface RuntimeOptions {
  jsxCreateElement?: JsxCreateElement;
}

export class Runtime {

  context;
  jsxCreateElement: JsxCreateElement | undefined;
  constructor(public root: Dir, options: RuntimeOptions, sandbox: { [global: string]: any }) {
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
