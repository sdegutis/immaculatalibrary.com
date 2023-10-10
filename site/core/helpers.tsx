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

const PREVIEW_LENGTH = 2000;

export function derivePreview(model: { content: string }) {
  const paragraphs = model.content.split(/(\r?\n>+ *\r?\n)/);

  let running = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    running += paragraphs[i]!.length;
    if (running > PREVIEW_LENGTH) break;
  }

  if (running < model.content.length - 1) {
    return model.content.substring(0, running);
  }
  return null;
}