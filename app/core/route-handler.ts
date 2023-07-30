import mime from "mime";
import { redirectResponse } from "./helpers";
import path from "path";

export function notFoundPage(input: RouteInput): RouteOutput {
  return {
    status: 404,
    body: Buffer.from('Page not found'),
  };
}

export function errorPage(input: RouteInput): RouteOutput {
  return {
    status: 500,
    body: Buffer.from('An error happened (not your fault)'),
  };
}

export function makeRouteHandler(routes: Map<string, RouteHandler>): FullRouteHandler {
  return (input: RouteInput): RouteOutput => {
    if (input.headers['host'] !== input.url.host) {
      return redirectResponse(input.url.href);
    }

    if (input.url.pathname.endsWith('/')) {
      return redirectResponse(path.join(input.url.pathname, 'index.html'));
    }

    const key = `${input.method} ${input.url.pathname}`;
    const handler = routes.get(key);
    let output: RouteOutput;

    try {
      if (handler) {
        output = handler();
      }
      else {
        output = notFoundPage(input);
      }
    }
    catch (e) {
      console.error(e);
      output = errorPage(input);
    }

    output.headers ??= {};
    output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
    output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

    return output;
  };
}
