import * as fs from "fs";
import * as path from "path/posix";
import { Module } from "./module.js";

class FsFile {

  module?: Module;

  constructor(
    public path: string,
    public content: Buffer,
    public needsModule: boolean,
  ) { }

}

export class Runtime {

  files = new Map<string, FsFile>();

  constructor(private realBase: string) {
    this.#loadDir('/');
    this.#createModules();
  }

  #loadDir(base: string) {
    const dirRealPath = path.join(this.realBase, base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const realFilePath = path.join(dirRealPath, name);
      const stat = fs.statSync(realFilePath);

      if (stat.isDirectory()) {
        this.#loadDir(path.join(base, name));
      }
      else if (stat.isFile()) {
        const filepath = path.join(base, name);
        this.#createFile(filepath);
      }
    }
  }

  #createFile(filepath: string) {
    const realFilePath = path.join(this.realBase, filepath);
    const needsModule = filepath.match(/\.tsx?$/);

    if (needsModule) {
      filepath = filepath.replace(/\.tsx?$/, '.js');
    }

    const content = fs.readFileSync(realFilePath);
    const file = new FsFile(filepath, content, !!needsModule);
    this.files.set(filepath, file);
  }

  realPath(filepath: string) {
    return path.join(this.realBase, filepath);
  }

  reflectChangesFromReal(filepaths: string[]) {
    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }

    this.#createModules();
  }

  #createModules() {
    for (const file of this.files.values()) {
      if (file.needsModule) {
        const cacheData = file.module?.cachedData;
        file.module = new Module(file.path, file.content, this, cacheData);
        file.content = Buffer.from(file.module.content);
      }
    }
  }

}
