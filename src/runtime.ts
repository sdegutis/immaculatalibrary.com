import { FileSys } from "./filesys";
import { Module } from "./module";

export class Runtime {

  modules = new Map<string, Module>();
  #deps = new Map<string, Set<string>>();

  constructor(public fs: FileSys) { }

  createModules() {
    for (const [filepath, contents] of this.fs.files) {
      if (filepath.match(/\.tsx?$/)) {
        this.modules.set(filepath, new Module(filepath, contents, this));
      }
    }
  }

  updateModules(files: string[]) {
    const resetSeen = new Set<string>();

    for (const file of files) {
      const buffer = this.fs.files.get(file);
      if (buffer && file.match(/\.tsx?$/)) {
        this.modules.set(file, new Module(file, buffer, this));
      }
      else {
        this.modules.delete(file);
      }

      this.#resetDepTree(file, resetSeen);
    }
  }

  addDeps(path: string, requiringPaths: string[]) {
    for (const requiringPath of requiringPaths) {
      let list = this.#deps.get(requiringPath);
      if (!list) this.#deps.set(requiringPath, list = new Set());
      list.add(path);
    }
  }

  #resetDepTree(path: string, seen: Set<string>) {
    if (seen.has(path)) return;
    seen.add(path);

    const deps = this.#deps.get(path);
    if (deps) {
      this.#deps.delete(path);
      for (const dep of deps) {
        const module = this.modules.get(dep);
        module?.resetExports();
        this.#resetDepTree(dep, seen);
      }
    }
  }

}
