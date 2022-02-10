import 'dotenv/config';
import * as http from "http";
import 'source-map-support/register';
import { URL } from 'url';
import { Site } from './site';

export interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: http.IncomingHttpHeaders;
  body: Buffer;
}

export interface RouteOutput {
  status?: number;
  headers?: http.OutgoingHttpHeaders;
  body?: Buffer;
}

export type RouteHandler = (input: RouteInput) => RouteOutput;

export function startServer(baseUrl: string, port: number, site: Site) {
  const server = http.createServer((req, res) => {
    let chunks: Buffer[] = [];
    req.on('data', (data: Buffer) => chunks.push(data));
    req.on('end', () => {
      const input: RouteInput = {
        url: new URL(req.url!, baseUrl),
        body: Buffer.concat(chunks),
        method: req.method!,
        headers: req.headers,
      };

      const output = site.handler(input);

      res.statusCode = output.status ?? 200;
      for (const [k, v] of Object.entries(output.headers ?? {})) {
        if (typeof v === 'string') {
          res.setHeader(k, v);
        }
      }
      res.end(output.body ?? '');
    });
  });

  server.listen(port);
  console.log(`Running on http://localhost:${port}`);
}
