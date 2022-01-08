import { Compiler } from "./compiler";
import { LiveItemMap } from "./db";
import { AsyncHandler, makeHandler } from "./http";
import { Updater } from "./updater";

interface Item {
  $id: string;
  $data: { [key: string]: any };
  [key: string]: any;
}

export interface BuildResult {
  routes: Map<string, AsyncHandler>;
  notFoundPage?: AsyncHandler;
  timers: NodeJS.Timer[];
}

export function buildSite(rawItems: LiveItemMap, updater: Updater, external: object): BuildResult {
  const output: BuildResult = {
    routes: new Map<string, AsyncHandler>(),
    timers: [],
  };

  const compiler = new Compiler();

  // Compile items
  const items: Item[] = [...rawItems].map(([id, raw]) => {
    const item: Item = Object.create(null);

    for (let [key, val] of Object.entries<any>(raw)) {
      if (typeof val?.['$eval'] === 'string') {
        item[key] = compiler.eval(`item[${id}][${key}]`, {
          this: item,
          body: val['$eval'],
        });
      }
    }

    Object.defineProperty(item, '$id', { value: id });
    Object.defineProperty(item, '$data', { value: raw });

    return item;
  });

  // Find booter
  const booters = items.filter(item => typeof item['$boot'] === 'function');
  if (booters.length !== 1) throw new Error(`Must have (1) $boot, got (${booters.length})`);
  const booter = booters[0]!;

  // Boot site
  const result = booter['$boot']({ items, updater, external });
  const routes = result['routes'];
  const timers = result['timers'];
  const notFoundPage = result['notFoundPage'];
  const onRouteError = result['onRouteError'];

  // Add routes
  if (typeof routes !== 'object') {
    throw new Error(`Expected routes object, got ${typeof routes}`);
  }
  for (const [path, fn] of Object.entries(routes)) {
    if (typeof fn !== 'function') continue;
    if (!path.match(/^[A-Z]+ \//)) continue;
    output.routes.set(path, makeHandler(fn, onRouteError, updater));
  }
  if (output.routes.size === 0) throw new Error('No routes were created.');

  // Set 404 handler
  if (typeof notFoundPage === 'function') {
    output.notFoundPage = makeHandler(notFoundPage, onRouteError, updater);
  }

  // Prepare timers
  if (Array.isArray(timers)) {
    try {
      for (const { ms, fn } of timers) {
        output.timers.push(setInterval(fn, ms));
      }
    }
    catch (e) {
      output.timers.forEach(clearInterval);
      throw e;
    }
  }

  return output;
}
