import easesLib from 'https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm';
import { Nav, Navable } from './$nav.js';
import { notify } from './$notify.js';

class CircularNav<T extends Navable<T>> extends Nav<T> {

  override add(t: T): void {
    super.add(t);

    this.last.next = this.first;
    this.first.prev = this.last;
  }

}

const eases = new CircularNav<Ease>();

class Ease implements Navable<Ease> {

  next: Ease | undefined;
  prev: Ease | undefined;

  constructor(
    public name: string,
    public fn: (t: number) => number,
  ) { }

}

class Animation {

  running = false;

  constructor(
    private container: HTMLElement,
    private duration: number,
    private to: { x: number, y: number },
  ) { }

  start() {
    this.running = true;

    const startPos = {
      x: this.container.scrollLeft,
      y: this.container.scrollTop,
    };

    const startedAt = +document.timeline.currentTime!;

    const step = () => {
      requestAnimationFrame(time => {
        if (!this.running) return;

        const percentDone = (time - startedAt) / this.duration;
        if (percentDone >= 1) {
          this.container.scrollLeft = this.to.x;
          this.container.scrollTop = this.to.y;
          return;
        }

        const percentToAnimate = eases.current.fn(percentDone);

        const x = (this.to.x - startPos.x) * percentToAnimate + startPos.x;
        const y = (this.to.y - startPos.y) * percentToAnimate + startPos.y;

        this.container.scrollLeft = x;
        this.container.scrollTop = y;

        step();
      });
    };
    step();
  }

  stop() {
    this.running = false;
  }

}

const animations = new Map<HTMLElement, Animation>();

export function animateTo(container: HTMLElement, duration: number, to: { x: number, y: number }) {
  const found = animations.get(container);
  if (found) {
    found.stop();
  }

  const anim = new Animation(container, duration, to);
  anim.start();

  animations.set(container, anim);
}

eases.add(new Ease('expo', easesLib.expoOut));
eases.add(new Ease('cubic', easesLib.cubicOut));
eases.add(new Ease('elastic', easesLib.elasticOut));
eases.add(new Ease('back', easesLib.backOut));
eases.add(new Ease('bounce', easesLib.bounceOut));
eases.add(new Ease('circ', easesLib.circOut));
eases.add(new Ease('linear', easesLib.linear));
eases.add(new Ease('quad', easesLib.quadOut));
eases.add(new Ease('quart', easesLib.quartOut));
eases.add(new Ease('quint', easesLib.quintOut));
eases.add(new Ease('sine', easesLib.sineOut));

export function nextEase() {
  eases.current = eases.current.next!;
  notify(eases.current.name);
}

export function prevEase() {
  eases.current = eases.current.prev!;
  notify(eases.current.name);
}
