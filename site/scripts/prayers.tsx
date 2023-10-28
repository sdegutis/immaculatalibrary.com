const head = document.getElementById('tabs-head') as HTMLUListElement;
const body = document.getElementById('tabs-body') as HTMLDivElement;

interface Tab {
  button: HTMLAnchorElement;
  body: HTMLDivElement;
}

const tabs: Tab[] = [];

for (const a of head.querySelectorAll('a')) {
  const tabName = a.dataset["tab"]!;
  const tabBody = body.querySelector<HTMLDivElement>(`[data-tab="${tabName}"]`)!;
  const tab = { button: a, body: tabBody };
  tabs.push(tab);

  a.onclick = (e) => {
    e.preventDefault();
    selectTab(tab);
  };
}

function selectTab(selectedTab: Tab) {
  for (const tab of tabs) {
    const selected = tab === selectedTab;
    tab.body.hidden = !selected;
    tab.button.classList.toggle('selected', selected);
  }
}
