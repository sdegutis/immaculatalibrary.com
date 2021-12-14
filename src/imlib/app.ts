import express from 'express';
import { Database, LiveItemMap, SerializableObject } from "./db";
import { RoutingMiddleware } from "./http";
import { Site } from "./site";

export default class App {

  #siteMiddleware = new RoutingMiddleware();
  routeMiddleware = this.#siteMiddleware.middleware;

  public db;
  private sandbox;
  private idgen: () => string;
  public items!: LiveItemMap;
  #site: Site | undefined;

  constructor(opts: {
    db: Database,
    server: express.Application,
    sandbox: object,
    generateId: () => string,
  }) {
    this.db = opts.db;
    this.sandbox = opts.sandbox;
    this.idgen = opts.generateId;
  }

  async start() {
    this.items = await this.db.load();
    this.rebuild();
  }

  rebuild() {
    const firstTime = this.#site === undefined;
    let site;
    try {
      site = new Site(this, this.sandbox)
    }
    catch (e) {
      console.log(e);
    }

    if (site) {
      this.#site?.stop();
      this.#site = site;
      this.#site.start();
      this.#siteMiddleware.routes = this.#site.routes;

      if (!firstTime) {
        this.db.push();
      }
    }
  }

  create(data: SerializableObject) {
    let id;
    do { id = this.idgen() } while (this.items.has(id));
    // TODO: handle rare case where all ids are taken

    this.db.put(id, JSON.parse(JSON.stringify(data)));
    return id;
  }

  put(id: string, data: SerializableObject | null) {
    return this.db.put(id, JSON.parse(JSON.stringify(data)));
  }

};
