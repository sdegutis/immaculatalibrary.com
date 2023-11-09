import { EventEmitter } from "events";
import * as http from "http";
import * as path from "path/posix";

export class Server {

  files: Map<string, Buffer | string> | undefined;
  handlers?: Map<string, (body: string) => string> | undefined;

  events = new EventEmitter();

  startServer(port: number) {
    const server = http.createServer((req, res) => {
      const url = req.url!.split('?')[0]!;

      if (req.method === 'POST') {
        const handler = this.handlers?.get(url);
        if (handler) {
          const data: Buffer[] = [];
          req.on('data', (chunk) => {
            data.push(chunk);
          });
          req.on('end', () => {
            const body = Buffer.concat(data).toString('utf8');
            const redirect = handler(body);
            this.events.once('rebuild', () => {
              res.statusCode = 302;
              res.setHeader('Location', redirect);
              res.end();
            });
          });
        }
        return;
      }

      const content = (
        this.files?.get(url) ??
        this.files?.get(path.join(url, 'index.html'))
      );

      if (content !== undefined) {
        res.statusCode = 200;
        if (url.endsWith('.js')) {
          res.setHeader('content-type', 'text/javascript');
        }
        res.end(content);
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
