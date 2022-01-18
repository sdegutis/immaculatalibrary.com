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

  get root() {
    if (!this.parent) return this as unknown as Dir;
    let parent = this.parent;
    while (parent.parent) parent = parent.parent;
    return parent;
  }

}

export class Dir extends FsNode {

  get entries() {
    return Object.fromEntries(this.children
      .map(child => [child.name, child]));
  }

  get files() {
    return Object.fromEntries(this.children
      .filter((child => child instanceof File) as
        (child: FsNode) => child is File)
      .map(child => [child.name, child]));
  }

  get subdirs() {
    return Object.fromEntries(this.children
      .filter((child => child instanceof Dir) as
        (child: FsNode) => child is Dir)
      .map(child => [child.name, child]));
  }

  children: (File | Dir)[] = [];

  constructor(
    realBase: string,
    name: string,
    parent: Dir | null,
  ) {
    super(realBase, name, parent);
  }

  createFile(name: string, buffer: Buffer) {
    throw new Error();
  }

  rename(newName: string) {
    throw new Error();
  }

}

export class File extends FsNode {

  buffer: Buffer;
  constructor(
    realBase: string,
    name: string,
    parent: Dir | null,
  ) {
    super(realBase, name, parent);
    this.buffer = fs.readFileSync(this.realPath);
  }

  replace(newBuffer: Buffer) {
    this.buffer = newBuffer;
    fs.writeFileSync(this.realPath, newBuffer);
  }

  rename(newName: string) {
    throw new Error();
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
        dir.children.push(child);
      }
    }

    return dir;
  }

}
