import fs from "fs";
import path from "path";

class FsNode {

  constructor(
    public realBase: string,
    public name: string,
    public parent: Dir | null,
  ) { }

  get path() {
    const parts: string[] = [];
    for (let node: FsNode | Dir | null = this; node; node = node.parent) {
      parts.unshift(node.name);
    }
    return path.posix.join('/', ...parts);
  }

  get realPath() {
    return path.posix.join(this.realBase, this.path);
  }

  rename(newName: string) {
    const oldPath = this.realPath;
    this.name = newName;
    const newPath = this.realPath;
    fs.renameSync(oldPath, newPath);
  }

}

export class Dir extends FsNode {

  children: (File | Dir)[] = [];

  get root(): Dir {
    let ancestor: Dir = this;
    while (ancestor.parent) ancestor = ancestor.parent;
    return ancestor;
  }

  #entries<T extends Dir | File>(Subclass: { new(...args: any[]): T }): { [name: string]: T } {
    return Object.fromEntries(this.children
      .filter((child => child instanceof Subclass) as
        (child: FsNode) => child is T)
      .map(child => [child.name, child]));
  }

  get files() { return this.#entries(File); }
  get subdirs() { return this.#entries(Dir); }

  createFile(name: string, buffer: Buffer) {
    const child = new File(this.realBase, name, this);
    child.buffer = buffer;
    fs.writeFileSync(child.realPath, buffer);
    this.children.push(child);
  }

}

export class File extends FsNode {

  declare parent: Dir;
  buffer!: Buffer;

  replace(newBuffer: Buffer) {
    this.buffer = newBuffer;
    fs.writeFileSync(this.realPath, newBuffer);
  }

  get root(): Dir {
    return this.parent.root;
  }

}

export class FileSys {

  constructor(public fsBase: string) { }

  load() {
    return this.#loadDir('/', null);
  }

  #loadDir(base: string, parent: Dir | null) {
    const dir = new Dir(this.fsBase, path.posix.basename(base), parent);

    const dirRealPath = path.posix.join(this.fsBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.posix.join(this.fsBase, base, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.posix.join(base, name), dir);
        dir.children.push(child);
      }
      else if (stat.isFile()) {
        const child = new File(this.fsBase, name, dir);
        child.buffer = fs.readFileSync(child.realPath);
        dir.children.push(child);
      }
    }

    return dir;
  }

}
