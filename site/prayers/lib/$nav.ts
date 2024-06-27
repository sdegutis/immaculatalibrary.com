export interface Navable<T> {
  next: T | undefined;
  prev: T | undefined;
}

export class Nav<T extends Navable<T>> {

  first!: T;
  last!: T;
  current!: T;

  add(t: T) {
    if (!this.first) {
      this.current = this.first = this.last = t;
      return;
    }

    this.last.next = t;
    t.prev = this.last;
    this.last = t;
  }

}
