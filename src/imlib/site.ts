import { Handler } from "express";
import App from './app';
import { Compiler } from "./compiler";
import { makeHandler } from "./http";
import { Item } from "./item";

type Normalized = {
  item: Item,
  self: { [key: string]: any },
  figure: { [key: string]: any },
  shadow: { [key: string]: any },
};

const verbs = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options'];

export class ViewSite {

  #site;
  constructor(site: Site) {
    this.#site = site;
  }

  get root() {
    return this.#site.root;
  }

  get items() {
    return ([...this.#site.itemsById.values()]
      .map(it => it.viewItem));
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
    this.#site.app.rebuild();
  }

}

export class Site {

  itemsById = new Map<string, Item>();

  routes = new Map<string, Handler>();

  #timers = new Set<{
    fn: Function,
    ms: number,
    id: NodeJS.Timer | null,
  }>();

  root = Object.create(null);


  constructor(
    public app: App,
    sandbox: object,
  ) {
    const compiler = new Compiler({
      ...sandbox,
      $site: new ViewSite(this),
      $: this.root,
    });

    // Create smart items
    for (const [id, raw] of app.items) {
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

    // Normalize data, figures, and shadows
    const normalized = new Map<string, Normalized>();
    for (const [id, item] of this.itemsById) {
      normalized.set(id, {
        item,
        self: normalize(item.raw),
        figure: normalize(item.raw['$figure']),
        shadow: normalize(item.raw['$shadow']),
      });
    }

    // Inherit shadows/figures, deepest ancestor first
    for (const [id, { item, self: data }] of normalized) {
      item.type?.copyInto(item.data, id => normalized.get(id)?.figure);
      item.type?.copyInto(item.globals, id => normalized.get(id)?.shadow);
      Object.assign(item.data, data);
    }

    for (const [id, item] of this.itemsById) {
      item.compile(compiler, item.data);
      item.compile(compiler, item.globals);

      // We have to do this first
      item.buildViewItem();

      // Build $ tree
      let root = this.root;
      for (const { name, node } of item.nodePath()) {
        if (!root[name]) root[name] = node.viewItem;
        root = node;
      }

      // Add id to $
      this.root[id] = item.viewItem;

      // Handle timers
      const tick = item.fn('$tick');
      const ms = item.fn('$ms')?.();
      if (tick instanceof Function && typeof ms === 'number') {
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
      item.fn('$boot')?.();
    }
  }

  stop() {
    // Stop timers
    for (const timer of this.#timers) {
      clearTimeout(timer.id!);
    }
  }

}

function normalize(source: any) {
  const data = Object.create(null);

  for (const [rawKey, rawVal] of Object.entries<any>(source || {})) {
    let key = rawKey;
    let val = rawVal;

    const match = rawKey.match(/^(.+?)(\(|\<)([a-zA-Z0-9_$, ]*?)(\)|\>)$/);
    if (match) {
      const [, innerKey, kind, argStr] = match;

      const args = (argStr?.split(/s*,\s*/g) ?? []);
      const body = (kind === '<'
        ? `return <>${rawVal}</>`
        : rawVal);

      key = innerKey!;
      val = { args, body };
    }

    data[key] = val;
  }

  return data;
}
