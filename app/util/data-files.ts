import Yaml from 'js-yaml';

interface Output<T> {
  slug: string;
  markdownContent: string;
  meta: T;
}

export function loadContentFile<T>(file: FsFile, filename: 'slug'): Output<T>;
export function loadContentFile<T>(file: FsFile, filename: 'date-slug'): Output<T> & { date: string };
export function loadContentFile<T>(file: FsFile, filename: 'date-slug' | 'slug'): Output<T> & { date: undefined | string } {
  const slug = file.name.slice(0, -3);
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];

  const fileContents = file.text.replace(/\r\n/g, '\n');
  const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
  const frontmatter = fileContentsMatch[1]!;
  const markdownContent = fileContentsMatch[2]!;

  const meta = Yaml.load(frontmatter!) as T;

  return { date, slug, markdownContent, meta };
}
