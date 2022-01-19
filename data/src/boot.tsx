import 'source-map-support/register';
import { RouteHandler, RouteInput, RouteOutput } from '../../src/http';
import { md } from './helpers';
import { Snippet } from './snippet';

const routes = new Map<string, RouteHandler>();

routes.set('GET /index.html', input => ({
  status: 302,
  headers: { 'Location': '/' },
}));

routes.set('GET /', wrapAuth(input => ({
  headers: {
    'Content-Type': 'text/html'
  },
  body: md.render(`### this is cool`)
})));

export function routeHandler(input: RouteInput): RouteOutput {
  const key = `${input.method} ${input.url.pathname}`;
  const handler = routes.get(key);
  if (handler) {
    return handler(input);
  }
  return {
    body: 'not found'
  };
};

function wrapAuth(handler: (input: RouteInput & { isAdmin: boolean }) => RouteOutput): RouteHandler {
  return input => {
    return handler({ ...input, isAdmin: false });
  };
}
