import { Compiler } from "./compiler";
import { SerializableObject } from "./db";

export interface ViewItem {
  $id: string;
  $data: { [key: string]: any };
  $items: ViewItem[];
  $type: ViewItem | undefined;
}

export class Item {

  type: Item | null = null;
  items: Item[] = [];
  data = Object.create(null);
  globals = Object.create(null);
  viewItem: ViewItem = Object.create(null);

  constructor(
    public readonly id: string,
    public readonly raw: SerializableObject,
  ) { }

  compute(compiler: Compiler, target: any) {
    for (const [key, val] of Object.entries<any>(target)) {
      if (typeof val?.$eval === 'string') {
        target[key] = compiler.eval({
          this: this.viewItem,
          globals: this.globals,
          body: val.$eval,
        });
      }
    }
  }

  copyInto(target: any, getData: (id: string) => any) {
    this.type?.copyInto(target, getData);
    Object.assign(target, getData(this.id));
  }

  buildViewItem() {
    Object.assign(this.viewItem, this.data);
    hardSet(this.viewItem, '$id', this.id);
    hardSet(this.viewItem, '$data', this.raw);
    hardSet(this.viewItem, '$items', this.items.map(it => it.viewItem));
    hardSet(this.viewItem, '$type', this.type?.viewItem);
  }

  fn(key: string): Function | undefined {
    const val = this.data[key];
    if (val === null || val === undefined) return undefined;
    return (val instanceof Function ? val : () => val);
  }

}

function hardSet(target: any, key: string, value: any) {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
  });
}
