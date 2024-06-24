import { loadP8 } from "./$pico8.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const game1 = await loadP8('explore.p8');

const ctx = createCanvas(1400, 900, 4);

function runGameLoop(update: () => void) {
  const framerate = 1000 / 30;
  let from = +document.timeline.currentTime!;
  const step = () => {
    requestAnimationFrame(t => {
      if (t - from >= framerate) {
        update();
        from = t;
      }
      step();
    });
  };
  step();
}

let mx = 0;
let my = 0;

runGameLoop(() => {

  const c = navigator.getGamepads()[0];
  if (!c) return;

  console.log(c.axes)

  const [x1, y1, x2, y2] = c.axes as [number, number, number, number];

  mx += x1;
  my += y1;

  mx += x2 * 3;
  my += y2 * 3;

  draw();

});

function draw() {
  ctx.reset();

  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 128; x++) {
      const spr = game1.map[y]![x]!;
      if (spr > 0) {
        const img = game1.sprites[spr]!;
        ctx.putImageData(img, mx + x * 8, my + y * 8);
      }
    }
  }
}


// function runGameLoop(update: () => void) {

//   const start = +document.timeline.currentTime!;

//   requestAnimationFrame(t => {



//     // console.log(t - start);
//     runGameLoop(update);
//   });

// }



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
