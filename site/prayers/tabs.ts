let i = 0;
for (const a of document.querySelectorAll<HTMLAnchorElement>('#tabs-names a')) {
    const child = document.getElementById('tabs-bodies')?.children[i++];
    a.onclick = (e) => {
        e.preventDefault();
        child?.scrollIntoView({ behavior: 'smooth' });
    };
}
