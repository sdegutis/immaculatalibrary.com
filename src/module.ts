import * as sucrase from 'sucrase';
import { pathToFileURL } from 'url';
import vm from 'vm';
import { FsFile } from "./filesys";
import { createJsxElement } from './jsx';
import { Runtime } from './runtime';

export class Module {

  #exports = Object.create(null);
  #ran = false;
  #run;

  constructor(
    private file: FsFile,
    private runtime: Runtime,
  ) {
    this.#run = this.createRunFunction();
  }

  resetExports() {
    this.#ran = false;
    for (const key in this.#exports) {
      delete this.#exports[key];
    }
  }

  resetFunction() {
    this.resetExports();
    this.#run = this.createRunFunction();
  }

  createRunFunction() {
    const rawCode = this.file.content.toString('utf8');

    const filename = this.runtime.fs.realPath(this.file);
    const fileUrl = pathToFileURL(filename);

    const transformed = sucrase.transform(rawCode, {
      transforms: ['typescript', 'imports', 'jsx'],
      jsxPragma: '__createJsxElement',
      jsxFragmentPragma: '""',
      disableESTransforms: true,
      production: true,
      filePath: fileUrl.href,
      sourceMapOptions: {
        compiledFilename: filename,
      },
    });

    const args = {
      require: (path: string) => this.#requireFromWithinModule(path),
      exports: this.#exports,
      __createJsxElement: createJsxElement,
    };

    const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
    const sourceMapUrlStr = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;
    const runModule = vm.compileFunction(transformed.code + sourceMapUrlStr, Object.keys(args), {
      filename: fileUrl.href,
    });

    return () => runModule(...Object.values(args));
  }

  require() {
    if (!this.#ran) {
      this.#ran = true;
      this.#run();
    }
    return this.#exports;
  }

  #requireFromWithinModule(toPath: string) {
    if (!toPath.match(/^[./]/)) {
      return require(toPath);
    }

    const file = this.file.parent.find(toPath);
    if (!file) throw new Error(`Can't find file at path: ${toPath}`);

    this.runtime.addDep(this.file.path, file.path);

    const mod = file instanceof FsFile && file.module;
    if (!mod) return file;

    return mod.require();
  }

}
