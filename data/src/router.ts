import { RouteHandler } from "/../src/http";

export interface Routeable {
  route: string;
  get: RouteHandler;
  post?: RouteHandler;
  lastModifiedDate?: Date;
}

export const routes = new Map<string, RouteHandler>();

export function addRouteable(routeable: Routeable) {
  routes.set(`GET ${routeable.route}`, (input) => routeable.get(input));
  if (routeable.post) {
    routes.set(`POST ${routeable.route}`, (input) => routeable.post!(input));
  }
}
