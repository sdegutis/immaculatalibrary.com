import Yaml from "js-yaml";
import MarkdownIt from 'markdown-it';

export function loadContentFile<T>(file: FsFile) {
  const slug = file.name.slice(0, -3);
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];

  const fileContents = file.text.replace(/\r\n/g, '\n');
  const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
  const frontmatter = fileContentsMatch[1]!;
  const content = fileContentsMatch[2]!;

  const meta = Yaml.load(frontmatter!) as T;

  return { date, slug, content, ...meta };
}

export const markdown = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

export function calculateReadingMins(str: string) {
  return Math.round((str.match(/\w+/g)?.length || 0) / 160);
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
