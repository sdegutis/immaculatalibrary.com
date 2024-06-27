import { animateTo, changeEase } from "./$animate.js";
import { changeNavButtons } from "./$easteregg1.js";
import { Nav, Navable } from "./$nav.js";
import { Tab, tabBodies } from "./$tab.js";

class Line implements Navable<Line> {

  prev: Line | undefined;
  next: Line | undefined;

  constructor(
    public element: HTMLSpanElement,
    public panel: Panel,
  ) {
    element.onclick = (e) => {
      e.preventDefault();
      this.focus();
    };
  }

  focus() {
    this.panel.goToLine(this);
  }

}

export class Panel implements Navable<Panel> {

  public prev: Panel | undefined;
  public next: Panel | undefined;

  lineNav = new Nav<Line>;

  constructor(
    public panelDiv: HTMLDivElement,
    public panelBodyDiv: HTMLDivElement,
    public tab: Tab,
  ) {
    for (const lineElement of this.panelBodyDiv.querySelectorAll<HTMLElement>('.highlightable-line')) {
      this.lineNav.add(new Line(lineElement, this));
    }

    this.panelBodyDiv.onwheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0)
        this.nextLine();
      else if (e.deltaY < 0)
        this.prevLine();
    };

    this.panelBodyDiv.setAttribute('tabindex', '0');
    this.panelBodyDiv.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev?.focus();
      }
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next?.focus();
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
        this.nextLine();
      }
      else if (e.key === 'ArrowUp') {
        if (this.hasLines()) {
          e.preventDefault();
          this.prevLine();
        }
      }
      else if (e.key === 'ArrowDown') {
        if (this.hasLines()) {
          e.preventDefault();
          this.nextLine();
        }
      }
    };

  }

  hasLines() { return !!this.lineNav.first; }

  focus() {
    animateTo(tabBodies, 700, {
      x: this.panelDiv.offsetLeft - tabBodies.offsetLeft,
      y: this.panelDiv.offsetTop - tabBodies.offsetTop,
    });
    this.panelBodyDiv.focus({ preventScroll: true });
    this.tab.panelNav.current = this;

    this.goToLine(this.lineNav.current);
  }

  goToLine(line: Line) {
    this.lineNav.current.element.classList.remove('active');
    this.lineNav.current = line;
    this.lineNav.current.element.classList.add('active');

    const currentLine = this.lineNav.current.element;
    animateTo(this.panelBodyDiv, 300, {
      x: this.panelBodyDiv.scrollLeft,
      y: currentLine.offsetTop - this.panelBodyDiv.offsetHeight / 2 + currentLine.offsetHeight / 2,
    });
  }

  nextLine() {
    this.lineNav.current.next?.focus();
  }

  prevLine() {
    this.lineNav.current.prev?.focus();
  }

}
