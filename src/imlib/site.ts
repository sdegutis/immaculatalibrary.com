import { ViewSite } from "./app";
import { Compiler } from "./compiler";
import { LiveItemMap } from "./db";
import { AsyncHandler, makeHandler } from "./http";

interface ViewItem {
  $id: string;
  $data: { [key: string]: any };
  [key: string]: any;
}

export class Site {

  public routes = new Map<string, AsyncHandler>();
  public notFoundPage?: AsyncHandler;

  #timers = new Set<{
    fn: Function,
    ms: number,
    id: NodeJS.Timer | null,
  }>();

  constructor(viewSite: ViewSite, rawItems: LiveItemMap, sandbox: any) {
    const compiler = new Compiler();

    // Compile items
    const viewItems: ViewItem[] = [...rawItems].map(([id, raw]) => {
      const viewItem: ViewItem = Object.create(null);

      for (let [key, val] of Object.entries<any>(raw)) {
        if (typeof val?.['$eval'] === 'string') {
          val = compiler.eval(`item[${id}][${key}]`, {
            this: viewItem,
            body: val['$eval'],
          });
        }
        viewItem[key] = val;
      }

      Object.defineProperty(viewItem, '$id', { value: id, enumerable: true });
      Object.defineProperty(viewItem, '$data', { value: raw, enumerable: true });

      return viewItem;
    });

    // Find booter
    const booters = viewItems.filter(item => typeof item['$boot'] === 'function');
    if (booters.length !== 1) throw new Error(`Must have (1) $boot, got (${booters.length})`);
    const booter = booters[0]!;

    // Boot site
    const result = booter['$boot']({
      site: viewSite,
      items: viewItems,
      sandbox,
    });

    // Handle response
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
      this.routes.set(path, makeHandler(fn, onRouteError, viewSite));
    }
    if (this.routes.size === 0) throw new Error('No routes were created.');

    // Set 404 handler
    if (typeof notFoundPage === 'function') {
      this.notFoundPage = makeHandler(notFoundPage, onRouteError, viewSite);
    }

    // Prepare timers
    if (Array.isArray(timers)) {
      for (const { ms, tick } of timers) {
        if (typeof tick === 'function' && typeof ms === 'number') {
          this.#timers.add({ fn: tick, ms, id: null });
        }
      }
    }
  }

  start() {
    // Start timers
    for (const timer of this.#timers) {
      timer.id = setInterval(() => timer.fn(), timer.ms);
    }
  }

  stop() {
    // Stop timers
    for (const timer of this.#timers) {
      clearTimeout(timer.id!);
    }
  }

}
