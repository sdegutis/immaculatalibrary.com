export { }

const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!
const perc = canvas.width / canvas.clientWidth

const img = await loadImage('https://upload.wikimedia.org/wikipedia/commons/0/08/John_Martin_Le_Pandemonium_Louvre.JPG')

let x = 0
let y = 0

const redraw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, x, y)
}

redraw()

canvas.onmousedown = (e1) => {
  canvas.onmousemove = (e2) => {
    x += e2.movementX * perc
    y += e2.movementY * perc
    redraw()
  }
  canvas.onmouseup = () => {
    canvas.onmousemove = null
    canvas.onmouseup = null
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = src
  })
}
