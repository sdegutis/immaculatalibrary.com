import { EnrichedInput } from "../auth/login";
import { makeSitemap } from "./sitemap";

type EnrichedRouteHandler = (input: EnrichedInput) => RouteOutput;

export type RouteMethod = 'GET' | 'POST';

export interface Routeable {
  route: string;
  method: RouteMethod;
  handle: EnrichedRouteHandler;
  lastModifiedDate?: Date;
}

const allRoutes = new Map<string, EnrichedRouteHandler>();

const forSitemap: Routeable[] = [];

export function addRouteable(routeable: Routeable) {
  if (routeable.method === 'GET' && !routeable.route.startsWith('/admin')) {
    forSitemap.push(routeable);
  }

  addRoute(`${routeable.method} ${routeable.route}`, (input) => routeable.handle(input));
}

function addRoute(route: string, handler: EnrichedRouteHandler) {
  if (allRoutes.has(route)) {
    throw new Error(`Duplicate route: ${route}`);
  }

  allRoutes.set(route, handler);
}

export function loadRoutes() {
  addRouteable(makeSitemap(forSitemap));
  return allRoutes;
}
