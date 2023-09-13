import 'source-map-support/register';
import { FileSys, FsFile } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #filesys;
  #runtime: Runtime | undefined;
  #persisted = Object.create(null);

  constructor(path: string) {
    this.#filesys = new FileSys(path);
    this.build();
  }

  build() {
    console.log('Building site');
    const root = this.#filesys.load();

    this.#runtime?.shutdown();
    this.#runtime = new Runtime(this.#persisted, root);

    const mainFile = root.find('/main') as FsFile;
    const mainModule = this.#runtime.modules.get(mainFile)!;

    try {
      console.log('Loading main module...');
      mainModule.require();
      console.log('Done');
    }
    catch (e) {
      console.error(e);
    }
  }

  pathsUpdated(paths: Set<string>) {
    this.build();
  }

}
