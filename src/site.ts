import { FileSys } from "./filesys.js";
import { Runtime } from "./runtime.js";

export class Site {

  #srcFs;
  #runtime;
  #srcPath = 'site';

  constructor() {
    this.#srcFs = new FileSys(this.#srcPath);
    this.#runtime = new Runtime(this.#srcFs);
    this.#runtime.createModules();
  }

  build() {
    try {
      const mainModule = this.#runtime.modules.get('/core/main.ts')!;
      return mainModule.require() as {
        outfiles: Map<string, Buffer | string>,
        handlers: Map<string, (body: string) => string>,
      };
    }
    catch (e) {
      console.error(e);
      return;
    }
  }

  pathsUpdated(...paths: string[]) {
    const fixedPaths = paths.map(p => p.slice(this.#srcPath.length));

    this.#srcFs.reflectChangesFromReal(fixedPaths);
    this.#runtime.updateModules(fixedPaths);
  }

}
