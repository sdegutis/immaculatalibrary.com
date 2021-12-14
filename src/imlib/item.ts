import { Compiler } from "./compiler";
import { SerializableObject } from "./db";

export class Item {

  type: Item | null = null;
  items: Item[] = [];
  data = Object.create(null);
  globals = Object.create(null);
  viewItem = Object.create(null);

  constructor(
    public readonly id: string,
    public readonly raw: SerializableObject,
  ) { }

  compute(compiler: Compiler, target: any) {
    for (const [key, val] of Object.entries<any>(target)) {
      if (typeof val?.eval === 'string') {
        target[key] = compiler.eval({
          this: this.viewItem,
          globals: this.globals,
          body: val.eval,
        });
      }
    }
  }

  copyInto(target: any, getData: (id: string) => any) {
    this.type?.copyInto(target, getData);
    Object.assign(target, getData(this.id));
  }

  nodePath() {
    let parts = [];
    for (let node: Item | null = this; node; node = node.type) {
      const name = node.raw['$name'];
      if (!name || typeof name !== 'string') break;
      parts.unshift({ node, name });
    }
    return parts;
  }

  buildViewItem() {
    Object.assign(this.viewItem, this.data);
    this.viewItem.$id = this.id;
    this.viewItem.$data = this.raw;
    this.viewItem.$items = this.items.map(it => it.viewItem);
    this.viewItem.$type = this.type?.viewItem;
  }

  fn(key: string): Function | undefined {
    const val = this.data[key];
    if (val === null || val === undefined) return undefined;
    return (val instanceof Function ? val : () => val);
  }

  maybeAddNameTo(target: any) {
    const name = this.raw['$name'];
    if (name && typeof name === 'string') {
      target['$$' + name] = this.viewItem;
      for (const subitem of this.items) {
        subitem.maybeAddNameTo(this.viewItem);
      }
    }
  }

}
