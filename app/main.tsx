import 'source-map-support/register';
import { startServer } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';
import './load-route-files';

persisted.shutdownServer?.();
persisted.shutdownServer = startServer(8080, makeRouteHandler(loadRoutes()));
