import * as sucrase from 'sucrase';
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

  context;
  constructor(sandbox: object) {
    this.context = vm.createContext({
      ...sandbox,
      JSX,
    });
  }

  eval(input: { this: any, globals: any, body: string }) {
    const body = compileWithJsx(input.body);
    const wrapped: Function = vm.runInContext(`(function() {return ${body}})`, this.context);
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
