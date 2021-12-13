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

  compile(compiler: Compiler, target: any) {
    for (const [key, val] of Object.entries<any>(target)) {
      const isFn = (
        Array.isArray(val?.args) &&
        typeof val?.body === 'string'
      );
      if (isFn) {
        target[key] = compiler.createFn({
          this: this.viewItem,
          globals: this.globals,
          args: val.args,
          body: val.body
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
      const pathSegment = Object.create(null);
      pathSegment['$$'] = this.viewItem;
      target[name] = pathSegment;
      for (const subitem of this.items) {
        subitem.maybeAddNameTo(pathSegment);
      }
    }
  }

}
