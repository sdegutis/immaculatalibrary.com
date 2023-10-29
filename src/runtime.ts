import * as fs from "fs";
import * as path from "path/posix";
import * as sucrase from 'sucrase';
import { pathToFileURL } from "url";
import * as vm from 'vm';

export class Runtime {

  files = new Map<string, File>();

  constructor(private realBase: string) {
    this.#loadDir('/');
  }

  build() {
    console.time('Running /core/main.js');
    try {
      const mainModule = this.files.get('/core/main.js')!.module!;
      return mainModule.require() as {
        outfiles: Map<string, Buffer | string>,
        handlers: Map<string, (body: string) => string>,
      };
    }
    catch (e) {
      console.error(e);
      return;
    }
    finally {
      console.timeEnd('Running /core/main.js');
    }
  }

  async pathsUpdated(...paths: string[]) {
    const filepaths = paths.map(p => p.slice(this.realBase.length));

    for (const filepath of filepaths) {
      const realFilePath = this.realPathFor(filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }
  }

  #loadDir(base: string) {
    const dirRealPath = this.realPathFor(base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const realFilePath = path.join(dirRealPath, name);
      const stat = fs.statSync(realFilePath);

      if (stat.isDirectory()) {
        this.#loadDir(path.join(base, name));
      }
      else if (stat.isFile()) {
        const filepath = path.join(base, name);
        this.#createFile(filepath);
      }
    }
  }

  #createFile(filepath: string) {
    const realFilePath = this.realPathFor(filepath);
    let content = fs.readFileSync(realFilePath);
    const file = new File(filepath, content, this);
    this.files.set(file.path, file);
  }

  requireFromModule(toPath: string, fromPath: string) {
    if (!toPath.match(/^[./]/)) {
      return require(toPath);
    }

    const absPath = path.resolve(path.dirname(fromPath), toPath);

    const module = this.files.get(absPath)?.module;
    if (module) {
      return module.require();
    }

    if (toPath.endsWith('/')) {
      const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';
      const files = [...this.files.entries()]
        .filter(([filepath,]) => filepath.startsWith((dirPath)))
        .map(([filepath, file]) => ({ path: filepath, content: file.content }));
      return files;
    }

    throw new Error(`Can't find file at path: ${toPath}`);
  }

  realPathFor(filepath: string) {
    return path.join(this.realBase, filepath);
  }

}

class File {

  module?: Module;

  constructor(
    public path: string,
    public content: Buffer | string,
    runtime: Runtime,
  ) {
    if (path.match(/\.tsx?$/)) {
      const code = content.toString('utf8');
      this.module = new Module(code, this.path, runtime);
      this.content = Buffer.from(compileTSX(code).code);
      this.path = path.replace(/\.tsx?$/, '.js');
    }
  }

}

class Module {

  #ran = false;
  #exports = Object.create(null);

  constructor(
    private content: string,
    private filepath: string,
    private runtime: Runtime,
  ) { }

  require(): any {
    if (!this.#ran) {
      this.#ran = true;

      const realFilePath = this.runtime.realPathFor(this.filepath);
      const transformed = compileTSX(this.content, realFilePath);
      const sourceCode = transformed.code;
      const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
      const sourceMap = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;

      this.content = sourceCode + sourceMap;

      const fn = vm.compileFunction(sourceCode + sourceMap, ['require', 'exports'], {
        filename: pathToFileURL(realFilePath).href,
      });

      const require = (toPath: string) => this.runtime.requireFromModule(toPath, this.filepath);
      fn(require, this.#exports);
    }

    return this.#exports;
  }

  resetExports() {
    this.#ran = false;
    for (const key in this.#exports) {
      delete this.#exports[key];
    }
  }

}

function compileTSX(code: string, realFilePath?: string) {
  const options: sucrase.Options = {
    transforms: ['typescript', 'jsx'],
    jsxRuntime: 'automatic',
    jsxImportSource: '/core',
    disableESTransforms: true,
    production: true,
  };
  if (realFilePath) {
    options.transforms.push('imports');
    options.sourceMapOptions = { compiledFilename: realFilePath };
    options.filePath = pathToFileURL(realFilePath).href;
  }
  const result = sucrase.transform(code, options);
  result.code = result.code.replace(/"\/core\/jsx-runtime"/g, `"/core/jsx-transform.js"`)
  return result;
}
