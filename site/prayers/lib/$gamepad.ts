import { nextEase, prevEase } from "./$animate.js";
import { changeNavButtons } from "./$easteregg1.js";
import { tabNav } from "./$tab.js";

const enum Button {
  A, B, X, Y,
  L, R, ZL, ZR,
  MINUS, PLUS,
  LTRIGGER, RTRIGGER,
  UP, DOWN, LEFT, RIGHT,
  HOME,
}

const gamepad = () => navigator.getGamepads().find(c => c)!;

const gamepadActions = new Map<number, () => void>([
  [Button.L, () => { tabNav.current.prev?.focus(); }],
  [Button.R, () => { tabNav.current.next?.focus(); }],

  [Button.ZL, () => { prevEase(); }],
  [Button.ZR, () => { nextEase(); }],

  [Button.B, () => { changeNavButtons(); }],

  [Button.RIGHT, () => { tabNav.current.panelNav.current.next?.focus(); }],
  [Button.LEFT, () => { tabNav.current.panelNav.current.prev?.focus(); }],

  [Button.DOWN, () => { tabNav.current.panelNav.current.nextLine(); }],
  [Button.UP, () => { tabNav.current.panelNav.current.prevLine(); }],
]);

let ticks = 0;
let lastMovedFromY = 0;

function handleController() {
  const currentMs = ticks++ * (1000 / 33);

  for (const [button, fn] of gamepadActions.entries()) {
    if (pressed(button)) {
      fn();
      return;
    }
  }

  const y = gamepad().axes[1]!;
  const MAX_LINES_PER_SEC = 10;

  const linesToMovePerSec = Math.abs(Math.round(y * MAX_LINES_PER_SEC));

  if (linesToMovePerSec > 0) {
    const msDelayBetweenMoves = 1000 / linesToMovePerSec;
    const enoughTimeHasPassed = (currentMs - lastMovedFromY) > msDelayBetweenMoves;

    if (enoughTimeHasPassed) {
      lastMovedFromY = currentMs;

      if (y > 0) {
        tabNav.current.panelNav.current.nextLine();
      }
      else if (y < 0) {
        tabNav.current.panelNav.current.prevLine();
      }
    }
  }

}

const pressMap = new Map<number, number>();

function pressed(button: number) {
  if (!gamepad().buttons[button]!.pressed) return false;

  const lastPressed = pressMap.get(button) ?? 0;
  const now = Date.now();

  if (now > lastPressed + 300) {
    pressMap.set(button, now);
    return true;
  }

  return false;
}

export function setupGamepads() {
  let interval: NodeJS.Timeout | undefined;

  window.addEventListener('gamepadconnected', (e) => {
    interval ??= setInterval(handleController, 33);
  });

  window.addEventListener('gamepaddisconnected', (e) => {
    if (navigator.getGamepads().every(gp => gp === null)) {
      clearInterval(interval);
      interval = undefined;
    }
  });
}
