import { changeEase } from "./$animate.js";
import { changeNavButtons } from "./$easteregg1.js";
import { Tab } from "./$tab.js";

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
  [Button.L, () => {
    const i = Math.max(Tab.currentTabIndex - 1, 0);
    Tab.tabs[i]?.focus();
  }],
  [Button.R, () => {
    const i = Math.min(Tab.currentTabIndex + 1, Tab.tabs.length - 1);
    Tab.tabs[i]?.focus();
  }],

  [Button.A, () => { changeEase(); }],
  [Button.B, () => { changeNavButtons(); }],

  [Button.RIGHT, () => { Tab.currentTab.currentPanel.next?.focus(); }],
  [Button.LEFT, () => { Tab.currentTab.currentPanel.prev?.focus(); }],

  [Button.DOWN, () => { Tab.currentTab.currentPanel.nextLine(); }],
  [Button.UP, () => { Tab.currentTab.currentPanel.prevLine(); }],
]);

function handleController() {
  for (const [button, fn] of gamepadActions.entries()) {
    if (pressed(button)) {
      fn();
      return;
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
