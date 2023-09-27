import * as sucrase from 'sucrase';
import { pathToFileURL } from 'url';
import vm from 'vm';
import { FileSys, FsDir, FsFile } from "./filesys";

export class Runtime {

  modules = new Map<FsFile, Module>();

  constructor(public fs: FileSys) {
    this.#createModules(fs.root);
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

  #exports = Object.create(null);
  #ran = false;

  #code;
  #sourceMap;
  #filePath;

  constructor(
    private file: FsFile,
    private runtime: Runtime,
  ) {
    const rawCode = this.file.buffer.toString('utf8');
    this.#filePath = pathToFileURL(runtime.fs.realPath(this.file));

    const transformed = sucrase.transform(rawCode, {
      transforms: ['typescript', 'imports', 'jsx'],
      jsxPragma: '__createJsxElement',
      jsxFragmentPragma: '""',
      disableESTransforms: true,
      production: true,
      filePath: this.#filePath.href,
      sourceMapOptions: {
        compiledFilename: runtime.fs.realPath(this.file),
      },
    });

    this.#code = transformed.code;
    this.#sourceMap = transformed.sourceMap!;
  }

  require() {
    if (!this.#ran) {
      this.#ran = true;

      const args = {
        require: (path: string) => this.#requireFromWithinModule(path),
        exports: this.#exports,
        __dir: this.file.parent!,
        __file: this.file,
        __createJsxElement: createJsxElement,
      };

      const sourceMapBase64 = Buffer.from(JSON.stringify(this.#sourceMap)).toString('base64url');
      const sourceMapUrlStr = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;
      const runModule = vm.compileFunction(this.#code + sourceMapUrlStr, Object.keys(args), {
        filename: this.#filePath.href,
      });

      runModule(...Object.values(args));
    }
    return this.#exports;
  }

  #requireFromWithinModule(toPath: string) {
    if (!toPath.match(/^[./]/)) {
      return require(toPath);
    }

    const file = this.file.parent.find(toPath);
    if (!file) throw new Error(`Can't find file at path: ${toPath}`);

    const mod = file instanceof FsFile && this.runtime.modules.get(file);
    if (!mod) return file;

    return mod.require();
  }

}

function createJsxElement(tag: string | Function, attrs: any, ...children: any[]) {
  return { tag, attrs: attrs ?? {}, children };
}
