export function parseFlags(lines: string[]) {
  const chars = lines.join('').padEnd(512, '0');

  const COLORS = [
    'RED',
    'ORANGE',
    'YELLOW',
    'GREEN',
    'BLUE',
    'PURPLE',
    'PINK',
    'PEACH',
  ] as const;

  type Flag = { [key in typeof COLORS[number]]?: true };

  const flags: Flag[] = [];

  for (let i = 0; i < 256; i++) {
    const ii = i * 2;
    const hex = chars.slice(ii, ii + 2);
    const n = parseInt(hex, 16);

    const flag: Flag = Object.create(null);

    for (let b = 0; b < 8; b++) {
      const bb = 1 << b;
      if (n & bb) flag[COLORS[b]!] = true;
    }

    flags.push(flag);
  }

  return flags;
}

export function parseSprites(lines: string[], ctx: CanvasRenderingContext2D) {
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

export function parseGroups(text: string) {
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
