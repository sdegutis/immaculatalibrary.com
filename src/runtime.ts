import * as sucrase from 'sucrase';
import { pathToFileURL } from 'url';
import vm from 'vm';
import { FsDir, FsFile } from "./filesys";

type JsxCreateElement = (
  tag: string | Function | symbol,
  attrs: any,
  ...children: any[]
) => any;

export class Runtime {

  context;
  modules = new Map<FsFile, Module>();
  #timeouts: NodeJS.Timeout[] = [];
  #intervals: NodeJS.Timer[] = [];

  constructor(
    persisted: any,
    public root: FsDir,
    public jsxCreateElement?: JsxCreateElement,
  ) {
    this.context = vm.createContext({
      persisted,
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

  #createModules(dir: FsDir) {
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
    private file: FsFile,
    runtime: Runtime,
  ) {
    this.#runtime = runtime;
  }

  require() {
    if (!this.#ran) {
      this.#ran = true;

      const rawCode = this.file.buffer.toString('utf8');

      const args = {
        require: (path: string) => this.#requireFromWithinModule(path),
        exports: this.exports,
        __dir: this.file.parent!,
        __file: this.file,
      };

      const filePath = pathToFileURL(this.file.realPath);

      const sucraseOptions: sucrase.Options = {
        transforms: ['typescript', 'imports'],
        disableESTransforms: true,
        production: true,
        filePath: filePath.href,
        sourceMapOptions: {
          compiledFilename: this.file.realPath,
        }
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

      const { code, sourceMap } = sucrase.transform(rawCode, sucraseOptions);
      const sourceMapBase64 = Buffer.from(JSON.stringify(sourceMap!)).toString('base64url');
      const sourceMapUrlStr = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;
      const runModule = vm.compileFunction(code + sourceMapUrlStr, Object.keys(args), {
        filename: filePath.href,
        parsingContext: this.#runtime.context,
      });

      runModule(...Object.values(args));
    }
    return this.exports;
  }

  #requireFromWithinModule(toPath: string) {
    toPath = toPath.replace(/^(file|dir):/, '');
    if (!toPath.match(/^[./]/)) {
      return require(toPath);
    }

    const file = this.file.parent.find(toPath);
    if (!file) throw new Error(`Can't find file at path: ${toPath}`);

    const mod = file.isFile() && this.#runtime.modules.get(file);
    if (!mod) return file;

    return mod.require();
  }

}
