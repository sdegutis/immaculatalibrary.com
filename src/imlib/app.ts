import { v4 as uuidv4 } from 'uuid';
import { Database, LiveItemMap, SerializableObject } from "./db";
import { RoutingMiddleware } from "./http";
import { Site } from "./site";

export default class App {

  #siteMiddleware = new RoutingMiddleware();
  routeMiddleware = this.#siteMiddleware.middleware;

  #db;
  #sandbox;
  #items!: LiveItemMap;
  #site: Site | undefined;
  #staged = new Map<string, SerializableObject>();

  constructor(opts: {
    db: Database,
    sandbox: object,
  }) {
    this.#db = opts.db;
    this.#sandbox = opts.sandbox;
  }

  async start() {
    this.#items = await this.#db.load();
    this.rebuild();
  }

  rebuild() {
    const { site, error } = this.buildNewSite();
    if (site) {
      this.pushToDb();

      this.#site?.stop();
      this.#site = site;
      this.#site.start();
      this.#siteMiddleware.routes = this.#site.routes;
    }
    else {
      console.error('Error building site:');
      console.error(error);
    }
    return { site, error };
  }

  private pushToDb() {
    if (this.#staged.size === 0) return;

    for (const [id, data] of this.#staged) {
      if (typeof data === 'object' && data !== null) {
        this.#items.set(id, data);
      }
      else {
        this.#items.delete(id);
      }
    }

    this.#db.save([...this.#staged.keys()]);
    this.#staged.clear();
  }

  private buildNewSite(): { site: Site, error?: undefined } | { site?: undefined, error: any } {
    try {
      const items: LiveItemMap = new Map();

      for (const [id, raw] of this.#items) {
        items.set(id, raw);
      }

      for (const [id, raw] of this.#staged) {
        items.set(id, raw);
      }

      return { site: new Site(items, this, this.#sandbox) };
    }
    catch (e) {
      return { error: e }
    }
  }

  create(data: SerializableObject) {
    let id;
    do { id = uuidv4() }
    while (this.#items.has(id));

    this.#staged.set(id, JSON.parse(JSON.stringify(data)));
    return id;
  }

  put(id: string, data: SerializableObject | null) {
    this.#staged.set(id, JSON.parse(JSON.stringify(data)));
  }

};
