import fs from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';
import { rimraf } from 'rimraf';
import 'source-map-support/register';
import { loadRoutes } from './core/router';
import './load-route-files';

const routes = loadRoutes();

(async () => {
  await rimraf('site');
  for (const [route, handler] of routes) {
    const filepath = route.slice(4);
    const dir = path.dirname(filepath);
    await mkdirp(path.join('site', dir));
    const body = handler().body!;
    fs.writeFileSync(path.join('site', filepath), body);
  }
})();
