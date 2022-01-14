import { inB } from "./b";

console.log(['executing A', inB()]);

export const foo = (a: number) => ({ a, b: Math.random() });
