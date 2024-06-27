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

let ease = easeInOut;

function easeInOut(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export function changeEase() {
  ease = ease === easeInOut ? sillyEase : easeInOut;
}

function sillyEase(x: number): number {
  const c4 = (2 * Math.PI) / 3;
  return x === 0
    ? 0
    : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}
