import { Nav } from "./$nav.js";
import { Panel } from "./$panel.js";

export const tabBodies = document.getElementById('tabs-bodies') as HTMLDivElement;
export const tabButtons = [...document.querySelectorAll<HTMLAnchorElement>('#tabs-names a')];

export const tabNav = new Nav<Tab>();

export class Tab {

  prev: Tab | undefined;
  next: Tab | undefined;

  panelNav = new Nav<Panel>();

  static tabs: Tab[] = [];

  static currentTabIndex = 0;
  static get currentTab() { return Tab.tabs[this.currentTabIndex]!; }

  currentPanel!: Panel;

  constructor(public firstPanel: Panel, private button: HTMLAnchorElement) {
    this.button.onclick = (e) => {
      e.preventDefault();
      this.focus();
    };
  }

  focus() {
    for (const tab of Tab.tabs) tab.button.classList.remove('active');
    Tab.currentTabIndex = Tab.tabs.indexOf(this);
    this.button.classList.add('active');
    this.firstPanel.focus();
  };

}
