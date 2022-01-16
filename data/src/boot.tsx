import { URL } from "url";
import { inB } from "./b";
import * as fs from 'fs';

import qux from './snippets/sub/c';

console.log(['executing A', inB()]);

console.log(fs);

export const foo = (a: number) => ({ q: qux(), a, b: Math.random() });

export const bar = 332;

export const routeHandler: RouteHandler = (input) => {
  return {
    body: input.url.toString(),
  }
};

interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: { [name: Lowercase<string>]: string | string[] | undefined };
  body: Buffer;
}

interface RouteOutput {
  status?: number;
  headers?: object;
  body?: string | Buffer;
}

type RouteHandler = (input: RouteInput) => RouteOutput;
