export interface Navable<T> {
  next?: T
  prev?: T
}

export class Nav<T extends Navable<T>> {

  first!: T
  last!: T
  current!: T

  constructor(ts?: T[]) {
    for (const t of ts ?? []) {
      this.add(t)
    }
  }

  add(t: T) {
    if (!this.first) {
      this.current = this.first = this.last = t
      return
    }

    this.last.next = t
    t.prev = this.last
    this.last = t
  }

  [Symbol.iterator]() {
    let node: T | undefined = this.first
    return (function* () {
      while (node) {
        yield node
        node = node.next
      }
    })()
  }

}

export class CircularNav<T extends Navable<T>> extends Nav<T> {

  override add(t: T): void {
    super.add(t)

    this.last.next = this.first
    this.first.prev = this.last
  }

}
