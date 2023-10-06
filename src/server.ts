import http from "http";
import path from "path/posix";

export class Server {

  files: Map<string, Buffer | string> | undefined;
  post?: ((path: string, body: string) => string) | undefined;

  startServer(port: number) {
    const server = http.createServer((req, res) => {
      const url = req.url!;

      if (req.method === 'POST') {
        const fn = this.post;
        if (fn) {
          let data = '';
          req.on('data', (chunk: Buffer | string) => {
            data += chunk.toString('utf8');
          });
          req.on('end', () => {
            const redirect = fn(url, data) || '/';
            res.statusCode = 302;
            res.setHeader('Location', redirect);
            res.end();
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
