import { Compiler } from "./compiler";
import { LiveItemMap, SerializableObject } from "./db";
import { makeItemRequestHandler, Route, RouteHandler, RouteInput, RouteOutput } from "./http";
import { Updater } from "./updater";

interface Item {
  $$id: string;
  $$data: ItemData;
  $$boot?: Boot;
  [key: string]: any | Function;
}

interface ItemData extends Readonly<SerializableObject> {
  [key: string]: any | { $$eval?: string };
  $$boot?: { $$eval?: string };
};

type Boot = (site: {
  items: Item[],
  updater: Updater,
  external: any,
}) => {
  routes: Record<Route, (input: RouteInput) => RouteOutput>,
  timers?: { ms: number, fn: Function }[],
  notFoundPage?: (input: RouteInput) => RouteOutput,
  onRouteError?: (input: RouteInput, error: any) => RouteOutput,
  onTimerError?: (error: any) => void,
};

export interface BuildResult {
  routes: Map<string, RouteHandler>;
  notFoundPage?: RouteHandler;
  timers: NodeJS.Timer[];
}

export function buildSite(rawItems: LiveItemMap, updater: Updater, external: object): BuildResult {
  const output: BuildResult = {
    routes: new Map<string, RouteHandler>(),
    timers: [],
  };

  const compiler = new Compiler();

  // Compile items
  const items: Item[] = [...rawItems].map(([id, raw]) => {
    const item: Item = Object.create(null);

    for (let [key, val] of Object.entries(raw as ItemData)) {
      if (typeof val?.['$$eval'] === 'string') {
        val = compiler.eval(`item[${id}][${key}]`, {
          this: item,
          body: val['$$eval'],
        });
      }
      item[key] = val;
    }

    Object.defineProperty(item, '$$id', { value: id });
    Object.defineProperty(item, '$$data', { value: raw });

    return item;
  });

  // Find booter
  const booters = items.filter(item => typeof item['$$boot'] === 'function');
  if (booters.length !== 1) {
    throw new Error(`Must have (1) $$boot, got (${booters.length})`);
  }
  const booter = booters[0]!;
  const bootFn = booter['$$boot']!;

  // Boot site
  const result = bootFn({ items, updater, external });
  const routes = result['routes'];
  const timers = result['timers'];
  const notFoundPage = result['notFoundPage'];
  const onRouteError = result['onRouteError'];
  const onTimerError = result['onTimerError'] ?? ((e: any) => { throw e });

  // Add routes
  if (typeof routes !== 'object') {
    throw new Error(`Expected routes object, got ${typeof routes}`);
  }

  for (const [path, fn] of Object.entries<RouteHandler>(routes)) {
    if (typeof fn !== 'function') continue;
    if (!path.match(/^[A-Z]+ \//)) continue;

    const route: Route = path as Route;
    const itemRequestHandler = makeItemRequestHandler(fn, onRouteError, updater);

    output.routes.set(route, itemRequestHandler);
  }

  if (output.routes.size === 0) {
    throw new Error('No routes were created.');
  }

  // Set 404 handler
  if (typeof notFoundPage === 'function') {
    output.notFoundPage = makeItemRequestHandler(notFoundPage, onRouteError, updater);
  }

  // Prepare timers
  if (Array.isArray(timers)) {
    try {
      for (const { ms, fn } of timers) {
        output.timers.push(setInterval(() => {
          try {
            fn();
          }
          catch (e) {
            try {
              onTimerError(e);
            }
            catch (e) {
              console.error('Error handling timer error:', e);
            }
          }
        }, ms));
      }
    }
    catch (e) {
      output.timers.forEach(clearInterval);
      throw e;
    }
  }

  return output;
}
