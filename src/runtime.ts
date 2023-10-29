import * as fs from "fs";
import * as path from "path/posix";
import * as sucrase from 'sucrase';
import { pathToFileURL } from "url";
import * as vm from 'vm';

export class Runtime {

  files = new Map<string, File>();
  modules = new Map<string, vm.Script>();
  pathsForModules = new WeakMap<vm.Script, string>();

  constructor(private realBase: string) {
    this.#loadDir('/');
    this.#createModules();
  }

  build() {
    console.time('Running /core/main.js');
    try {
      const mainModule = this.modules.get('/core/main.js')!;
      await mainModule.evaluate();
      return mainModule.namespace as {
        outfiles: Map<string, Buffer | string>,
        handlers: Map<string, (body: string) => string>,
      };
    }
    catch (e) {
      console.error(e);
      return;
    }
    finally {
      console.timeEnd('Running /core/main.js');
    }
  }

  async pathsUpdated(...paths: string[]) {
    const filepaths = paths.map(p => p.slice(this.realBase.length));

    for (const filepath of filepaths) {
      const realFilePath = path.join(this.realBase, filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }

    await this.#createModules();
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

    let moduleData: ModuleData | undefined;
    if (isTS) {
      const rawCode = content.toString('utf8');
      const fileUrl = pathToFileURL(realFilePath).href;

      const transformed = sucrase.transform(rawCode, {
        transforms: ['typescript', 'jsx'],
        jsxRuntime: 'automatic',
        jsxImportSource: '/core',
        disableESTransforms: true,
        production: true,
        filePath: fileUrl,
        sourceMapOptions: {
          compiledFilename: realFilePath,
        },
      });

      content = Buffer.from(transformed.code
        .replace(/"\/core\/jsx-runtime"/g, `"/core/jsx-transform.js"`)
      );

      const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
      const sourceMap = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;

      moduleData = { sourceMap, fileUrl };
    }

    const file = { content, moduleData };
    this.files.set(finalFilePath, file);
  }

  async #createModules() {
    // const linker = async (specifier: string, referencingModule: vm.Module) => {
    //   if (!specifier.match(/^[./]/)) {
    //     return await packageCache.import(specifier);
    //   }

    //   const referencingAbsPath = this.pathsForModules.get(referencingModule)!;
    //   const absPath = path.resolve(path.dirname(referencingAbsPath), specifier);

    //   const module = this.modules.get(absPath);
    //   if (module) {
    //     return module;
    //   }

    //   if (specifier.endsWith('/')) {
    //     const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';
    //     const files = [...this.files.entries()]
    //       .map(([filepath, file]) => ({ path: filepath, content: file.content }))
    //       .filter(file => file.path.startsWith((dirPath)));
    //     return await moduleFor({ default: files });
    //   }

    //   throw new Error(`Can't find file at path: ${specifier}`);
    // };

    // async function importDynamic(specifier: string, referencingModule: vm.Module) {
    //   const mod = await linker(specifier, referencingModule);
    //   await mod.link(linker);
    //   await mod.evaluate();
    //   return mod;
    // }

    this.modules.clear();

    for (const [filepath, file] of this.files.entries()) {
      if (file.moduleData) {
        const module = new vm.Script(file.content.toString('utf8') + file.moduleData.sourceMap!, {
          filename: file.moduleData.fileUrl!,
          // importModuleDynamically: importDynamic as any,
          cachedData: file.moduleData.cachedData,
        });

        // file.moduleData.cachedData = (module as any).createCachedData();

        this.modules.set(filepath, module);
        this.pathsForModules.set(module, filepath);
      }
    }

    // await this.modules.get('/core/main.js')!.link(linker);
  }

}

interface ModuleData {
  sourceMap: string;
  fileUrl: string;
  cachedData?: Buffer;
}

interface File {
  content: Buffer;
  moduleData: ModuleData | undefined;
}

// class PackageCache {

//   #packages = new Map<string, vm.Module>();

//   async import(specifier: string): Promise<vm.Module> {
//     let pkg = this.#packages.get(specifier);
//     if (!pkg) this.#packages.set(specifier, pkg = await moduleFor(await import(specifier)));
//     return pkg;
//   }

// }

// const packageCache = new PackageCache();

// async function moduleFor(ns: Record<string, any>) {
//   return new vm.SyntheticModule(Object.keys(ns), function () {
//     for (const [key, val] of Object.entries(ns)) {
//       this.setExport(key, val);
//     }
//   });
// }
