import * as http from "http";
import 'source-map-support/register';
import { FileSys, FsFile } from './filesys';
import { Runtime } from "./runtime";

const PORT = 8080;

export class Site {

  #srcFs;
  #outFs;
  #runtime: Runtime | undefined;
  #persisted: Record<string, any> = Object.create(null);

  constructor(srcPath: string, outPath: string) {
    this.#srcFs = new FileSys(srcPath);
    this.#outFs = new FileSys(outPath);
    this.build();

    const server = http.createServer((req, res) => {
      const file = this.#outFs.root.find(req.url!);
      if (file instanceof FsFile) {
        res.statusCode = 200;
        res.end(file.buffer);
      }
      else {
        res.statusCode = 404;
        res.end('File not found');
      }
    });

    server.listen(PORT);
    console.log(`Running on http://localhost:${PORT}`);
  }

  build() {
    console.log('Building site');
    const root = this.#srcFs.root;

    this.#runtime?.shutdown();
    this.#runtime = new Runtime(this.#persisted, root);

    const mainFile = root.find('/main') as FsFile;
    const mainModule = this.#runtime.modules.get(mainFile)!;

    let outMap: Map<string, Buffer>;
    try {
      console.log('Loading main module...');
      outMap = mainModule.require().default;
      console.log('Done');
    }
    catch (e) {
      console.error(e);
      return;
    }

    console.log(outMap.size, this.#outFs.root);
  }

  pathsUpdated(paths: Set<string>) {
    this.#srcFs.update(paths);
    this.build();
  }

}
