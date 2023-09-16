import path from 'path';
import 'source-map-support/register';
import { loadRoutes } from './core/router';
import './load-route-files';

const out = __dir.dirsByName['site']!.clone(null);

// for (const [route, handler] of loadRoutes()) {
//   const filepath = path.join('docs', route);
//   const body = handler().body!;
//   out.set(filepath, body);
// }

export default out;
