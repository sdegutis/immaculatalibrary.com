import fs from "fs";
import path from "path";

export class Dir {

  files: { [name: string]: File } = Object.create(null);
  subdirs: { [name: string]: Dir } = Object.create(null);
  entries: { [name: string]: File | Dir } = Object.create(null);

  constructor(
    public path: string,
    public name: string,
    public parent: Dir | null,
  ) { }

}

export class File {

  constructor(
    public path: string,
    public name: string,
    public parent: Dir | null,
    public buffer: Buffer,
  ) { }

}

export class LocalFs {

  constructor(private fsBase: string) { }

  load() {
    return this.#loadDir('', null);
  }

  #loadDir(base: string, parent: Dir | null) {
    const files = fs.readdirSync(path.join(this.fsBase, base));

    const dir = new Dir(base, path.basename(base), parent);

    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fullpath = path.join(this.fsBase, base, name);
      const stat = fs.statSync(fullpath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.join(base, name), dir);
        dir.subdirs[name] = child;
        dir.entries[name] = child;
      }
      else if (stat.isFile()) {
        const buffer = fs.readFileSync(fullpath);

        const child = new File(path.join(base, name), name, dir, buffer);
        dir.files[name] = child;
        dir.entries[name] = child;
      }
    }

    return dir;
  }

}
