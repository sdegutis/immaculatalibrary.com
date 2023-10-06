import MarkdownIt from 'markdown-it';

export const isDev = !!process.env['DEV'];

export const markdown = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

export function calculateReadingMins(str: string) {
  return Math.round(str.length / 888);
}

export function excerpt(s: string) {
  return s.split(/\r?\n\r?\n/)[0]!;
}

export function sortBy<T>(fn: (o: T) => string | number) {
  return (l: T, r: T) => {
    const a = fn(l);
    const b = fn(r);
    return a < b ? -1 : a > b ? 1 : 0;
  };
}
