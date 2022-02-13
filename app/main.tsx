import 'source-map-support/register';
import { startServer } from './core/http-server';
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';
import './load-route-files';

persisted.server ??= startServer(process.env['BASE_URL']!, 8080);
persisted.server.handler = makeRouteHandler(loadRoutes());
