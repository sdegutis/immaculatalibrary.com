import { animateTo, changeEase } from "./$animate.js";
import { changeNavButtons } from "./$easteregg1.js";
import { Nav, Navable } from "./$nav.js";
import { Tab, tabBodies } from "./$tab.js";

export class Panel implements Navable<Panel> {

  public tab!: Tab;

  public prev: Panel | undefined;
  public next: Panel | undefined;

  private lines: HTMLElement[];
  currentLine = 0;

  constructor(
    public panelDiv: HTMLDivElement,
    public panelBodyDiv: HTMLDivElement,
    private panelNav: Nav<Panel>,
  ) {
    this.lines = [...this.panelBodyDiv.querySelectorAll<HTMLElement>('.highlightable-line')];

    for (const [i, line] of Object.entries(this.lines)) {
      line.onclick = (e) => {
        e.preventDefault();
        this.goToLine(+i);
      };
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

  hasLines() { return this.lines.length > 0; }

  focus() {
    animateTo(tabBodies, 700, {
      x: this.panelDiv.offsetLeft - tabBodies.offsetLeft,
      y: this.panelDiv.offsetTop - tabBodies.offsetTop,
    });
    this.panelBodyDiv.focus({ preventScroll: true });

    for (const line of this.lines) {
      line.classList.remove('active');
    }

    this.currentLineEl.classList.add('active');
    this.panelNav.current = this;
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
