import * as http from "http";
import { FileSys, FsDir, FsFile } from './filesys';
import { Runtime } from "./runtime";

export class Site {

  #srcFs;
  #outFs;
  #runtime: Runtime | undefined;

  constructor(srcPath: string, outPath: string) {
    this.#srcFs = new FileSys(srcPath);
    this.#outFs = new FileSys(outPath);
    this.#build();
  }

  startServer(port: number) {
    const server = http.createServer((req, res) => {
      let node = this.#outFs.root.find(req.url!);
      if (node instanceof FsDir) {
        node = node.filesByName['index.html'];
      }

      if (node instanceof FsFile) {
        res.statusCode = 200;
        if (node.name.endsWith('.js')) {
          res.setHeader('content-type', 'text/javascript');
        }
        res.end(node.buffer);
      }
      else {
        res.statusCode = 404;
        res.end('File not found');
      }
    });

    server.listen(port);
    console.log(`Running on http://localhost:${port}`);
  }

  #build() {
    console.log('Building site');
    const root = this.#srcFs.root;

    this.#runtime = new Runtime(this.#srcFs);

    const mainFile = root.find('/main') as FsFile;
    const mainModule = this.#runtime.modules.get(mainFile)!;

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

    this.#outFs.reflectChangesToReal(outDir);
  }

  pathsUpdated(paths: Set<string>) {
    this.#srcFs.reflectChangesFromReal(paths);
    this.#build();
  }

}
