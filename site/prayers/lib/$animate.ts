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
    public fn: (t: number) => number,
    public name: string,
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

eases.add(new Ease(easesLib.expoOut, 'expo'));
eases.add(new Ease(easesLib.cubicOut, 'cubic'));
eases.add(new Ease(easesLib.elasticOut, 'elastic'));
eases.add(new Ease(easesLib.backOut, 'back'));
eases.add(new Ease(easesLib.bounceOut, 'bounce'));
eases.add(new Ease(easesLib.circOut, 'circ'));
eases.add(new Ease(easesLib.linear, 'linear'));
eases.add(new Ease(easesLib.quadOut, 'quad'));
eases.add(new Ease(easesLib.quartOut, 'quart'));
eases.add(new Ease(easesLib.quintOut, 'quint'));
eases.add(new Ease(easesLib.sineOut, 'sine'));

export function nextEase() {
  eases.current = eases.current.next!;
  notify(eases.current.name);
}

export function prevEase() {
  eases.current = eases.current.prev!;
  notify(eases.current.name);
}
