import { App } from ".";

export class Updater {

  #app;
  constructor(app: App) {
    this.#app = app;
  }

  create(data: object) {
    if (typeof data !== 'object') throw new Error('updater.create(...) must be given object');
    const serializable = JSON.parse(JSON.stringify(data));
    return this.#app.create(serializable);
  }

  update(id: string, data: object) {
    if (typeof id !== 'string') throw new Error('updater.update(...) must be given string id');
    if (typeof data !== 'object') throw new Error('updater.update(...) must be given object');
    const serializable = JSON.parse(JSON.stringify(data));
    this.#app.put(id, serializable);
  }

  delete(id: string) {
    if (typeof id !== 'string') throw new Error('updater.delete(...) must be given string id');
    this.#app.put(id, null);
  }

  rebuild() {
    const result = this.#app.rebuild();
    if ('routes' in result) return true;
    throw result.error;
  }

  rebuildIfNeeded() {
    if (this.#app.hasStagedChanges()) {
      this.rebuild();
    }
  }

}
