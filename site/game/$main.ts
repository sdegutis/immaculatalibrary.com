import { getFileText, getPico8Dir } from "./$files.js";
import { parseFlags, parseGroups } from "./$pico8.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const ctx = createCanvas(1400, 900, 10);

const dir = await getPico8Dir();
const text = await getFileText(dir, 'explore.p8');
const groups = parseGroups(text);

const flags = parseFlags(groups.gff);

// const sprites = parseSprites(groups.gfx, ctx);
// const img = sprites[21]!;
// ctx.putImageData(img, 20, 20);




















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
