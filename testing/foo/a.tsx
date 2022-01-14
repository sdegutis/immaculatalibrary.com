import { inB } from "./b";

import qux from './snippets/sub/c';

console.log(['executing A', inB()]);

export const foo = (a: number) => ({ q: qux(), a, b: Math.random() });

export const bar = 332;
