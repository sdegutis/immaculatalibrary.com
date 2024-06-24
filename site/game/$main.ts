import { loadP8 } from "./$pico8.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const game1 = await loadP8('explore.p8');

const ctx = createCanvas(1400, 900, 3);
// ctx.clearRect(0, 0, 1400, 900);

for (let y = 0; y < 128; y++) {
  for (let x = 0; x < 64; x++) {
    const spr = game1.map[y]![x]!;
    if (spr > 0) {
      const img = game1.sprites[spr]!;
      ctx.putImageData(img, x * 8, y * 8);
    }
  }
}




// window.addEventListener('gamepadconnected', (e) => {
//   console.log('conn', e.gamepad.index);
// });

// window.addEventListener('gamepaddisconnected', (e) => {
//   console.log('disc', e.gamepad.index);
// });

// // setInterval(() => {
// //   const c = navigator.getGamepads()[0];
// //   console.log(navigator.getGamepads());

// //   // c.vibrationActuator.playEffect("dual-rumble", {
// //   //   startDelay: 0,
// //   //   duration: 200,
// //   //   weakMagnitude: 1.0,
// //   //   strongMagnitude: 1.0,
// //   // });

// //   console.log(c.axes[0])
// // }, 500)



function createCanvas(width: number, height: number, scale: number) {
  const canvas = document.createElement('canvas');
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = width / scale;
  canvas.height = height / scale;
  document.body.append(canvas);
  return canvas.getContext('2d')!;
}
