const buttons = [...document.querySelectorAll<HTMLButtonElement>('#tabs-buttons button')];
const bodies = [...document.querySelectorAll<HTMLElement>('#tabs-bodies>*')];
export const tabs = buttons.map((b, i) => ({ button: b, body: bodies[i]! }));

for (const tab of tabs) {
  tab.body.hidden = true;
  tab.button.onclick = (e) => {
    e.preventDefault();
    for (const someTab of tabs) {
      const showing = someTab.button === tab.button;

      someTab.body.hidden = !showing;
      someTab.button.classList.toggle('active', showing);

      if (showing) {
        someTab.body.querySelector<HTMLElement>('[autofocus]')?.focus();
      }
    }
  };
}

tabs[0]?.button.click();
