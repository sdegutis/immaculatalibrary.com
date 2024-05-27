const today = new Date().getDay();
for (const [i, day] of Object.entries(document.querySelectorAll<HTMLElement>('.show-today'))) {
    if (today !== +i) {
        day.closest('.panel')?.remove();
    }
}

interface Tab {
    firstPanel: Panel;
}

class Panel {
    public prev?: Panel | undefined;
    public next?: Panel | undefined;
    constructor(
        public panelDiv: HTMLDivElement,
        public panelBodyDiv: HTMLDivElement,
    ) { }
    focus() {
        this.panelDiv.scrollIntoView({ behavior: 'smooth' });
        this.panelBodyDiv.focus({ preventScroll: true });
    }
}

const tabs: Tab[] = [];

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
        };
    }

    let firstPanel = lastPanel!;
    while (firstPanel.prev) firstPanel = firstPanel.prev;

    for (let panel: Panel = firstPanel; panel; panel = panel.next!) {
        if (panel.prev) panel.panelDiv.append(<PageChanger to={panel.prev} side='left '>&lsaquo;</PageChanger>);
        if (panel.next) panel.panelDiv.append(<PageChanger to={panel.next} side='right'>&rsaquo;</PageChanger>);
    }

    const tab: Tab = { firstPanel };
    tabs.push(tab);
}



const tabButtons = document.querySelectorAll<HTMLAnchorElement>('#tabs-names a');
for (const [i, a] of Object.entries(tabButtons)) {
    a.onclick = (e) => {
        e.preventDefault();
        const tab = tabs[+i]!;
        console.log(tab)
        tab.firstPanel.focus();

        for (const a of tabButtons) {
            a.classList.remove('active');
        }
        a.classList.add('active');
    };
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

tabs[0]?.firstPanel.focus();
