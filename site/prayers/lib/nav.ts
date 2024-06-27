export interface Navable<T> {
  next: T | undefined;
  prev: T | undefined;
}

export class Nav<T extends Navable<T>> {

  first!: T;
  current!: T;

  add(t: T) {
    if (!this.first) {
      this.current = this.first = t;
      return;
    }

    let last = this.first;
    while (last.next) last = last.next;

    last.next = t;
    t.prev = last;
  }

}
