import fs from "fs";
import path from "path/posix";

abstract class FsNode {

  readonly root: FsDir;
  readonly path;

  constructor(
    private readonly fs: FileSys,
    public readonly name: string,
    public readonly parent: FsDir | null,
  ) {
    const parts: string[] = [];
    for (let node: FsNode | null = this; node; node = node.parent) {
      parts.unshift(node.name);
    }
    this.root = (this.parent ? this.parent.root : this as any);
    this.path = path.join('/', ...parts);
  }

  get realPath() {
    return path.join(this.fs.realBase, this.path);
  }

}

export class FsDir extends FsNode {

  children: (FsFile | FsDir)[] = [];

  get files() { return this.children.filter(child => child instanceof FsFile) as FsFile[]; }
  get dirs() { return this.children.filter(child => child instanceof FsDir) as FsDir[]; }

  get childrenByName() { return Object.fromEntries(this.children.map(c => [c.name, c])); }
  get filesByName() { return Object.fromEntries(this.files.map(c => [c.name, c])); }
  get dirsByName() { return Object.fromEntries(this.dirs.map(c => [c.name, c])); }

  // createFile(name: string, buffer: Buffer) {
  //   if (this.childrenByName[name]) {
  //     throw new Error("Cannot overwrite existing file.");
  //   }

  //   const child = new FsFile(this.realBase, name, this);
  //   child.buffer = buffer;
  //   fs.writeFileSync(child.realPath, buffer);
  //   this.children.push(child);

  //   return child;
  // }

  find(toPath: string) {
    const absolutePath = (toPath.startsWith('/')
      ? toPath
      : path.join(this.path, toPath));

    let dir: FsDir = this.root;
    const parts = absolutePath.split(path.sep).slice(1);
    let part: string | undefined;

    while (undefined !== (part = parts.shift())) {
      if (parts.length === 0) {
        if (part === '') return dir;

        return (
          dir.filesByName[part] ??
          dir.filesByName[part + '.ts'] ??
          dir.filesByName[part + '.tsx'] ??
          dir.dirsByName[part]?.filesByName['index.ts'] ??
          dir.dirsByName[part]?.filesByName['index.tsx'] ??
          null
        );
      }
      else {
        const subdir = dir.dirsByName[part];
        if (!subdir) break;
        dir = subdir;
      }
    }

    return null;
  }

}

export class FsFile extends FsNode {

  declare parent: FsDir;
  buffer!: Buffer;

  // replace(newBuffer: Buffer) {
  //   this.buffer = newBuffer;
  //   fs.writeFileSync(this.realPath, newBuffer);
  // }

  get text() {
    return this.buffer.toString('utf8');
  }

}

export class FileSys {

  readonly root;

  constructor(public realBase: string) {
    this.root = this.#loadDir('/', null);
  }

  #loadDir(base: string, parent: FsDir | null) {
    const dir = new FsDir(this, path.basename(base), parent);

    const dirRealPath = path.join(this.realBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const fileRealPath = path.join(this.realBase, base, name);
      const stat = fs.statSync(fileRealPath);

      if (stat.isDirectory()) {
        const child = this.#loadDir(path.join(base, name), dir);
        dir.children.push(child);
      }
      else if (stat.isFile()) {
        const child = new FsFile(this, name, dir);
        child.buffer = fs.readFileSync(child.realPath);
        dir.children.push(child);
      }
    }

    return dir;
  }

  update(realFilePaths: Set<string>) {
    for (const realFilePath of realFilePaths) {
      const fsFilePath = realFilePath.slice(this.realBase.length);
      const fsFile = this.root.find(fsFilePath) as FsFile | null;

      if (fs.existsSync(realFilePath)) {
        const contents = fs.readFileSync(realFilePath);

        if (fsFile) {
          fsFile.buffer = contents;
        }
        else {
          const dirs = fsFilePath.slice(1).split(path.sep);
          const name = dirs.pop()!;

          let dir = this.root;
          for (const dirName of dirs) {
            let subdir = dir.dirsByName[dirName];
            if (!subdir) {
              subdir = new FsDir(this, dirName, dir);
              dir.children.push(subdir);
            }
            dir = subdir;
          }

          const file = new FsFile(this, name, dir);
          file.buffer = contents;
          dir.children.push(file);
        }
      }
      else {
        if (fsFile) {
          const nodes = fsFile.parent.children;
          const idx = nodes.indexOf(fsFile);
          nodes.splice(idx, 1);
        }
      }
    }
  }

}
