import 'dotenv/config';
import * as http from "http";
import 'source-map-support/register';
import { URL } from 'url';

persisted.sessions ??= new Map<string, Session>();

export class Server {

  handler!: RouteHandler;
  #server;

  constructor(private baseUrl: string) {
    this.#server = http.createServer((req, res) => {
      let chunks: Buffer[] = [];
      req.on('data', (data: Buffer) => chunks.push(data));
      req.on('end', () => {
        const cookieKvs = req.headers.cookie?.split('; ');
        const cookiePairs = cookieKvs?.map(kv => kv.split('=') as [string, string]);
        const cookies = cookiePairs && Object.fromEntries(cookiePairs);
        const sessionId = cookies?.['wwwiii'] || null;
        const session = sessionId ? persisted.sessions.get(sessionId) ?? null : null;

        const input: RouteInput = {
          url: new URL(req.url!, this.baseUrl),
          body: Buffer.concat(chunks),
          method: req.method!,
          headers: req.headers,
          session,
        };

        const output = this.handler(input);

        res.statusCode = output.status ?? 200;
        for (const [k, v] of Object.entries(output.headers ?? {})) {
          if (typeof v === 'string') {
            res.setHeader(k, v);
          }
        }
        res.end(output.body ?? '');
      });
    });
  }

  start(port: number) {
    this.#server.listen(port);
    console.log(`Running on http://localhost:${port}`);
  }

}
