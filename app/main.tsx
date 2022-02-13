import 'source-map-support/register';
import { startServer } from './core/http';
import './core/load';
import { addRouteable, loadRoutes, makeRouteHandler } from './core/router';

const routes = loadRoutes();

addRouteable({
  method: 'GET',
  route: '/report.html',
  handle: () => ({
    body: __dir.filesByName['report.html']!.buffer
  })
});

persisted.server ??= startServer(process.env['BASE_URL']!, 8080);
persisted.server.handler = makeRouteHandler(routes);
