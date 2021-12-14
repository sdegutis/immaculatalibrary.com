import * as babel from "@babel/core";
import vm2 from 'vm2';

const unary = new Set(['br', 'hr', 'input']);

function createElement(tag: string | Function, attrs: any, ...children: string[]) {
  if ((tag as unknown) === JSX.fragment) {
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

const JSX = {
  createElement,
  fragment: Symbol('fragment'),
};

export class Compiler {

  globals: any;

  constructor(sandbox: object) {
    this.globals = {
      ...sandbox,
      JSX,
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
        pragma: 'JSX.createElement',
        pragmaFrag: "JSX.fragment",
        throwIfNamespace: false,
      }],
    ],
  });
  if (!babelOutput?.code) throw new Error('Invalid code');
  return babelOutput?.code;
}
