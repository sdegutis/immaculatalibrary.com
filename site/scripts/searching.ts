export class Reactive<T> {

  static link<T>(fn: () => void, deps: Reactive<T>[]) {
    for (const dep of deps) {
      dep.onChange(fn);
    }
  }

  #fns: (() => void)[] = [];

  constructor(public val: T) { }

  onChange(fn: () => void) {
    this.#fns.push(fn);
  }

  set(val: T) {
    this.val = val;
    for (const fn of this.#fns) fn();
  }

}
