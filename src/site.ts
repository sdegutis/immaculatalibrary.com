import chokidar from 'chokidar';
import 'dotenv/config';
import 'source-map-support/register';
import { FileSys, FsFile } from './filesys';
import { RouteHandler } from './http';
import { jsxCreateStringifiedElement } from "./jsx";
import { Runtime } from "./runtime";

export class Site {

  handler!: RouteHandler;
  #filesys = new FileSys('app');
  #runtime: Runtime | undefined;
  #persisted = Object.create(null);

  constructor() {
    this.build();
  }

  build() {
    console.log('Building site');
    const root = this.#filesys.load();

    this.#runtime?.shutdown();
    this.#runtime = new Runtime(this.#persisted, root, jsxCreateStringifiedElement);

    const mainFile = root.find('/src/main')! as FsFile;
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

  restartOnSourceChanges() {
    let timeout: NodeJS.Timeout | null = null;
    chokidar.watch(this.#filesys.fsBase, { ignoreInitial: true }).on('all', (e, p) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => this.build(), 100);
    });
  }

}
