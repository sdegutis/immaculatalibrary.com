import fs from 'fs';
import { Database, LiveItemMap } from './db';

export class JsonFileDatabase implements Database {

  #items: LiveItemMap = new Map();

  constructor(private path: string) { }

  async load() {
    if (fs.existsSync(this.path)) {
      const contents = fs.readFileSync(this.path, 'utf8');
      const map = JSON.parse(contents);
      this.#items = new Map(Object.entries(map)
        .map(([k, v]) => [k, Object.freeze(v)]));
    }
    return this.#items;
  }

  save(ids: Iterable<string>) {
    const everything = Object.fromEntries(this.#items);
    const content = JSON.stringify(everything, null, 2);
    fs.writeFileSync(this.path, content);
  }

}
