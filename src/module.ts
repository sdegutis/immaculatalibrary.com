import * as path from 'path/posix';
import * as sucrase from 'sucrase';
import * as vm from 'vm';
import { Runtime } from './runtime.js';

export class Module {

  #exports = Object.create(null);
  #ran = false;
  #run;
  content;

  cachedData?: Buffer;

  constructor(
    private filepath: string,
    buffer: Buffer,
    private runtime: Runtime,
    cachedData: Buffer | undefined,
  ) {
    const rawCode = buffer.toString('utf8');

    const transformed = sucrase.transform(rawCode, {
      transforms: ['typescript', 'imports', 'jsx'],
      jsxRuntime: 'automatic',
      jsxImportSource: '/core',
      disableESTransforms: true,
      production: true,
    });

    const require = (path: string) => this.#requireFromWithinModule(path);
    const exports = this.#exports;

    this.content = (transformed.code
      .replace(/"\/core\/jsx-runtime"/g, `"/core/jsx-runtime.js"`)
    );

    const script = new vm.Script(`(require,exports)=>{\n${this.content}\n}`, {
      cachedData,
    });

    this.#run = () => {
      script.runInThisContext()(require, exports);
      this.cachedData = script.createCachedData();
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

    const absPath = path.resolve(path.dirname(this.filepath), toPath);

    const module = this.runtime.files.get(absPath)?.module;
    if (module) {
      return module.require();
    }

    if (toPath.endsWith('/')) {
      const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';

      return ([...this.runtime.files.values()]
        .filter(file => file.path.startsWith((dirPath)))
      );
    }

    throw new Error(`Can't find file at path: ${toPath}`);
  }

}
