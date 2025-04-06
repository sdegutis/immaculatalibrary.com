import { slugify } from '../util/helpers.js'

const title = document.querySelector<HTMLInputElement>('[name=title]')!
const slug = document.querySelector<HTMLInputElement>('[name=slug]')!

title.oninput = () => slug.value = slugify(title.value)

window.addEventListener('beforeunload', (e) => {
  if (!confirm('Lose progress?')) {
    e.preventDefault()
  }
})
