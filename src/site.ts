import { FileSys, FsDir, FsFile } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #srcFs;
  #runtime: Runtime | undefined;

  constructor(srcPath: string) {
    this.#srcFs = new FileSys(srcPath);
  }

  build() {
    console.log('Building site');
    const root = this.#srcFs.root;

    this.#runtime = new Runtime(this.#srcFs);

    const mainFile = root.find('/main') as FsFile;
    const mainModule = mainFile.module!;

    let outDir: FsDir;
    try {
      console.log('Loading main module...');
      outDir = mainModule.require().default;
      console.log('Done');
    }
    catch (e) {
      console.error(e);
      return;
    }

    return outDir;
  }

  pathsUpdated(paths: Set<string>) {
    this.#srcFs.reflectChangesFromReal(paths);
  }

}
