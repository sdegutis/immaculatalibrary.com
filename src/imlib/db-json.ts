import fs from 'fs';
import { Database, LiveItemMap } from './db';

export default class JsonFileDatabase implements Database {

  #items: LiveItemMap = new Map();

  constructor(private filepath: string) { }

  async load() {
    if (fs.existsSync(this.filepath)) {
      const contents = fs.readFileSync(this.filepath, 'utf8');
      const map = JSON.parse(contents);
      this.#items = new Map(Object.entries(map)
        .map(([k, v]) => [k, Object.freeze(v)]));
    }
    return this.#items;
  }

  // Note: this is super inefficient
  // but it shouldn't be used long-term
  save(ids: Iterable<string>) {
    const everything = Object.fromEntries(this.#items);
    const content = JSON.stringify(everything, null, 2);
    fs.writeFileSync(this.filepath, content);
  }

}
