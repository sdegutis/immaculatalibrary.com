import { getFileText, getPico8Dir } from "./$files.js";

// sarahs idea:
//   i can place bombs that blow up certain bricks
//   jane can pick up keys that open doors
//   and sarah can push buttons that open bars

const ctx = createCanvas(1400, 900, 10);

const dir = await getPico8Dir();
const text = await getFileText(dir, 'explore.p8');
const groups = parseGroups(text);
const sprites = parseSprites(groups.gfx, ctx);

const img = sprites[21]!;

ctx.putImageData(img, 20, 20);





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











function parseSprites(lines: string[], ctx: CanvasRenderingContext2D) {
  const COLORS = [
    [0x00, 0x00, 0x00, 0x00],
    [0x1D, 0x2B, 0x53, 0xff],
    [0x7E, 0x25, 0x53, 0xff],
    [0x00, 0x87, 0x51, 0xff],
    [0xAB, 0x52, 0x36, 0xff],
    [0x5F, 0x57, 0x4F, 0xff],
    [0xC2, 0xC3, 0xC7, 0xff],
    [0xFF, 0xF1, 0xE8, 0xff],
    [0xFF, 0x00, 0x4D, 0xff],
    [0xFF, 0xA3, 0x00, 0xff],
    [0xFF, 0xEC, 0x27, 0xff],
    [0x00, 0xE4, 0x36, 0xff],
    [0x29, 0xAD, 0xFF, 0xff],
    [0x83, 0x76, 0x9C, 0xff],
    [0xFF, 0x77, 0xA8, 0xff],
    [0xFF, 0xCC, 0xAA, 0xff],
  ];

  for (let i = lines.length; i < 128; i++) {
    lines.push(''.padEnd(128, '0'));
  }

  const sprites = [];

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {

      const img = ctx.createImageData(8, 8);

      for (let yy = 0; yy < 8; yy++) {
        for (let xx = 0; xx < 8; xx++) {
          const ly = y * 8 + yy;
          const lx = x * 8 + xx;

          const c = lines[ly]![lx]!;
          const n = parseInt(c, 16);
          const rgba = COLORS[n]!;

          const p = (yy * 8 * 4) + (xx * 4);

          img.data[p + 0] = rgba[0]!;
          img.data[p + 1] = rgba[1]!;
          img.data[p + 2] = rgba[2]!;
          img.data[p + 3] = rgba[3]!;
        }
      }

      sprites.push(img);
    }
  }

  return sprites;
}

function parseGroups(text: string) {
  const groups: Record<string, string[]> = Object.create(null);
  let group = '';

  for (const line of text.trim().split(/\r?\n/)) {
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
