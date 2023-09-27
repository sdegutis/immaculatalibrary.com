import * as http from "http";
import { FsDir, FsFile } from "./filesys";

export class Server {

  outDir: FsDir | undefined;

  startServer(port: number) {
    const server = http.createServer((req, res) => {
      let node = this.outDir?.find(req.url!);
      if (node instanceof FsDir) {
        node = node.filesByName['index.html'];
      }

      if (node instanceof FsFile) {
        res.statusCode = 200;
        if (node.name.endsWith('.js')) {
          res.setHeader('content-type', 'text/javascript');
        }
        res.end(node.content);
      }
      else {
        res.statusCode = 404;
        res.end('File not found');
      }
    });

    server.listen(port);
    console.log(`Running on http://localhost:${port}`);
  }

}
