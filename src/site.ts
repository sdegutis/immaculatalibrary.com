import { FileSys } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #srcFs;
  #runtime;

  constructor(private srcPath: string) {
    this.#srcFs = new FileSys(srcPath);
    this.#runtime = new Runtime(this.#srcFs);
    this.#runtime.createModules();
  }

  build() {
    try {
      console.log('Building site...');
      const mainModule = this.#runtime.modules.get('/main.ts')!;
      const exports = mainModule.require() as { default: Map<string, Buffer | string> };
      return exports.default;
    }
    catch (e) {
      console.error(e);
      return;
    }
    finally {
      console.log('Building site: done.');
    }
  }

  pathsUpdated(...paths: string[]) {
    const fixedPaths = paths.map(p => p.slice(this.srcPath.length));

    this.#srcFs.reflectChangesFromReal(fixedPaths);
    this.#runtime.updateModules(fixedPaths);
  }

}
