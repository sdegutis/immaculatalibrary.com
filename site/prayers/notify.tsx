import { $ } from "../util/jsx-dom.js"

document.body.style.position = 'relative'

let notice: HTMLElement | undefined
let clearFn: (() => void) | undefined

export function notify(msg: string) {
  console.log(msg)

  notice?.remove()
  clearFn?.()

  notice = $<HTMLDivElement>(<div id='notice'>
    {msg}
  </div>)

  notice.classList.add('fading-out')

  let removeTimer = setTimeout(() => {
    notice?.remove()
    clearFn = undefined
    notice = undefined
  }, 1950)
  clearFn = () => clearTimeout(removeTimer)

  document.body.append(notice)
}
