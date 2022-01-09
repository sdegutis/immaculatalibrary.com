import { URLSearchParams } from "url";
import { Updater } from "./updater";

module Api {

  interface ItemData {

    [key: string]: any | ItemFunction<any>;

    $$boot?: ItemFunction<(this: Item, site: {
      items: Item[],
      updater: Updater,
      external: any,
    }) => {
      routes: Record<Route, (input: RouteInput) => RouteOutput>,
      timers?: { ms: number, fn: Function }[],
      notFoundPage?: (input: RouteInput) => RouteOutput,
      onRouteError?: (input: RouteInput, error: any) => RouteOutput,
      onTimerError?: (error: any) => void,
    }>;

  }

  interface Item {
    [key: string]: any;
  }

  interface ItemFunction<T extends (this: Item) => any> {
    $$eval: string & T;
  }

  type HttpVerb = Uppercase<string>;
  type Route = `${HttpVerb} /${string}`

  type RouteInput = {
    path: () => string,
    query: () => URLSearchParams,
    text: () => string,
    json: () => any,
    form: () => URLSearchParams,
    headers: () => unknown,
    session: unknown,
  };

  type RouteOutput = Promise<RouteOutput> | {
    status?: number,
    headers?: { [key: string]: string },
    data?: any,
  };

}
