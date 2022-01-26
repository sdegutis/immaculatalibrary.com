import 'dotenv/config';
import express from 'express';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
import 'source-map-support/register';
import { URL, URLSearchParams } from 'url';
import { Site } from './site';

export interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: IncomingHttpHeaders;
  body: Buffer;
}

export interface RouteOutput {
  status?: number;
  headers?: OutgoingHttpHeaders;
  body?: string | Buffer;
}

export type RouteHandler = (input: RouteInput) => RouteOutput;

export function startServer(baseUrl: string, port: number, site: Site) {
  const server = express();
  server.set('trust proxy', 1);
  server.set('query parser', (s: string) => new URLSearchParams(s ?? ''));
  server.disable('x-powered-by');

  server.use((req, res) => {
    if (req.path.endsWith('/') && req.path !== '/') {
      res.redirect(req.path.slice(0, -1));
      return;
    }

    const output = site.handler({
      body: req.body,
      headers: req.headers,
      method: req.method,
      url: new URL(req.url, baseUrl),
    });

    res.status(output.status ?? 200);
    res.set(output.headers ?? {});
    res.end(output.body ?? '');
  });

  server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
}
