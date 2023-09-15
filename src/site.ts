import 'source-map-support/register';
import { FileSys, FsFile } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #srcFs;
  #outFs;
  #runtime: Runtime | undefined;
  #persisted: Record<string, any> = Object.create(null);

  constructor(srcPath: string, outPath: string) {
    this.#srcFs = new FileSys(srcPath);
    this.#outFs = new FileSys(outPath);
    this.build();
  }

  build() {
    console.log('Building site');
    const root = this.#srcFs.root;

    this.#runtime?.shutdown();
    this.#runtime = new Runtime(this.#persisted, root);

    this.#persisted['runtime'] = this.#runtime;
    this.#persisted['outFs'] = this.#outFs;

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
    this.#srcFs.update(paths);
    this.build();
  }

}
