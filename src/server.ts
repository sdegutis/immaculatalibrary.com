import EventEmitter from "events";
import http from "http";
import path from "path/posix";

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
          let data = '';
          req.on('data', (chunk: Buffer | string) => {
            data += chunk.toString('utf8');
          });
          req.on('end', () => {
            const redirect = handler(data);
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

      if (content) {
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
