import fs from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';
import { rimraf } from 'rimraf';
import 'source-map-support/register';
import { loadRoutes } from './core/router';
import './load-route-files';

const routes = loadRoutes();

(async () => {
  // await rimraf('site');
  for (const [route, handler] of routes) {
    const filepath = path.join('site', route.slice(4));
    console.log(filepath);
    const body = handler().body!;
    console.log(filepath, body.length);

    // await mkdirp(path.dirname(filepath));
    // fs.writeFileSync(filepath, body);
  }
})();
