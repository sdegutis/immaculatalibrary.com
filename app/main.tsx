import mime from 'mime';
import 'source-map-support/register';
import './core/load';
import { addRouteable, loadRoutes } from './core/router';
import { Server } from './http';
import { notFoundPage } from './pages/errors/404';
import { errorPage } from './pages/errors/500';

const routes = loadRoutes();

addRouteable({
  method: 'GET',
  route: '/report.html',
  handle: () => ({
    body: __dir.filesByName['report.html']!.buffer
  })
});

persisted.server ??= startServer(process.env['BASE_URL']!, 8080);
persisted.server.handler = (input: RouteInput): RouteOutput => {
  if (input.headers['host'] !== input.url.host) {
    return { status: 302, headers: { 'Location': input.url.href } };
  }

  if (input.url.pathname.endsWith('/') && input.url.pathname !== '/') {
    return { status: 302, headers: { 'Location': input.url.pathname.slice(0, -1) } };
  }

  const key = `${input.method} ${input.url.pathname}`;
  const handler = routes.get(key);
  let output: RouteOutput;

  try {
    if (handler) {
      output = handler(input);
    }
    else {
      output = notFoundPage(input);
    }
  }
  catch (e) {
    console.error(e);
    output = errorPage(input);
  }

  output.headers ??= {};
  output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
  output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

  return output;
};

function startServer(baseUrl: string, port: number) {
  const server = new Server(baseUrl);
  server.start(port);
  return server;
}
