import * as babel from "@babel/core";
import vm from 'vm';

const unary = new Set(['br', 'hr', 'input']);

function createElement(tag: string | Function, attrs: any, ...children: any[]) {
  if (typeof tag === 'function') {
    return tag(attrs, children);
  }

  const childrenString = (children
    .filter(c =>
      c !== null &&
      c !== undefined &&
      c !== false)
    .flat()
    .join(''));

  if ((tag as unknown) === JSX.fragment) {
    return childrenString;
  }

  const attrsArray = Object.entries(attrs ?? {});
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray
      .map(([k, v]) =>
      (v === true
        ? k
        : v === false
          ? ''
          : `${k}="${v}"`))
      .join(' ')
    : '');

  if (unary.has(tag)) {
    return `<${tag}${attrsString}/>`;
  }

  return `<${tag}${attrsString}>${childrenString}</${tag}>`;
}

const JSX = {
  createElement,
  fragment: Symbol('fragment'),
};

export class Compiler {

  constructor(private sandbox: object) { }

  eval(input: { this: any, globals: any, body: string }) {
    // TODO: catch error or something?

    const body = compileWithJsx(input.body).slice(0, -1);
    const wrapped: Function = vm.runInNewContext(
      `(function() {return (${body})})`,
      {
        ...this.sandbox,
        ...input.globals,
        JSX,
      }
    );
    return wrapped.call(input.this);
  }

}

function compileWithJsx(code: string) {
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
