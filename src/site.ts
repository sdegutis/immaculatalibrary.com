import { Runtime } from "./runtime.js";

export class Site {

  #runtime;

  constructor(private srcPath: string) {
    this.#runtime = new Runtime(this.srcPath);
  }

  async setup() {
    await this.#runtime.createModules();
  }

  async build() {
    try {
      const mainModule = this.#runtime.modules.get('/core/main.js')!;
      console.time('Running /core/main.js');
      await mainModule.evaluate();
      console.timeEnd('Running /core/main.js');
      return mainModule.namespace as {
        outfiles: Map<string, Buffer | string>,
        handlers: Map<string, (body: string) => string>,
      };
    }
    catch (e) {
      console.error(e);
      return;
    }
  }

  async pathsUpdated(...paths: string[]) {
    const fixedPaths = paths.map(p => p.slice(this.srcPath.length));
    await this.#runtime.reflectChangesFromReal(fixedPaths);
  }

}
