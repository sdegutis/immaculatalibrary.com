import { setupGamepads } from "./lib/$gamepad.js";
import { setupTabs, tabNav } from "./lib/$tab.js";

for (const el of document.querySelectorAll(`.show-today:not(.day-${new Date().getDay()})`)) {
  el.closest('.panel')?.remove();
}

setupTabs();
setupGamepads();
tabNav.first.focus();
