import fs from 'fs';
import { Database, SerializableObject } from './db';

export default class JsonFileDatabase implements Database {

  #items = new Map<string, { readonly [key: string]: any }>();

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

  put(id: string, data: SerializableObject | null) {
    if (data) this.#items.set(id, data);
    else this.#items.delete(id);
  }

  // Note: this is super inefficient
  // but it shouldn't be used long-term
  push() {
    const everything = Object.fromEntries(this.#items);
    const content = JSON.stringify(everything, null, 2);
    fs.writeFileSync(this.filepath, content);
  }

}
