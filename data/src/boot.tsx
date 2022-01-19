import 'source-map-support/register';
import { RouteInput, RouteOutput } from '../../src/http';
import { md } from './helpers';

for (const child of __file.root.subdirs['data']!.subdirs['snippets']!.children) {
  const file = child;
  console.log(file.name);
}

// TODO: redirect /index.html to /

export function routeHandler(input: RouteInput): RouteOutput {
  return {
    headers: {
      'Content-Type': 'text/html',
    },
    body: md.render(`### this is cool\n~~~js\n${input.url.toString()}~~~`),
  }
};
