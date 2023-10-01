import * as sucrase from 'sucrase';
import { pathToFileURL } from 'url';
import vm from 'vm';
import { FileSys, FsDir, FsFile } from "./filesys";

const JSX_IMPL_PATH = '/jsx.ts';

export class Runtime {

  #deps = new Map<string, Set<string>>();

  constructor(public fs: FileSys) {
    this.#createModules(fs.root);
  }

  getJsxFunction() {
    const jsxFile = this.fs.root.find(JSX_IMPL_PATH) as FsFile;
    return jsxFile.module!.require().default;
  }

  #createModules(dir: FsDir) {
    for (const subdir of dir.dirs) {
      this.#createModules(subdir);
    }

    for (const file of dir.files) {
      if (file.name.match(/\.tsx?$/)) {
        file.module = new Module(file, this);
      }
    }
  }

  updateModules(files: FsFile[]) {
    const resetSeen = new Set<string>();

    for (const file of files) {
      if (file.name.match(/\.tsx?$/)) {
        if (file.module) {
          file.module.resetFunction();
        }
        else {
          file.module = new Module(file, this);
        }
      }

      if (file.path === JSX_IMPL_PATH) {
        this.#deps.clear();
        const resetDir = (dir: FsDir) => {
          for (const subdir of dir.dirs) resetDir(subdir);
          for (const file of dir.files) file.module?.resetFunction();
        };
        resetDir(this.fs.root);
        return;
      }
      else {
        this.#resetDepTree(file.path, resetSeen);
      }
    }
  }

  addDep(path: string, requiringPath: string) {
    let list = this.#deps.get(requiringPath);
    if (!list) this.#deps.set(requiringPath, list = new Set());
    list.add(path);
  }

  #resetDepTree(path: string, seen: Set<string>) {
    if (seen.has(path)) return;
    seen.add(path);

    const deps = this.#deps.get(path);
    if (deps) {
      this.#deps.delete(path);
      for (const dep of deps) {
        const file = this.fs.root.find(dep) as FsFile;
        file.module?.resetExports();
        this.#resetDepTree(dep, seen);
      }
    }
  }

}

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
      __dir: this.file.parent!,
      __file: this.file,
      __createJsxElement: undefined,
    };

    const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
    const sourceMapUrlStr = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;
    const runModule = vm.compileFunction(transformed.code + sourceMapUrlStr, Object.keys(args), {
      filename: fileUrl.href,
    });

    return () => {
      args.__createJsxElement = this.runtime.getJsxFunction();
      runModule(...Object.values(args));
    };
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
