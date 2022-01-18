import MarkdownIt from 'markdown-it';
import 'source-map-support/register';
import { RouteInput, RouteOutput } from '../../src/http';

const markdown = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

export function routeHandler(input: RouteInput): RouteOutput {
  return {
    headers: {
      'Content-Type': 'text/html',
    },
    body: markdown.render(`### this is cool\n~~~js\n${input.url.toString()}~~~`),
  }
};
