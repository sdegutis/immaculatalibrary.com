import App from './app';
import { Compiler } from "./compiler";
import { LiveItemMap } from "./db";
import { AsyncHandler, makeHandler } from "./http";
import { Item, ViewItem } from "./item";

const verbs = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options'];

function getNamed(items: ViewItem[], path: string[]): ViewItem | null {
  const name = path.shift();
  const item = items.find(i => i.$data['$name'] === name);
  if (!item) return null;
  if (path.length === 0) return item;
  return getNamed(item.$items, path);
}

export class ViewSite {

  #site;
  constructor(site: Site) {
    this.#site = site;
  }

  get root() {
    return this.#site.root;
  }

  named(...path: string[]) {
    if (path.length === 0) return null;
    return getNamed(this.root, path);
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
    if (result.site) return result.site;
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

  root: ViewItem[] = [];
  viewItemsById: { [id: string]: ViewItem } = Object.create(null);


  constructor(
    items: LiveItemMap,
    public app: App,
    sandbox: object,
  ) {
    const compiler = new Compiler({
      ...sandbox,
      $site: new ViewSite(this),
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

    // Inherit figures, deepest ancestor first
    for (const [id, item] of this.itemsById) {
      item.type?.copyInto(item.data, id => this.itemsById.get(id)?.raw['$figure']);
      Object.assign(item.data, item.raw);
    }

    // Build $site.items
    for (const [id, item] of this.itemsById) {
      this.viewItemsById[id] = item.viewItem;
    }

    // Build $site.root
    for (const [id, item] of this.itemsById) {
      if (!item.type) {
        this.root.push(item.viewItem);
      }
    }

    // We have to do this first
    for (const [id, item] of this.itemsById) {
      item.compute(compiler, item.data, item.data);
      item.populateViewItem();
    }

    // Now all associations will be built
    for (const [id, item] of this.itemsById) {
      // Handle timers
      const tick = item.fn('$tick');
      const ms = item.fn('$ms')?.();
      if (typeof tick === 'function' && typeof ms === 'number') {
        this.#timers.add({ fn: tick, ms, id: null });
      }

      // Add routes
      const path = item.fn('$route')?.();
      if (path) {
        for (const verb of verbs) {
          const fn = item.fn('$' + verb);
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

    for (const [id, item] of this.itemsById) {
      if (item.type === null) {
        item.boot();
      }
    }
  }

  stop() {
    // Stop timers
    for (const timer of this.#timers) {
      clearTimeout(timer.id!);
    }
  }

}
