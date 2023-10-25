import * as path from 'path/posix';
import * as vm from 'vm';
import { Runtime } from './runtime.js';

export class Module {

  #exports = Object.create(null);
  #ran = false;
  #run;

  constructor(
    private filepath: string,
    buffer: Buffer,
    private runtime: Runtime,
  ) {
    const require = (path: string) => this.#requireFromWithinModule(path);
    const exports = this.#exports;
    const script = new vm.Script(`(require,exports)=>{\n${buffer.toString('utf8')}\n}`);
    this.#run = () => {
      script.runInThisContext()(require, exports);
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
