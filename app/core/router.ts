import { makeSitemap } from "./sitemap";

export type RouteMethod = 'GET';

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

  return routeable;
}

function addRoute(route: string, handler: RouteHandler) {
  if (allRoutes.has(route)) {
    console.log(`Duplicate route: ${route}`);
    return;
  }

  allRoutes.set(route, handler);
}

export function loadRoutes() {
  addRouteable(makeSitemap(forSitemap));
  return allRoutes;
}
