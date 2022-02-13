import mime from "mime";
import { notFoundPage } from "../pages/errors/404";
import { errorPage } from "../pages/errors/500";
import { makeSitemap } from "./sitemap";

export type RouteMethod = 'GET' | 'POST';

export type RouteMeta = {
  lastModifiedDate?: string;
  public?: boolean;
};

export interface Routeable {
  route: string;
  method: RouteMethod;
  handle: RouteHandler;
  meta?: RouteMeta;
}

const allRoutes = new Map<string, RouteHandler>();

const forSitemap: Routeable[] = [];

export function addRouteable(routeable: Routeable) {
  if (routeable.method === 'GET' && (routeable.meta?.public ?? true)) {
    forSitemap.push(routeable);
  }

  addRoute(`${routeable.method} ${routeable.route}`, (input) => routeable.handle(input));
}

function addRoute(route: string, handler: RouteHandler) {
  if (allRoutes.has(route)) {
    throw new Error(`Duplicate route: ${route}`);
  }

  allRoutes.set(route, handler);
}

export function loadRoutes() {
  addRouteable(makeSitemap(forSitemap));
  return allRoutes;
}

export function makeRouteHandler(routes: Map<string, RouteHandler>): RouteHandler {
  return (input: RouteInput): RouteOutput => {
    if (input.headers['host'] !== input.url.host) {
      return { status: 302, headers: { 'Location': input.url.href } };
    }

    if (input.url.pathname.endsWith('/') && input.url.pathname !== '/') {
      return { status: 302, headers: { 'Location': input.url.pathname.slice(0, -1) } };
    }

    const key = `${input.method} ${input.url.pathname}`;
    const handler = routes.get(key);
    let output: RouteOutput;

    try {
      if (handler) {
        output = handler(input);
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
