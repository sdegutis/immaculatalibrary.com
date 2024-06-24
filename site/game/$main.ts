import { getFileText, getPico8Dir } from "./$files.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const dir = await getPico8Dir();
const text = await getFileText(dir, 'explore.p8');
const groups = parseGroups(text);

groups.gff.fill('hi', groups.gff.length, 5)
// groups.gff.length = 5;

for (const line of groups.gff) {
  console.log([line])
}

console.log(groups.gff)





// const ctx = createCanvas(1400, 900, 10);
// // ctx.strokeStyle = '#f00';
// // ctx.lineWidth = 3;
// // console.log(ctx.strokeStyle)
// // ctx.fillRect(10, 20, 30, 40);

// const img = ctx.createImageData(2, 2);

// let i = 0;
// img.data[i + 0] = 0xff;
// img.data[i + 1] = 0x00;
// img.data[i + 2] = 0x00;
// img.data[i + 3] = 0xff;
// i += 4;
// img.data[i + 0] = 0x00;
// img.data[i + 1] = 0xff;
// img.data[i + 2] = 0x00;
// img.data[i + 3] = 0xff;
// i += 4;
// img.data[i + 0] = 0x00;
// img.data[i + 1] = 0x00;
// img.data[i + 2] = 0xff;
// img.data[i + 3] = 0xff;
// i += 4;
// img.data[i + 0] = 0xff;
// img.data[i + 1] = 0x00;
// img.data[i + 2] = 0xff;
// img.data[i + 3] = 0xff;
// console.log(i);
// console.log(img.data.length);

// ctx.putImageData(img, 10, 20);
// // ctx.drawImage(img2, 1, 1);












function parseGroups(text: string) {
  const groups: Record<string, string[]> = Object.create(null);
  let group = '';

  for (const line of text.trim().split(/\r?\n/)) {
    // console.log([line])
    if (line.startsWith('__')) {
      group = line.match(/[^_]+/)![0]!;
      groups[group] = [];
    }
    else {
      groups[group]?.push(line);
    }
  }

  return groups as {
    gff: string[],
    gfx: string[],
    map: string[],
  };
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
