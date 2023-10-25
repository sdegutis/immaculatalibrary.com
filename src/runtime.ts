import * as fs from "fs";
import * as path from "path/posix";
import * as sucrase from 'sucrase';
import * as vm from 'vm';
import { Module } from "./module.js";

class FsFile {

  constructor(
    public path: string,
    public content: Buffer,
    public needsModule: boolean,
  ) { }

}

export class Runtime {

  files = new Map<string, FsFile>();
  modules = new Map<string, Module>();

  constructor(private realBase: string) {
    this.#loadDir('/');
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
    const finalFilePath = filepath.replace(/\.tsx?$/, '.js');
    const isTS = finalFilePath !== filepath;

    const realFilePath = path.join(this.realBase, filepath);
    let content = fs.readFileSync(realFilePath);

    if (isTS) {
      const rawCode = content.toString('utf8');
      const transformed = sucrase.transform(rawCode, {
        transforms: ['typescript', 'jsx'],
        jsxRuntime: 'automatic',
        jsxImportSource: '/core',
        disableESTransforms: true,
        production: true,
      });

      content = Buffer.from(transformed.code
        .replace(/"\/core\/jsx-runtime"/g, `"/core/jsx-runtime.js"`)
      );
    }

    const file = new FsFile(finalFilePath, content, isTS);
    this.files.set(file.path, file);
  }

  realPath(filepath: string) {
    return path.join(this.realBase, filepath);
  }

  async reflectChangesFromReal(filepaths: string[]) {
    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }

    await this.createModules();
  }

  async createModules() {
    this.modules.clear();

    for (const file of this.files.values()) {
      if (file.needsModule) {
        this.modules.set(file.path, new Module(file.path, file.content));
      }
    }

    await this.modules.get('/core/main.js')!.script.link(async (specifier, referencingModule) => {
      if (!specifier.match(/^[./]/)) {
        const result = await import(specifier);
        const m = new vm.SyntheticModule(Object.keys(result), () => {
          for (const [key, val] of Object.entries(result)) {
            m.setExport(key, val);
          }
        });
        return m;
      }

      const absPath = path.resolve(path.dirname(referencingModule.identifier), specifier);

      const module = this.modules.get(absPath);
      if (module) {
        return module.script;
      }

      if (specifier.endsWith('/')) {
        const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';

        const m = new vm.SyntheticModule(['default'], () => {
          m.setExport('default', ([...this.files.values()]
            .filter(file => file.path.startsWith((dirPath)))
          ));
        });

        return m;
      }

      throw new Error(`Can't find file at path: ${specifier}`);
    });
  }

}
