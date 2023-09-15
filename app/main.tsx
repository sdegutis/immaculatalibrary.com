import fs from 'fs';
import path from 'path';
import 'source-map-support/register';
import { createPersistentServer, makeRequestHandler } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';
import './load-route-files';

const routes = loadRoutes();

let server: ReturnType<typeof createPersistentServer> = (persisted['server'] ??= createPersistentServer(8080));
server.httpHandler = makeRequestHandler(makeRouteHandler(routes));

// generateSite();

async function generateSite() {
  // await rimraf('docs');
  for (const [route, handler] of routes) {
    const filepath = path.join('docs', route);
    const body = handler().body!;
    // console.log(filepath);

    // await mkdirp(path.dirname(filepath));
    // fs.writeFileSync(filepath, body);
  }
  // fs.writeFileSync('docs/CNAME', 'www.immaculatalibrary.com');

  console.log('Done generating site.');
};
