import fs from "fs";
import path from "path/posix";
import { Module } from "./runtime";

abstract class FsNode {

  constructor(
    public readonly name: string,
    public readonly parent: FsDir | null,
  ) { }

  get path() {
    const parts: string[] = [];
    for (let node: FsNode | null = this; node; node = node.parent) {
      parts.unshift(node.name);
    }
    return path.join('/', ...parts);
  }

}

export class FsDir extends FsNode {

  children: (FsFile | FsDir)[] = [];

  get files() { return this.children.filter(child => child instanceof FsFile) as FsFile[]; }
  get dirs() { return this.children.filter(child => child instanceof FsDir) as FsDir[]; }

  get childrenByName() { return Object.fromEntries(this.children.map(c => [c.name, c])); }
  get filesByName() { return Object.fromEntries(this.files.map(c => [c.name, c])); }
  get dirsByName() { return Object.fromEntries(this.dirs.map(c => [c.name, c])); }

  find(toPath: string) {
    const absolutePath = (toPath.startsWith('/')
      ? toPath
      : path.join(this.path, toPath));

    let dir: FsDir = this;
    while (dir.parent) dir = dir.parent;

    const parts = absolutePath.split(path.sep).slice(1);
    let part: string | undefined;

    while (undefined !== (part = parts.shift())) {
      if (parts.length === 0) {
        if (part === '') return dir;

        return (
          dir.filesByName[part] ??
          dir.dirsByName[part] ??
          dir.filesByName[part + '.ts'] ??
          dir.filesByName[part + '.tsx'] ??
          dir.dirsByName[part]?.filesByName['index.ts'] ??
          dir.dirsByName[part]?.filesByName['index.tsx'] ??
          undefined
        );
      }
      else {
        const subdir = dir.dirsByName[part];
        if (!subdir) break;
        dir = subdir;
      }
    }

    return undefined;
  }

  clone(parent: FsDir | null = null) {
    const dir = new FsDir(parent === null ? '/' : this.name, parent);
    dir.children = this.children.map(node => node.clone(dir));
    return dir;
  }

  delete(node: FsFile | FsDir) {
    const idx = this.children.indexOf(node);
    this.children.splice(idx, 1);
  }

  createFile(name: string, contents: Buffer | string) {
    if (this.children.find(node => node.name === name)) {
      throw new Error(`File already exists with this name.`);
    }

    const file = new FsFile(name, this);
    file.content = contents;
    this.children.push(file);
  }

}

export class FsFile extends FsNode {

  declare parent: FsDir;
  content!: Buffer | string;
  module?: Module;

  clone(parent: FsDir) {
    const file = new FsFile(this.name, parent);
    file.content = this.content;
    return file;
  }

}

export class FileSys {

  root;

  constructor(public realBase: string) {
    this.root = this.#loadDir('/', null);
  }

  realPath(node: FsNode) {
    return path.join(this.realBase, node.path);
  }

  #loadDir(base: string, parent: FsDir | null) {
    const dir = new FsDir(path.basename(base), parent);

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
        const child = new FsFile(name, dir);
        child.content = fs.readFileSync(this.realPath(child));
        dir.children.push(child);
      }
    }

    return dir;
  }

  reflectChangesFromReal(realFilePaths: Set<string>) {
    const files = [];

    for (const realFilePath of realFilePaths) {
      const fsFilePath = realFilePath.slice(this.realBase.length);
      const fsFile = this.root.find(fsFilePath) as FsFile | null;

      if (fs.existsSync(realFilePath)) {
        const contents = fs.readFileSync(realFilePath);

        if (fsFile) {
          fsFile.content = contents;
          files.push(fsFile);
        }
        else {
          const dirs = fsFilePath.slice(1).split(path.sep);
          const name = dirs.pop()!;

          let dir = this.root;
          for (const dirName of dirs) {
            let subdir = dir.dirsByName[dirName];
            if (!subdir) {
              subdir = new FsDir(dirName, dir);
              dir.children.push(subdir);
            }
            dir = subdir;
          }

          const file = new FsFile(name, dir);
          file.content = contents;
          dir.children.push(file);
          files.push(file);
        }
      }
      else {
        if (fsFile) {
          fsFile.parent.delete(fsFile);
        }
      }
    }

    return files;
  }

}
