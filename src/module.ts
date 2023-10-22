import path from 'path/posix';
import * as sucrase from 'sucrase';
import { pathToFileURL } from 'url';
import vm from 'vm';
import { Runtime } from './runtime';

export class Module {

  #exports = Object.create(null);
  #ran = false;
  #run;

  constructor(
    public filepath: string,
    buffer: Buffer,
    private runtime: Runtime,
  ) {
    const rawCode = buffer.toString('utf8');

    const filename = this.runtime.fs.realPath(this.filepath);
    const fileUrl = pathToFileURL(filename);

    const transformed = sucrase.transform(rawCode, {
      transforms: ['typescript', 'imports', 'jsx'],
      jsxPragma: '__createJsxElement',
      jsxFragmentPragma: '""',
      disableESTransforms: true,
      production: true,
      filePath: fileUrl.href,
      sourceMapOptions: {
        compiledFilename: filename,
      },
    });

    const args = {
      require: (path: string) => this.#requireFromWithinModule(path),
      exports: this.#exports,
      __createJsxElement: createJsxElement,
    };

    const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
    const sourceMapUrlStr = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;
    const runModule = vm.compileFunction(transformed.code + sourceMapUrlStr, Object.keys(args), {
      filename: fileUrl.href,
    });

    this.#run = () => runModule(...Object.values(args));
  }

  resetExports() {
    this.#ran = false;
    for (const key in this.#exports) {
      delete this.#exports[key];
    }
  }

  require() {
    if (!this.#ran) {
      this.#ran = true;
      this.#run();
    }
    return this.#exports;
  }

  #requireFromWithinModule(toPath: string) {
    if (!toPath.match(/^[./]/)) {
      return require(toPath);
    }

    const absPath = path.resolve(path.dirname(this.filepath), toPath);

    const module = (
      this.runtime.modules.get(absPath) ??
      this.runtime.modules.get(absPath + '.ts') ??
      this.runtime.modules.get(absPath + '.tsx')
    );

    if (module) {
      this.runtime.addDeps(this.filepath, module.filepath);
      return module.require();
    }

    if (toPath.endsWith('/')) {
      const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';

      absPath === '/' ? '/' : absPath + '/';
      this.runtime.addDeps(this.filepath, dirPath);
      return ([...this.runtime.fs.files.entries()]
        .map(([path, content]) => ({ path, content }))
        .filter(file => file.path.startsWith((dirPath)))
      );
    }

    const file = this.runtime.fs.files.get(absPath);

    if (file) {
      this.runtime.addDeps(this.filepath, absPath);
      return { path: absPath, content: file };
    }

    throw new Error(`Can't find file at path: ${toPath}`);
  }

}

function createJsxElement(tag: string | Function, attrs: any, ...children: any[]) {
  if (typeof tag === 'function')
    return tag(attrs ?? {}, children);
  else
    return { jsx: true, tag, attrs, children };
}
