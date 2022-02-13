import 'source-map-support/register';
import { startServer } from './core/http';
import './core/load';
import { loadRoutes, makeRouteHandler } from './core/router';

persisted.server ??= startServer(process.env['BASE_URL']!, 8080);
persisted.server.handler = makeRouteHandler(loadRoutes());
