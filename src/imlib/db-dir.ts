import fs from 'fs';
import path from 'path';
import { Database, LiveItemMap } from './db';

const RE = /^item-(.*?)\.json$/;

export default class JsonDirDatabase implements Database {

  #items: LiveItemMap = new Map();

  constructor(private dir: string) { }

  async load() {
    if (fs.existsSync(this.dir)) {
      const filenames = fs.readdirSync(this.dir);
      for (const filename of filenames) {
        const match = filename.match(RE);
        if (match && match[1]) {
          const id = match[1];
          const raw = fs.readFileSync(path.join(this.dir, filename), 'utf8');
          const parsed = Object.freeze(JSON.parse(raw));
          this.#items.set(id, parsed);
        }
      }
    }
    return this.#items;
  }

  save(ids: Iterable<string>) {
    for (const id of ids) {
      const entry = this.#items.get(id);
      const content = JSON.stringify(entry, null, 2);
      fs.writeFile(path.join(this.dir, `item-${id}.json`), content, () => { });
    }
  }

}
