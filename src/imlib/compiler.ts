import * as sucrase from 'sucrase';
import vm from 'vm';

const unary = new Set(['br', 'hr', 'input']);

function createElement(tag: string | Function, attrs: any, ...children: any[]) {
  attrs ??= {};

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

  const attrsArray = Object.entries(attrs);
  const attrsString = (attrsArray.length > 0
    ? ' ' + attrsArray
      .map(([k, v]) =>
      (v === true
        ? k
        : (v === false || v === null || v === undefined)
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

  context = vm.createContext({ JSX });

  eval(filename: string, input: { this: any, body: string }) {
    const body = compileWithJsx(input.body);
    const script = new vm.Script(`(function() {return ${body}})`, { filename });
    const wrapped: Function = script.runInContext(this.context);
    return wrapped.call(input.this);
  }

}

function compileWithJsx(code: string) {
  const result = sucrase.transform(code, {
    jsxPragma: 'JSX.createElement',
    jsxFragmentPragma: 'JSX.fragment',
    transforms: ['jsx'],
    disableESTransforms: true,
    production: true,
  });
  if (!result?.code) throw new Error('Invalid code');
  return result?.code;
}
