import 'dotenv/config';
import 'source-map-support/register';
import { FileSys, FsFile } from './filesys';
import { RouteHandler } from './http';
import { Runtime } from "./runtime";

export class Site {

  handler!: RouteHandler;
  #filesys;
  #runtime: Runtime | undefined;
  #persisted = Object.create(null);
  #ignoreChanges = new Set<string>();

  constructor(path: string) {
    this.#filesys = new FileSys(path, this.#ignoreChanges);
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
      console.log('Loading boot module...');
      mainModule.require();
      console.log('Done');
      this.handler = mainModule.exports.routeHandler;
    }
    catch (e) {
      console.error(e);
    }
  }

  fileChanged(path: string) {
    if (this.#ignoreChanges.has(path)) {
      console.log('Ignoring internally changed file:', path);
      this.#ignoreChanges.delete(path);
    }
    else {
      this.build();
    }
  }

}
