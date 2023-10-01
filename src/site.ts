import { FileSys, FsDir, FsFile } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #srcFs;
  #runtime;

  constructor(srcPath: string) {
    this.#srcFs = new FileSys(srcPath);
    this.#runtime = new Runtime(this.#srcFs);
  }

  build(): FsDir | undefined {
    console.log('Building site');
    const root = this.#srcFs.root;

    const mainFile = root.find('/main') as FsFile;
    const mainModule = mainFile.module!;

    try {
      return mainModule.require().default;
    }
    catch (e) {
      console.error(e);
      return;
    }
  }

  pathsUpdated(paths: Set<string>) {
    const files = this.#srcFs.reflectChangesFromReal(paths);
    this.#runtime.updateModules(files);
  }

}
