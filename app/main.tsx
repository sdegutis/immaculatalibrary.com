import 'source-map-support/register';
import { makeRequestHandler, Server } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';
import './load-route-files';

persisted.server ??= new Server(8080);
persisted.server.handler = makeRequestHandler(makeRouteHandler(loadRoutes()));
