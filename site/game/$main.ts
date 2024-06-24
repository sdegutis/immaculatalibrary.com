import { getFileText, getPico8Dir } from "./$files.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const dir = await getPico8Dir();


const text = await getFileText(dir, 'explore.p8');

const groups = parseGroups(text);

console.log(groups)


const ctx = createDrawingContext();
ctx.strokeStyle = '#f00';
ctx.rect(10, 20, 30, 40);

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



function parseGroups(text: string) {
  const groups: Record<string, string[]> = Object.create(null);
  let group = '';

  for (const line of text.trim().split('\n')) {
    if (line.startsWith('__')) {
      group = line;
      groups[group] = [];
    }
    else {
      groups[group]?.push(line);
    }
  }

  return groups;
}

function createDrawingContext() {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 900;
  document.body.append(canvas);
  return canvas.getContext('2d')!;
}
