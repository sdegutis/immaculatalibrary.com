import 'source-map-support/register';
import { createPersistentServer, makeRequestHandler } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';
import './load-route-files';

let server: ReturnType<typeof createPersistentServer> = (persisted['server'] ??= createPersistentServer(8080));
server.httpHandler = makeRequestHandler(makeRouteHandler(loadRoutes()));
