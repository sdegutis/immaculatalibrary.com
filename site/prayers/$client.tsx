import { LeftArrow, RightArrow } from "../scripts/$arrows.js";
import { changeEase } from "./lib/$animate.js";
import { changeNavButtons } from "./lib/$easteregg1.js";
import { setupGamepads } from "./lib/$gamepad.js";
import { Panel } from "./lib/$panel.js";
import { Tab, tabButtons } from "./lib/$tab.js";

const today = new Date().getDay();

for (const [i, day] of Object.entries(document.querySelectorAll<HTMLElement>('.show-today'))) {
  if (today !== +i) {
    day.closest('.panel')?.remove();
  }
}

for (const [, day] of Object.entries(document.querySelectorAll<HTMLElement>('.mystery'))) {
  if (!day.classList.contains(`day-${today}`)) {
    day.closest('.panel')?.remove();
  }
}

setupGamepads();

// for (const tabBody of tabBodies.children) {
//   const button = tabButtons.shift()!;
//   const tab = new Tab(button);
//   tabNav.add(tab);
//   for (const panelDiv of tabBody.querySelectorAll<HTMLDivElement>('.panel')) {
//     tab.panelNav
//   }
// }

for (const slideshow of document.querySelectorAll<HTMLDivElement>('.slideshow')) {
  let lastPanel: Panel | undefined;

  for (const panelDiv of slideshow.querySelectorAll<HTMLDivElement>('.panel')) {
    const panelBodyDiv = panelDiv.querySelector<HTMLDivElement>('.panel-body')!;

    const panel = new Panel(panelDiv, panelBodyDiv);
    panel.prev = lastPanel;

    if (lastPanel) lastPanel.next = panel;
    lastPanel = panel;

    panelBodyDiv.onwheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0)
        panel.nextLine();
      else if (e.deltaY < 0)
        panel.prevLine();
    };

    panelBodyDiv.setAttribute('tabindex', '0');
    panelBodyDiv.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        panel.prev?.focus();
      }
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        panel.next?.focus();
      }
      else if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        changeNavButtons();
      }
      else if (e.key === ' ' && e.ctrlKey) {
        e.preventDefault();
        changeEase();
      }
      else if (e.key === ' ') {
        e.preventDefault();
        panel.nextLine();
      }
      else if (e.key === 'ArrowUp') {
        if (panel.hasLines()) {
          e.preventDefault();
          panel.prevLine();
        }
      }
      else if (e.key === 'ArrowDown') {
        if (panel.hasLines()) {
          e.preventDefault();
          panel.nextLine();
        }
      }
    };
  }

  let firstPanel = lastPanel!;
  while (firstPanel.prev) firstPanel = firstPanel.prev;

  for (let panel: Panel = firstPanel; panel; panel = panel.next!) {
    if (panel.prev) panel.panelDiv.append(<PageChanger to={panel.prev} side='left' ><LeftArrow /></PageChanger>);
    if (panel.next) panel.panelDiv.append(<PageChanger to={panel.next} side='right'><RightArrow /></PageChanger>);
  }

  const tab: Tab = new Tab(firstPanel, tabButtons.shift()!);
  Tab.tabs.push(tab);

  for (let panel: Panel = firstPanel; panel; panel = panel.next!) {
    panel.tab = tab;
  }
}

function PageChanger(attrs: { to: Panel, side: 'left' | 'right' }, children: any) {
  const button = (
    <button class={`page-changer side-${attrs.side}`} style={`${attrs.side}: 1px;`}>
      {children}
    </button>
  ) as HTMLButtonElement;
  button.onclick = (e) => {
    e.preventDefault();
    attrs.to.focus();
  };
  return button;
}

Tab.tabs[0]!.focus();
