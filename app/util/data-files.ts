import Yaml from 'js-yaml';

interface Output<T> {
  slug: string;
  markdownContent: string;
  meta: T;
}

export function loadContentFile<T>(file: FsFile, filename: 'slug'): Output<T>;
export function loadContentFile<T>(file: FsFile, filename: 'date-slug'): Output<T> & { date: string };
export function loadContentFile<T>(file: FsFile, filename: 'date-slug' | 'slug'): Output<T> & { date: null | string } {
  const matchResults = (filename === 'slug'
    ? [null, ...file.name.match(/^(.+?).md$/)!]
    : file.name.match(/^(\d{4}-\d{2}-\d{2})-(.+?).md$/)!
  );
  const date = matchResults[1]!;
  const slug = matchResults[2]!;

  const fileContents = file.text.replace(/\r\n/g, '\n');
  const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
  const frontmatter = fileContentsMatch[1]!;
  const markdownContent = fileContentsMatch[2]!;

  const meta = Yaml.load(frontmatter!) as T;

  return { date, slug, markdownContent, meta };
}

// export function saveContentFile(file: FsFile, meta: any, content: string) {
//   const header = Yaml.dump(meta, { lineWidth: -1, noCompatMode: true });
//   file.replace(Buffer.from(`---\n${header}---\n\n${content}`));
// }
