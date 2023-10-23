import { Runtime } from "./runtime.js";

export class Site {

  #srcFs;
  #srcPath = 'site';

  constructor() {
    this.#srcFs = new Runtime(this.#srcPath);
  }

  build() {
    try {
      const mainModule = this.#srcFs.files.get('/core/main.ts')!.module!;
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
    this.#srcFs.updateModules(fixedPaths);
  }

}
