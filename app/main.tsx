import mime from 'mime';
import 'source-map-support/register';
import { enrichAuth } from './auth/login';
import './core/load';
import { loadRoutes } from './core/router';
import { notFoundPage } from './pages/errors/404';
import { errorPage } from './pages/errors/500';

const routes = loadRoutes();

export function routeHandler(input: RouteInput): RouteOutput {
  const key = `${input.method} ${input.url.pathname}`;
  const handler = routes.get(key);
  let output: RouteOutput;

  try {
    if (handler) {
      output = enrichAuth(handler)(input);
    }
    else {
      output = enrichAuth(notFoundPage)(input);
    }
  }
  catch (e) {
    console.error(e);
    output = enrichAuth(errorPage)(input);
  }

  output.headers ??= {};
  output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
  output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

  return output;
};