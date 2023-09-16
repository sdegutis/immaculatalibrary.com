import path from 'path';
import 'source-map-support/register';
import { loadRoutes } from './core/router';
import './load-route-files';

const routes = loadRoutes();

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
