import * as babel from "@babel/core";
import vm2 from 'vm2';

const unary = new Set(['br', 'hr', 'input']);

function jsxCreateElement(tag: string | Function, attrs: any, ...children: any[]) {
  if (tag === '') {
    return children.flat().join('');
  }

  if (tag instanceof Function) {
    return tag(attrs, children);
  }

  const attrsArray = Object.entries(attrs ?? {});
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray.map(([k, v]) =>
      `${k}="${v}"`).join(' ')
    : '');

  if (unary.has(tag)) {
    return `<${tag}${attrsString}/>`;
  }

  const childrenString = children.flat().join('');
  return `<${tag}${attrsString}>${childrenString}</${tag}>`;
}

export class Compiler {

  globals: any;

  constructor(sandbox: object) {
    this.globals = {
      ...sandbox,
      _jsxCreateElement: jsxCreateElement,
    };
  }

  createFn(input: { this: any, globals: any, args: string[], body: string }) {
    const vm = new vm2.VM({
      sandbox: {
        ...this.globals,
        ...input.globals,
      },
    });

    // TODO: catch error or something?
    const wrapped = new vm2.VMScript(`(function(${input.args.join(', ')}) {${input.body}})`, {
      compiler: compileWithJsx,
    });
    return vm.run(wrapped).bind(input.this);
  }

}

function compileWithJsx(code: string, filename: string) {
  const babelOutput = babel.transformSync(code, {
    plugins: [
      ['@babel/plugin-transform-react-jsx', {
        useSpread: true,
        pragma: '_jsxCreateElement',
        pragmaFrag: "''",
        throwIfNamespace: false,
      }],
    ],
  });
  if (!babelOutput?.code) throw new Error('Invalid code');
  return babelOutput?.code;
}
