import { randomUUID } from "crypto";
import { buildSite } from "./build";
import { Database, LiveItemMap, SerializableObject } from "./db";
import { RoutingMiddleware } from "./http";
import { Updater } from "./updater";

export default class App {

  #siteMiddleware = new RoutingMiddleware();
  routeMiddleware = this.#siteMiddleware.middleware;

  #items!: LiveItemMap;
  timers: NodeJS.Timer[] = [];
  #staged = new Map<string, SerializableObject>();

  constructor(
    private db: Database,
    private external: object,
  ) { }

  async start() {
    this.#items = await this.db.load();
    console.log(`Loaded ${this.#items.size} items`);
    this.rebuild();
  }

  rebuild() {
    console.log("Rebuilding site");

    const tryingItems: LiveItemMap = new Map(this.#items);
    this.applyStagedChangesTo(tryingItems);
    const newSite = buildSite(tryingItems, new Updater(this), this.external);

    console.log("Rebuilt site successfully");

    if (this.#staged.size > 0) {
      this.applyStagedChangesTo(this.#items);
      this.#staged.clear();
      this.db.save([...this.#staged.keys()]);
    }

    this.timers.forEach(clearInterval);
    this.timers = newSite.timers;

    this.#siteMiddleware.routes = newSite.routes;
    this.#siteMiddleware.notFoundHandler = newSite.notFoundPage;
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

  hasStagedChanges() {
    return this.#staged.size > 0;
  }

  create(data: SerializableObject) {
    let id;
    do { id = randomUUID() }
    while (this.#items.has(id) && this.#staged.has(id));

    this.put(id, data);
    return id;
  }

  put(id: string, data: SerializableObject | null) {
    this.#staged.set(id, JSON.parse(JSON.stringify(data)));
  }

};
