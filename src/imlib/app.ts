import { randomUUID } from "crypto";
import { BuildResult, buildSite } from "./build";
import { Database, LiveItemMap, SerializableObject } from "./db";
import { RoutingMiddleware } from "./http";
import { Updater } from "./updater";

export default class App {

  #siteMiddleware = new RoutingMiddleware();
  routeMiddleware = this.#siteMiddleware.middleware;

  #db;
  #sandbox;
  #items!: LiveItemMap;
  timers: NodeJS.Timer[] = [];
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
    const output = this.buildNewSite();
    if ('routes' in output) {
      console.log("Rebuilt site successfully");
      this.pushToDb();

      this.timers?.forEach(clearInterval);
      this.timers = output.timers;

      this.#siteMiddleware.routes = output.routes;
      this.#siteMiddleware.notFoundHandler = output.notFoundPage;
    }
    else {
      console.error('Error building site:');
      console.error(output.error);
    }
    this.#staged.clear();
    return output;
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

  private buildNewSite(): BuildResult | { error: any } {
    try {
      const items: LiveItemMap = new Map(this.#items);
      this.applyStagedChangesTo(items);

      const updater = new Updater(this);
      return buildSite(items, updater, this.#sandbox);
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
