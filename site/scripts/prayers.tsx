const head = document.getElementById('tabs-head') as HTMLUListElement;
const body = document.getElementById('tabs-body') as HTMLDivElement;

if (!window.location.hash) {
  window.location.hash = head.querySelector('a')!.hash;
}

window.addEventListener('hashchange', (e) => {
  reflectUrl();
});

interface Tab {
  name: string;
  button: HTMLAnchorElement;
  body: HTMLDivElement;
}

const tabs: Tab[] = [];

for (const a of head.querySelectorAll('a')) {
  const tabName = a.hash.slice(1);
  const tabBody = body.querySelector<HTMLDivElement>(`[data-tab="${tabName}"]`)!;
  const tab = { button: a, body: tabBody, name: tabName };
  tabs.push(tab);
}

function reflectUrl() {
  const selectedTab = window.location.hash.slice(1);
  if (!selectedTab) return;

  for (const tab of tabs) {
    const selected = tab.name === selectedTab;
    tab.body.hidden = !selected;
    tab.button.classList.toggle('selected', selected);
  }
}

reflectUrl();
