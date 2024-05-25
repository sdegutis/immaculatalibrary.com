let i = 0;
const tabs = document.querySelectorAll<HTMLAnchorElement>('#tabs-names a');
for (const a of tabs) {
    const child = document.getElementById('tabs-bodies')?.children[i++];
    a.onclick = (e) => {
        e.preventDefault();
        child?.scrollIntoView({ behavior: 'smooth' });

        for (const a of tabs) {
            a.classList.remove('active');
        }
        a.classList.add('active');
    };
}

i = 0;
const today = new Date().getDay();
for (const day of document.querySelectorAll<HTMLElement>('.show-today')) {
    if (today !== i++) {
        day.remove();
    }
}

for (const slideshow of document.querySelectorAll<HTMLDivElement>('.slideshow')) {
    for (let i = 1; i < slideshow.children.length; i++) {
        const a = slideshow.children[i - 1] as HTMLElement;
        const b = slideshow.children[i] as HTMLElement;

        b.append(<PageChanger to={a} side='left'>&lsaquo;</PageChanger> as HTMLElement);
        a.append(<PageChanger to={b} side='right'>&rsaquo;</PageChanger> as HTMLElement);
    }
}

function PageChanger(attrs: { to: HTMLElement, side: 'left' | 'right' }, children: any) {
    const button = (
        <button class='page-changer' style={`${attrs.side}: 0`}>
            {children}
        </button>
    ) as HTMLButtonElement;
    button.onclick = (e) => {
        e.preventDefault();
        attrs.to.scrollIntoView({ behavior: 'smooth' });
    };
    return button;
}

document.querySelector<HTMLElement>('.focus')?.scrollIntoView();
