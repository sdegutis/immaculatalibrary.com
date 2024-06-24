import { getFileText, getPico8Dir } from "./$files.js";
import { parseFlags, parseGroups, parseMap, parseSprites } from "./$pico8.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const ctx = createCanvas(1400, 900, 3);

const dir = await getPico8Dir();
const text = await getFileText(dir, 'explore.p8');
const groups = parseGroups(text);
const flags = parseFlags(groups.gff);
const sprites = parseSprites(groups.gfx, ctx);
const map = parseMap(groups.map);

ctx.clearRect(0, 0, 1400, 900);

for (let y = 0; y < 128; y++) {
  for (let x = 0; x < 64; x++) {
    const spr = map[y]![x]!;
    if (spr > 0) {
      const img = sprites[spr]!;
      ctx.putImageData(img, x * 8, y * 8);
    }
  }
}



















// console.log('hey')

// window.addEventListener('gamepadconnected', (e) => {
//   console.log('conn', e.gamepad.index);
// });

// window.addEventListener('gamepaddisconnected', (e) => {
//   console.log('disc', e.gamepad.index);
// });

// // setInterval(() => {
// //   const c = navigator.getGamepads()[0];
// //   console.log(navigator.getGamepads());

// //   if (!c) return;

// //   c.

// //   // // console.log((c as any).hapticActuators)

// //   // // (c as any).hapticActuators[0].pulse(1.0, 200);

// //   // c.vibrationActuator.playEffect("dual-rumble", {
// //   //   startDelay: 0,
// //   //   duration: 200,
// //   //   weakMagnitude: 1.0,
// //   //   strongMagnitude: 1.0,
// //   // });

// //   console.log(c.axes[0])
// // }, 500)




// Helpers



function createCanvas(width: number, height: number, scale: number) {
  const canvas = document.createElement('canvas');
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = width / scale;
  canvas.height = height / scale;
  document.body.append(canvas);
  return canvas.getContext('2d')!;
}
