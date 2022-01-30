import 'dotenv/config';
import 'source-map-support/register';
import { FileSys, FsFile } from './filesys';
import { RouteHandler } from './http';
import { jsxCreateStringifiedElement } from "./jsx";
import { Runtime } from "./runtime";

export class Site {

  handler!: RouteHandler;
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
    this.#runtime = new Runtime(this.#persisted, root, jsxCreateStringifiedElement);

    const mainFile = root.find('main') as FsFile;
    const mainModule = this.#runtime.modules.get(mainFile)!;

    // this.#runtime.context['restartSite'] = () => this.build();

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

}
