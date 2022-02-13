import 'source-map-support/register';
import { makeRouteHandler } from './core/handler';
import { startServer } from './core/http';
import { loadRoutes } from './core/router';
import './load-route-files';

persisted.server ??= startServer(process.env['BASE_URL']!, 8080);
persisted.server.handler = makeRouteHandler(loadRoutes());
