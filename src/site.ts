import { Runtime } from "./runtime.js";

export class Site {

  #runtime;

  constructor(private srcPath: string) {
    this.#runtime = new Runtime(this.srcPath);
  }

  build() {
    try {
      const mainModule = this.#runtime.files.get('/core/main.js')!.module!;
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
    const fixedPaths = paths.map(p => p.slice(this.srcPath.length));
    this.#runtime.reflectChangesFromReal(fixedPaths);
  }

}
