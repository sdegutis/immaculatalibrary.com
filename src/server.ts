import http from "http";
import path from "path/posix";

export class Server {

  files: Map<string, Buffer | string> | undefined;

  startServer(port: number) {
    const server = http.createServer((req, res) => {
      const url = req.url!;
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
