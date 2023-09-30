import { FileSys, FsDir, FsFile } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #srcFs;
  #runtime: Runtime | undefined;

  constructor(srcPath: string) {
    this.#srcFs = new FileSys(srcPath);
  }

  build(): FsDir | undefined {
    console.log('Building site');
    const root = this.#srcFs.root;

    this.#runtime = new Runtime(this.#srcFs);

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
    this.#srcFs.reflectChangesFromReal(paths);
  }

}
