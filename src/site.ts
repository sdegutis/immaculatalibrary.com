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
    return this.requireSafely<Map<string, Buffer | string>>('/core/main.ts');
  }

  handler() {
    return this.requireSafely<Map<string, (body: string) => string>>('/core/handlers.ts');
  }

  requireSafely<T>(path: string) {
    try {
      const mainModule = this.#runtime.modules.get(path)!;
      const exports = mainModule.require() as { default: T };
      return exports.default;
    }
    catch (e) {
      console.error(e);
      return;
    }
  }

  pathsUpdated(...paths: string[]) {
    const fixedPaths = paths.map(p => p.slice(this.srcPath.length));

    this.#srcFs.reflectChangesFromReal(fixedPaths);
    this.#runtime.updateModules(fixedPaths);
  }

}
