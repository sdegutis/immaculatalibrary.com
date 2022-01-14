import { URL } from 'url';
import { Updater } from './updater';

type HttpVerb = Uppercase<string>;
export type Route = `${HttpVerb} /${string}`

export interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: { [name: Lowercase<string>]: string };
  body: Buffer;
}

interface FinalRouteOutput {
  status?: number;
  headers?: object;
  body?: string | Buffer;
}

export type RouteOutput = FinalRouteOutput | Promise<FinalRouteOutput>;

export type RouteHandler = (input: RouteInput) => RouteOutput;

export class Router {

  routes = new Map<string, (input: RouteInput) => RouteOutput>();
  notFoundHandler: ((input: RouteInput) => RouteOutput) | undefined;

  handle = async (input: RouteInput): Promise<RouteOutput> => {
    const path = `${input.method} ${input.url.pathname}`;
    const handler = this.routes.get(path) ?? this.notFoundHandler;

    if (!handler) {
      return { status: 404, body: "Page not found." };
    }

    try {
      return await handler(input);
    }
    catch (e) {
      console.error(e);
      return { status: 500, body: "An error occurred." }
    }
  };

}

export function makeItemRequestHandler(fn: Function, onRouteError: any, updater: Updater) {
  return async (input: RouteInput) => {
    let output: RouteOutput;
    try {
      output = await fn(input);
      updater.rebuildIfNeeded();
      return output;
    }
    catch (e) {
      if (typeof onRouteError !== 'function') {
        throw e;
      }
      output = onRouteError(input, e);
      updater.rebuildIfNeeded();
      return output;
    }
  };
}
