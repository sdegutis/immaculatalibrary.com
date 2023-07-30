import { makeSitemap } from "./sitemap";

export type RouteMeta = {
  lastModifiedDate?: string;
};

export interface Routeable {
  route: string;
  handle: RouteHandler;
  meta?: RouteMeta;
}

const allRoutes = new Map<string, RouteHandler>();

const forSitemap: Routeable[] = [];

export function addRouteable(routeable: Routeable) {
  forSitemap.push(routeable);
  addRoute(routeable.route, () => routeable.handle());
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
