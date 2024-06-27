import easesLib from 'https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm';
import { notify } from './$notify.js';

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

        const percentToAnimate = ease(percentDone);

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

const eases = [
  easesLib.backInOut,
  easesLib.backIn,
  easesLib.backOut,
  easesLib.bounceInOut,
  easesLib.bounceIn,
  easesLib.bounceOut,
  easesLib.circInOut,
  easesLib.circIn,
  easesLib.circOut,
  easesLib.cubicInOut,
  easesLib.cubicIn,
  easesLib.cubicOut,
  easesLib.elasticInOut,
  easesLib.elasticIn,
  easesLib.elasticOut,
  easesLib.expoInOut,
  easesLib.expoIn,
  easesLib.expoOut,
  easesLib.linear,
  easesLib.quadInOut,
  easesLib.quadIn,
  easesLib.quadOut,
  easesLib.quartInOut,
  easesLib.quartIn,
  easesLib.quartOut,
  easesLib.quintInOut,
  easesLib.quintIn,
  easesLib.quintOut,
  easesLib.sineInOut,
  easesLib.sineIn,
  easesLib.sineOut,
];

let easeIndex = 0;
let ease = eases[easeIndex]!;

export function nextEase() {
  easeIndex++;
  if (easeIndex >= eases.length) easeIndex = 0;
  ease = eases[easeIndex]!;
  notify(ease.name);
}

export function prevEase() {
  easeIndex--;
  if (easeIndex < 0) easeIndex = eases.length - 1;
  ease = eases[easeIndex]!;
  notify(ease.name);
}
