import { LeftArrow, RightArrow } from "../../scripts/$arrows.js";
import { Nav, Navable } from "./$nav.js";
import { Panel } from "./$panel.js";

export const tabBodies = document.getElementById('tabs-bodies') as HTMLDivElement;
const tabNamesArea = document.querySelector<HTMLDivElement>('#tabs-names')!;
const tabButtons = [...document.querySelectorAll<HTMLAnchorElement>('#tabs-names a')];

export const tabNav = new Nav<Tab>();

export class Tab implements Navable<Tab> {

  prev: Tab | undefined;
  next: Tab | undefined;

  panelNav = new Nav<Panel>();

  onFocus = () => { };

  constructor(public button: HTMLAnchorElement) {
    this.button.onclick = (e) => {
      e.preventDefault();
      this.focus();
    };
  }

  focus() {
    tabNav.current.button.classList.remove('active');
    tabNav.current = this;
    tabNav.current.button.classList.add('active');
    this.panelNav.first.focus();
    this.onFocus();
  };

}

export function setupTabs() {
  const underline = <div id='underline' /> as HTMLDivElement;
  underline.style.top = `${tabNamesArea.offsetHeight - 2}px`;
  tabNamesArea.append(underline);

  const moveUnderlineToTab = (tab: Tab) => {
    underline.style.left = `${tab.button.offsetLeft}px`;
    underline.style.width = `${tab.button.offsetWidth}px`;
  };

  for (const tabBody of tabBodies.children) {
    const button = tabButtons.shift()!;

    const tab = new Tab(button);
    tabNav.add(tab);

    tab.onFocus = () => moveUnderlineToTab(tab);

    for (const panelDiv of tabBody.querySelectorAll<HTMLDivElement>('.panel')) {
      const panelBodyDiv = panelDiv.querySelector<HTMLDivElement>('.panel-body')!;

      const panel = new Panel(panelDiv, panelBodyDiv, tab);
      tab.panelNav.add(panel);

      if (panel.prev) {
        panel.panelDiv.append(<PageChanger to={panel.prev} side='left'><LeftArrow /></PageChanger>);
        panel.prev.panelDiv.append(<PageChanger to={panel} side='right'><RightArrow /></PageChanger>);
      }
    }
  }

  window.addEventListener('resize', () => {
    underline.classList.add('suppress');
    moveUnderlineToTab(tabNav.current);
    underline.classList.remove('suppress');
  });
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
