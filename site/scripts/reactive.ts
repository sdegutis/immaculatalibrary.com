export class Reactive<T> {

  #fns: (() => void)[] = [];

  constructor(public val: T) { }

  onChange(fn: () => void) {
    fn();
    this.#fns.push(fn);
  }

  set(val: T) {
    if (val === this.val) return;

    this.val = val;
    for (const fn of this.#fns) {
      fn();
    }
  }

}
