import { RouteHandler } from '../../src/http';

// import { spawnSync } from 'child_process';
// spawnSync('git ci -am "git from site"', { shell: true, stdio: 'inherit' });
// spawnSync('git push', { shell: true, stdio: 'inherit' });

// import fs from 'fs';
// import { URL } from "url";
// import { inB } from "./b";
// import qux from './snippets/sub/c';
// import bcrypt from 'bcryptjs';
// import MarkdownIt from 'markdown-it';
// import 'source-map-support/register';

// const markdown = new MarkdownIt({
//   html: true,
//   typographer: true,
//   linkify: true,
//   breaks: true,
// });


// // console.log(typeof markdown);
// // console.log(typeof bcrypt);



// // console.log(['executing A', inB()]);

// // console.log(new URL(String(fs), 'http://localhost'));

// // setTimeout(() => {
// //   console.log('timeout')
// // }, 1000);

// // setInterval(() => {
// //   console.log('interval')
// // }, 1000);

// export const foo = (a: number) => ({ q: qux(), a, b: Math.random() });

// export const bar = 332;

export const routeHandler: RouteHandler = (input) => {
  return {
    body: input.url.toString(),
  }
};
