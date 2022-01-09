import { App } from ".";

export class Updater {

  #app;
  constructor(app: App) {
    this.#app = app;
  }

  create(data: object) {
    if (typeof data !== 'object') throw new Error('data must be object or null');
    const serializable = JSON.parse(JSON.stringify(data));
    return this.#app.create(serializable);
  }

  update(id: string, data: object) {
    if (typeof id !== 'string') throw new Error('id must be string');
    if (typeof data !== 'object') throw new Error('data must be object or null');
    const serializable = JSON.parse(JSON.stringify(data));
    this.#app.put(id, serializable);
  }

  delete(id: string) {
    if (typeof id !== 'string') throw new Error('id must be string');
    this.#app.put(id, null);
  }

  rebuild() {
    this.#app.rebuild();
  }

  rebuildIfNeeded() {
    if (this.#app.hasStagedChanges()) {
      this.rebuild();
    }
  }

}
