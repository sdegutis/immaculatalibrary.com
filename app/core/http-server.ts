import 'dotenv/config';
import * as http from "http";
import 'source-map-support/register';

const baseUrl = process.env['BASE_URL']!;

persisted.sessions ??= new Map<string, Session>();

export function startServer(port: number, handler: RouteHandler) {
  const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    let chunks: Buffer[] = [];
    req.on('data', (data: Buffer) => chunks.push(data));
    req.on('end', () => {
      const cookieKvs = req.headers.cookie?.split('; ');
      const cookiePairs = cookieKvs?.map(kv => kv.split('=') as [string, string]);
      const cookies = cookiePairs && Object.fromEntries(cookiePairs);
      const sessionId = cookies?.['wwwiii'] || null;
      const session = sessionId ? persisted.sessions!.get(sessionId) ?? null : null;

      const input: RouteInput = {
        url: new URL(req.url!, baseUrl),
        body: Buffer.concat(chunks),
        method: req.method!,
        headers: req.headers,
        session,
      };

      const output = handler(input);

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

  return () => server.close();
}
