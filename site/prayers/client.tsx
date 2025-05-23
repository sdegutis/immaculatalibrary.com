import { setupGamepads } from "./gamepad.js"
import { setupTabs, tabs } from "./tab.js"

for (const el of document.querySelectorAll(`.show-today:not(.day-${new Date().getDay()})`)) {
  el.closest('.panel')?.remove()
}

setupTabs()
setupGamepads()

const tabName = window.location.hash.slice(1)
const lastTab = [...tabs].find(tab => tab.name === tabName)
const startTab = lastTab ?? tabs.first

setTimeout(() => {
  startTab.focus()
}, 0)

window.addEventListener('resize', () => {
  tabs.current.panels.current.focus()
})
