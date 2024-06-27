import easesLib from 'https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm';

export function animateTo(container: HTMLElement, duration: number, to: { x: number, y: number }) {
  const startPos = {
    x: container.scrollLeft,
    y: container.scrollTop,
  };

  const startedAt = +document.timeline.currentTime!;

  const step = () => {
    requestAnimationFrame(time => {
      const percentDone = (time - startedAt) / duration;
      if (percentDone >= 1) {
        container.scrollLeft = to.x;
        container.scrollTop = to.y;
        return;
      }

      const percentToAnimate = ease(percentDone);

      const x = (to.x - startPos.x) * percentToAnimate + startPos.x;
      const y = (to.y - startPos.y) * percentToAnimate + startPos.y;

      container.scrollLeft = x;
      container.scrollTop = y;

      step();
    });
  };
  step();
}

const eases = [
  easesLib.expoOut,
  easesLib.quadInOut,
  easesLib.bounceOut,
  easesLib.backIn,
  easesLib.circOut,
];

let easeIndex = 0;
let ease = eases[easeIndex]!;

export function nextEase() {
  easeIndex++;
  if (easeIndex >= eases.length) easeIndex = 0;
  ease = eases[easeIndex]!;
}

export function prevEase() {
  easeIndex--;
  if (easeIndex < 0) easeIndex = eases.length - 1;
  ease = eases[easeIndex]!;
}
