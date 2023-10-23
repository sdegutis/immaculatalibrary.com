import { FileSys } from "./filesys.js";
import { Module } from "./module.js";

export class Runtime {

  modules = new Map<string, Module>();
  #deps = new Map<string, Set<string>>();

  constructor(public fs: FileSys) { }

  createModules() {
    for (const [filepath, file] of this.fs.files) {
      if (filepath.match(/\.tsx?$/)) {
        this.modules.set(filepath, new Module(filepath, file.content, this));
      }
    }
  }

  updateModules(filepaths: string[]) {
    const resetSeen = new Set<string>();

    for (const filepath of filepaths) {
      const file = this.fs.files.get(filepath);
      if (file && filepath.match(/\.tsx?$/)) {
        this.modules.set(filepath, new Module(filepath, file.content, this));
      }
      else {
        this.modules.delete(filepath);
      }

      this.#resetDepTree(filepath, resetSeen);
    }
  }

  addDeps(requiredBy: string, requiring: string) {
    let list = this.#deps.get(requiring);
    if (!list) this.#deps.set(requiring, list = new Set());
    list.add(requiredBy);
  }

  #resetDepTree(path: string, seen: Set<string>) {
    if (seen.has(path)) return;
    seen.add(path);

    for (const [requiring, requiredBy] of this.#deps) {
      if (path.startsWith(requiring)) {
        this.#deps.delete(requiring);
        for (const dep of requiredBy) {
          const module = this.modules.get(dep);
          module?.resetExports();
          this.#resetDepTree(dep, seen);
        }
      }
    }
  }

}
