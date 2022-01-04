import App from './app';
import { Compiler } from "./compiler";
import { LiveItemMap } from "./db";
import { AsyncHandler, makeHandler } from "./http";
import { Item, ViewItem } from "./item";

const verbs = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options'];

export class ViewSite {

  #site;
  constructor(site: Site) {
    this.#site = site;
  }

  get items() {
    return this.#site.viewItemsById;
  }

  create(data: object) {
    if (typeof data !== 'object') throw new Error('site.create() must be given object');
    const serializable = JSON.parse(JSON.stringify(data));
    return this.#site.app.create(serializable);
  }

  update(id: string, data: object) {
    if (typeof data !== 'object') throw new Error('site.update() must be given object');
    const serializable = JSON.parse(JSON.stringify(data));
    this.#site.app.put(id, serializable);
  }

  delete(id: string) {
    this.#site.app.put(id, null);
  }

  rebuild() {
    const result = this.#site.app.rebuild();
    if (result.site) return result.site.viewSite;
    throw result.error;
  }

}

export class Site {

  itemsById = new Map<string, Item>();

  routes = new Map<string, AsyncHandler>();

  #timers = new Set<{
    fn: Function,
    ms: number,
    id: NodeJS.Timer | null,
  }>();

  viewItemsById: { [id: string]: ViewItem } = Object.create(null);

  readonly viewSite = new ViewSite(this);

  constructor(
    items: LiveItemMap,
    public app: App,
    sandbox: object,
  ) {
    const compiler = new Compiler({
      ...sandbox,
      $site: this.viewSite,
    });

    // Create smart items
    for (const [id, raw] of items) {
      const item = new Item(id, raw);
      this.itemsById.set(item.id, item);
    }

    // Link with type items
    for (const [id, item] of this.itemsById) {
      const typeId = item.raw['$type'];
      if (typeof typeId === 'string') {
        const type = this.itemsById.get(typeId);
        if (type !== item) {
          item.type = type ?? null;
        }
      }
    }

    // Break type cycles
    for (const [id, item] of this.itemsById) {
      const seen = new Set([item.id]);
      for (let node: Item | null = item; node; node = node.type) {
        if (node.type && seen.has(node.type.id)) {
          node.type = null;
          break;
        }
        seen.add(node.id);
      }
    }

    // Set children
    for (const [id, item] of this.itemsById) {
      if (item.type) item.type.items.push(item);
    }

    // Inherit figures
    for (const [id, item] of this.itemsById) {
      Object.assign(item.data, item.type?.raw['$figure']);
      Object.assign(item.data, item.raw);
    }

    // Build $site.items
    for (const [id, item] of this.itemsById) {
      this.viewItemsById[id] = item.viewItem;
    }

    // Compute functions and prepare view-items
    for (const [id, item] of this.itemsById) {
      item.compute(compiler, item.data, item.data);
      item.populateViewItem();
    }

    // Boot all items top-down
    for (const [id, item] of this.itemsById) {
      if (item.type === null) {
        item.boot();
      }
    }

    // Prepare timers
    for (const [id, item] of this.itemsById) {
      const tick = item.data['$tick'];
      const ms = item.data['$ms'];
      if (typeof tick === 'function' && typeof ms === 'number') {
        this.#timers.add({ fn: tick, ms, id: null });
      }
    }

    // Add routes
    for (const [id, item] of this.itemsById) {
      const path = item.data['$route']?.();
      if (path) {
        for (const verb of verbs) {
          const fn = item.data['$' + verb];
          if (fn) {
            const VERB = verb.toUpperCase();
            const key = `${VERB} ${path}`;
            this.routes.set(key, makeHandler(fn));
          }
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
