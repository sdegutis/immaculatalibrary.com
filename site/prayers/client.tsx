const today = new Date().getDay();
for (const [i, day] of Object.entries(document.querySelectorAll<HTMLElement>('.show-today'))) {
    if (today !== +i) {
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
        this.panelDiv.scrollIntoView({ behavior: 'smooth' });
        this.panelBodyDiv.focus({ preventScroll: true });

        this.currentLine = 0;

        for (const line of this.lines) {
            line.classList.remove('active');
        }

        this.lines[this.currentLine]!.classList.add('active');
    }
    goToLine(line: number) {
        this.lines[this.currentLine]!.classList.remove('active');
        this.currentLine = line;
        this.lines[this.currentLine]!.classList.add('active');
        this.lines[this.currentLine]!.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }
    nextLine() {
        this.goToLine(Math.min(this.currentLine + 1, this.lines.length - 1));
    }
    prevLine() {
        this.goToLine(Math.max(this.currentLine - 1, 0));
    }
}

const tabs: Tab[] = [];

const tabButtons = [...document.querySelectorAll<HTMLAnchorElement>('#tabs-names button')];
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
        if (panel.prev) panel.panelDiv.append(<PageChanger to={panel.prev} side='left '>&lsaquo;</PageChanger>);
        if (panel.next) panel.panelDiv.append(<PageChanger to={panel.next} side='right'>&rsaquo;</PageChanger>);
    }

    const tab: Tab = new Tab(firstPanel, tabButtons.shift()!);
    tabs.push(tab);
}

function PageChanger(attrs: { to: Panel, side: 'left ' | 'right' }, children: any) {
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
