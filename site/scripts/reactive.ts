export class Reactive<T> {

  #fns: (() => void)[] = [];

  static from<T extends { [key: string]: Reactive<any> }, U>(
    deps: T,
    fn: (deps: T) => U,
  ): Reactive<U> {
    const r = new Reactive((fn(deps)));
    for (const d of Object.values(deps)) {
      d.onChange(() => r.set(fn(deps)));
    }
    return r;
  }

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
