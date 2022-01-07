import { randomUUID } from "crypto";
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
    console.log(`Loaded ${this.#items.size} items`);
    this.rebuild();
  }

  rebuild() {
    console.log("Rebuilding site");
    const result = this.buildNewSite();
    if ('site' in result) {
      console.log("Rebuilt site successfully");
      this.pushToDb();

      this.#site?.stop();
      this.#site = result.site;
      this.#site.start();

      this.#siteMiddleware.routes = this.#site.routes;
      this.#siteMiddleware.notFoundHandler = this.#site.notFoundPage;
    }
    else {
      console.error('Error building site:');
      console.error(result.error);
    }
    this.#staged.clear();
    return result;
  }

  private pushToDb() {
    if (this.#staged.size > 0) {
      this.applyStagedChangesTo(this.#items);
      this.#db.save([...this.#staged.keys()]);
    }
  }

  private applyStagedChangesTo(items: LiveItemMap) {
    for (const [id, data] of this.#staged) {
      if (typeof data === 'object' && data !== null) {
        items.set(id, data);
      }
      else {
        items.delete(id);
      }
    }
  }

  private buildNewSite(): { site: Site, viewSite: ViewSite } | { error: any } {
    try {
      const items: LiveItemMap = new Map(this.#items);
      this.applyStagedChangesTo(items);

      const viewSite = new ViewSite(this);
      const site = new Site(viewSite, items, this.#sandbox);
      return { site, viewSite };
    }
    catch (e) {
      return { error: e }
    }
  }

  hasStagedChanges() {
    return this.#staged.size > 0;
  }

  create(data: SerializableObject) {
    let id;
    do { id = randomUUID() }
    while (this.#items.has(id) && this.#staged.has(id));

    this.#staged.set(id, JSON.parse(JSON.stringify(data)));
    return id;
  }

  put(id: string, data: SerializableObject | null) {
    this.#staged.set(id, JSON.parse(JSON.stringify(data)));
  }

};

export class ViewSite {

  #app;
  constructor(app: App) {
    this.#app = app;
  }

  create(data: object) {
    if (typeof data !== 'object') throw new Error('site.create() must be given object');
    const serializable = JSON.parse(JSON.stringify(data));
    return this.#app.create(serializable);
  }

  update(id: string, data: object) {
    if (typeof data !== 'object') throw new Error('site.update() must be given object');
    const serializable = JSON.parse(JSON.stringify(data));
    this.#app.put(id, serializable);
  }

  delete(id: string) {
    this.#app.put(id, null);
  }

  rebuild() {
    const result = this.#app.rebuild();
    if ('viewSite' in result) return result.viewSite;
    throw result.error;
  }

  rebuildIfNeeded() {
    if (this.#app.hasStagedChanges()) {
      this.rebuild();
    }
  }

}
