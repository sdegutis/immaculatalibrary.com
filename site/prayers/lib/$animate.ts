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
  { name: 'backInOut', fn: easesLib.backInOut },
  { name: 'backIn', fn: easesLib.backIn },
  { name: 'backOut', fn: easesLib.backOut },
  { name: 'bounceInOut', fn: easesLib.bounceInOut },
  { name: 'bounceIn', fn: easesLib.bounceIn },
  { name: 'bounceOut', fn: easesLib.bounceOut },
  { name: 'circInOut', fn: easesLib.circInOut },
  { name: 'circIn', fn: easesLib.circIn },
  { name: 'circOut', fn: easesLib.circOut },
  { name: 'cubicInOut', fn: easesLib.cubicInOut },
  { name: 'cubicIn', fn: easesLib.cubicIn },
  { name: 'cubicOut', fn: easesLib.cubicOut },
  { name: 'elasticInOut', fn: easesLib.elasticInOut },
  { name: 'elasticIn', fn: easesLib.elasticIn },
  { name: 'elasticOut', fn: easesLib.elasticOut },
  { name: 'expoInOut', fn: easesLib.expoInOut },
  { name: 'expoIn', fn: easesLib.expoIn },
  { name: 'expoOut', fn: easesLib.expoOut },
  { name: 'linear', fn: easesLib.linear },
  { name: 'quadInOut', fn: easesLib.quadInOut },
  { name: 'quadIn', fn: easesLib.quadIn },
  { name: 'quadOut', fn: easesLib.quadOut },
  { name: 'quartInOut', fn: easesLib.quartInOut },
  { name: 'quartIn', fn: easesLib.quartIn },
  { name: 'quartOut', fn: easesLib.quartOut },
  { name: 'quintInOut', fn: easesLib.quintInOut },
  { name: 'quintIn', fn: easesLib.quintIn },
  { name: 'quintOut', fn: easesLib.quintOut },
  { name: 'sineInOut', fn: easesLib.sineInOut },
  { name: 'sineIn', fn: easesLib.sineIn },
  { name: 'sineOut', fn: easesLib.sineOut },
];

let easeIndex = 0;
let ease = eases[easeIndex]!.fn;

export function nextEase() {
  easeIndex++;
  if (easeIndex >= eases.length) easeIndex = 0;
  ease = eases[easeIndex]!.fn;
  notify(eases[easeIndex]!.name);
}

export function prevEase() {
  easeIndex--;
  if (easeIndex < 0) easeIndex = eases.length - 1;
  ease = eases[easeIndex]!.fn;
  notify(eases[easeIndex]!.name);
}
