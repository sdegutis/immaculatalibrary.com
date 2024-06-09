export default 0;

const buttons = [...document.querySelectorAll<HTMLButtonElement>('#tabs-buttons button')];
const bodies = [...document.querySelectorAll<HTMLElement>('#tabs-bodies>*')];
const tabs = buttons.map((b, i) => ({ button: b, body: bodies[i]! }));

for (const tab of tabs) {
  tab.body.hidden = true;
  tab.button.onclick = (e) => {
    e.preventDefault();
    for (const someTab of tabs) {
      someTab.body.hidden = someTab.button !== tab.button;
      someTab.button.classList.toggle('active', someTab.button === tab.button);
    }
  };
}

tabs[0]?.button.click();
