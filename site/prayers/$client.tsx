import { LeftArrow, RightArrow } from "../scripts/$arrows.js";

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

class Tab {
  static currentTab?: Tab;
  constructor(public firstPanel: Panel, private button: HTMLAnchorElement) {
    this.button.onclick = (e) => {
      e.preventDefault();
      this.focus();
    };
  }
  focus() {
    Tab.currentTab?.button.classList.remove('active');
    Tab.currentTab = this;
    this.button.classList.add('active');
    this.firstPanel.focus();
  };
}

function animateTo(container: HTMLElement, duration: number, to: { x: number, y: number }) {
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

function sillyEase(x: number): number {
  const c4 = (2 * Math.PI) / 3;
  return x === 0
    ? 0
    : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

class Panel {
  public prev?: Panel | undefined;
  public next?: Panel | undefined;
  private lines: HTMLElement[];
  currentLine = 0;
  constructor(
    public panelDiv: HTMLDivElement,
    public panelBodyDiv: HTMLDivElement,
  ) {
    this.lines = [...this.panelBodyDiv.querySelectorAll<HTMLElement>('.highlightable-line')];

    for (const [i, line] of Object.entries(this.lines)) {
      line.onclick = (e) => {
        e.preventDefault();
        this.goToLine(+i);
      };
    }
  }
  hasLines() { return this.lines.length > 0; }
  focus() {
    const container = document.getElementById('tabs-bodies')!;
    animateTo(container, 700, {
      x: this.panelDiv.offsetLeft - container.offsetLeft,
      y: this.panelDiv.offsetTop - container.offsetTop,
    });
    this.panelBodyDiv.focus({ preventScroll: true });

    for (const line of this.lines) {
      line.classList.remove('active');
    }

    this.currentLineEl.classList.add('active');
  }
  goToLine(line: number) {
    this.currentLineEl.classList.remove('active');
    this.currentLine = line;
    this.currentLineEl.classList.add('active');

    const currentLine = this.currentLineEl;
    animateTo(this.panelBodyDiv, 300, {
      x: this.panelBodyDiv.scrollLeft,
      y: currentLine.offsetTop - this.panelBodyDiv.offsetHeight / 2 + currentLine.offsetHeight / 2,
    });
  }
  nextLine() {
    this.goToLine(Math.min(this.currentLine + 1, this.lines.length - 1));
  }
  prevLine() {
    this.goToLine(Math.max(this.currentLine - 1, 0));
  }
  get currentLineEl() {
    return this.lines[this.currentLine]!;
  }
}

const tabs: Tab[] = [];

const tabButtons = [...document.querySelectorAll<HTMLAnchorElement>('#tabs-names a')];
for (const slideshow of document.querySelectorAll<HTMLDivElement>('.slideshow')) {
  let lastPanel: Panel | undefined;

  for (const panelDiv of slideshow.querySelectorAll<HTMLDivElement>('.panel')) {
    const panelBodyDiv = panelDiv.querySelector<HTMLDivElement>('.panel-body')!;

    const panel = new Panel(panelDiv, panelBodyDiv);
    panel.prev = lastPanel;

    if (lastPanel) lastPanel.next = panel;
    lastPanel = panel;

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
      else if (e.key === ' ') {
        e.preventDefault();
        if (e.ctrlKey)
          ease = ease === easeInOut ? sillyEase : easeInOut;
        else
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
  tabs.push(tab);
}

function PageChanger(attrs: { to: Panel, side: 'left' | 'right' }, children: any) {
  const button = (
    <button class='page-changer' style={`${attrs.side}: 0`}>
      {children}
    </button>
  ) as HTMLButtonElement;
  button.onclick = (e) => {
    e.preventDefault();
    attrs.to.focus();
  };
  return button;
}

tabs[0]!.focus();
